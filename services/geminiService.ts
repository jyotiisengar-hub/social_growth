import { GoogleGenAI, Type, Modality, ThinkingLevel } from "@google/genai";
import { UserInput, SocialPlan, SocialPost, FullStrategy, GeneratedImage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// ========== Social Plan Schemas ==========
const postSchema = {
    type: Type.OBJECT,
    properties: {
      platform: { type: Type.STRING },
      title: { type: Type.STRING },
      caption: { type: Type.STRING },
      suggested_time: { type: Type.STRING },
      image_prompt: { type: Type.STRING },
      rationale: { type: Type.STRING },
      impact_score: { type: Type.NUMBER },
      simple_test_idea: { type: Type.STRING },
      insight: { type: Type.STRING, description: "Optional insight for improved posts in performance analysis." },
      change: { type: Type.STRING, description: "Optional change description for improved posts." },
    },
    required: ["platform", "title", "caption", "suggested_time", "image_prompt", "rationale", "impact_score", "simple_test_idea"]
};

const socialPlanSchema = {
  type: Type.OBJECT,
  properties: {
    week_plan: { type: Type.STRING },
    posts: { type: Type.ARRAY, items: postSchema },
    dm_template: { type: Type.STRING },
    comment_reply_template: { type: Type.STRING },
    weekly_experiment: { type: Type.STRING },
    observations: { type: Type.STRING }
  },
  required: ["week_plan", "posts", "dm_template", "comment_reply_template", "weekly_experiment", "observations"]
};

// ========== Strategy Rationale Schema ==========
const strategyRationaleSchema = {
    type: Type.OBJECT,
    properties: {
        whyItWorks: { type: Type.ARRAY, items: { type: Type.STRING } },
        potentialChallenges: { type: Type.ARRAY, items: { type: Type.STRING } },
        strategySummary: { type: Type.STRING },
    },
    required: ["whyItWorks", "potentialChallenges", "strategySummary"],
};

// ========== Full Strategy Schema ==========
const fullStrategySchema = {
    type: Type.OBJECT,
    properties: {
        socialPlan: socialPlanSchema,
        strategyRationale: strategyRationaleSchema,
        otherChannelRecommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    platform: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    potential_impact: { type: Type.STRING },
                },
                required: ["platform", "reason", "potential_impact"],
            }
        }
    },
    required: ["socialPlan", "strategyRationale", "otherChannelRecommendations"]
};

// ========== User Input Schema for Prompt Parsing ==========
const userInputSchema = {
    type: Type.OBJECT,
    properties: {
        businessName: { type: Type.STRING },
        category: { type: Type.STRING },
        product: { type: Type.STRING },
        city: { type: Type.STRING },
        goal: { type: Type.STRING },
        tone: { type: Type.STRING },
        platform: { type: Type.STRING },
        audience: { type: Type.STRING },
        socialMediaLink: { type: Type.STRING, description: "A link to the business's primary social media page, if available." },
    },
    required: ["businessName", "category", "product", "city", "goal", "tone", "platform", "audience"]
};

const generateImagesForPost = async (post: { image_prompt: string, platform: string, rationale: string }): Promise<GeneratedImage[]> => {
    const numberOfImages = 1; // Reduced to 1 for faster generation
    
    // Parallelize image generation for each post
    const imagePromises = Array.from({ length: numberOfImages }).map(async (): Promise<GeneratedImage | null> => {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: post.image_prompt }] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            const part = response.candidates[0].content.parts.find(p => p.inlineData);
            if (part?.inlineData) {
                return {
                    id: crypto.randomUUID() as string,
                    base64: part.inlineData.data,
                    description: post.image_prompt,
                    rationale: post.rationale
                };
            }
        } catch (error) {
            console.error(`Error generating image for prompt "${post.image_prompt}":`, error);
        }
        return null;
    });

    const results = await Promise.all(imagePromises);
    return results.filter((img): img is GeneratedImage => img !== null);
};

export const extractDetailsFromPrompt = async (prompt: string): Promise<UserInput> => {
    const generationPrompt = `
        Analyze the following user-provided business description and extract the specified details.
        The output must be a single, valid JSON object that adheres to the provided schema.
        If a detail is not explicitly mentioned, make a reasonable inference based on the context.

        User's business description:
        "${prompt}"

        Extract the following fields:
        - businessName: The name of the business.
        - category: The industry or category the business belongs to.
        - product: The primary product or service offered.
        - city: The city where the business is located.
        - goal: The main business objective for their social media.
        - tone: The desired tone of voice for their posts.
        - platform: The primary social media platform they want to focus on.
        - audience: The target audience for their content.
        - socialMediaLink: A link to their social media profile if mentioned.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: generationPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: userInputSchema,
                temperature: 0.2, 
            }
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as UserInput;
    } catch (error) {
        console.error("Error extracting details from prompt:", error);
        throw new Error("Could not extract business details from the provided prompt.");
    }
};

const callGeminiApi = async (prompt: string): Promise<FullStrategy> => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: fullStrategySchema,
            temperature: 0.8,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        });
        
        const jsonStr = response.text.trim();
        const strategy = JSON.parse(jsonStr) as FullStrategy;

        // Add unique IDs to posts for React keys
        strategy.socialPlan.posts = strategy.socialPlan.posts.map(p => ({ ...p, id: crypto.randomUUID() }));

        return strategy;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Could not generate the full strategy from API.");
    }
}

export const generateFullStrategy = async (userInput: UserInput): Promise<FullStrategy> => {
  const { businessName, category, product, city, goal, tone, platform, audience, socialMediaLink } = userInput;
  
  const inspirationPrompt = socialMediaLink 
    ? `\n- Inspiration: Draw direct inspiration from the content, imagery, and style of their Instagram page: ${socialMediaLink}`
    : '';

  const prompt = `
    As an expert Social Growth Co-Pilot, create a comprehensive, multi-faceted social media strategy for a small business. The entire output must be a single, valid JSON object that adheres to the provided schema, with all sections being thematically consistent and tailored to the user's business.

    Business Details:
    - Name: "${businessName}"
    - Category: "${category}"
    - Product/Service: "${product}"
    - City: "${city}"
    - Primary Platform: "${platform}"
    - Primary Goal: "${goal}"
    - Target Audience: "${audience}"
    - Desired Tone: "${tone}"${inspirationPrompt}

    Generate the following sections in the JSON response:

    1. "socialPlan": A complete 7-day social media plan.
        - "week_plan": A one-sentence objective.
        - "posts": An array of 3 ready-to-post items. IMPORTANT: Prioritize the platforms specified in the "Primary Platform" field: "${platform}". Ensure at least one post is created for each specified platform if possible.
        - "dm_template", "comment_reply_template", "weekly_experiment", "observations": All tailored to the business.

    2. "strategyRationale": An explanation of why this specific plan was chosen.
        - "whyItWorks": A list of 3-4 reasons why these specific suggestions and post types will be effective for this business and goal.
        - "potentialChallenges": A list of 2-3 things that might NOT work or hurdles the business might face with this strategy.
        - "strategySummary": A one-line summary of the overall growth logic.

    3. "otherChannelRecommendations": Recommend 2-3 additional social media platforms that were NOT specified in the "Primary Platform" field but would be highly beneficial for this specific business.
        - "platform": The name of the recommended platform.
        - "reason": Why this platform is a good fit.
        - "potential_impact": What the business can expect to achieve there.
  `;

  const strategy = await callGeminiApi(prompt);

  // Generate images for ONLY the main social plan posts to reduce request count and avoid quota issues
  const socialPlanPostsWithImages = await Promise.all(
    strategy.socialPlan.posts.map(async (post) => ({
      ...post,
      generated_images: await generateImagesForPost(post),
    }))
  );

  strategy.socialPlan.posts = socialPlanPostsWithImages;
  // Performance analysis posts will remain text-only to save quota as requested
  
  return strategy;
};


export const regenerateAlternatives = async (userInput: UserInput, posts: SocialPost[]): Promise<SocialPlan> => {
    const usefulPosts = posts.filter(p => p.feedback === 'useful').map(({id, feedback, ...rest}) => rest);
    const notUsefulPosts = posts.filter(p => p.feedback === 'not useful').map(({id, feedback, ...rest}) => rest);

    const singleCallSchema = {
        type: Type.OBJECT,
        properties: {
            week_plan: { type: Type.STRING },
            posts: { type: Type.ARRAY, items: postSchema },
            dm_template: { type: Type.STRING },
            comment_reply_template: { type: Type.STRING },
            weekly_experiment: { type: Type.STRING },
            observations: { type: Type.STRING }
        },
        required: ["week_plan", "posts", "dm_template", "comment_reply_template", "weekly_experiment", "observations"]
    };

    const inspirationPrompt = userInput.socialMediaLink 
      ? `\n- Inspiration: Draw direct inspiration from the content, imagery, and style of their Instagram page: ${userInput.socialMediaLink}`
      : '';

    const prompt = `
    As a learning Social Growth Assistant, you previously generated a social media plan. The user has provided feedback. Your task is to generate a NEW, improved plan that takes this feedback into account.
    The output must be a valid JSON object that adheres to the provided schema.

    Original User Input:
    - Business Name: "${userInput.businessName}"
    - Category: "${userInput.category}"
    - Product/Service: "${userInput.product}"
    - City: "${userInput.city}"
    - Primary Platform: "${userInput.platform}"
    - Primary Goal: "${userInput.goal}"
    - Target Audience: "${userInput.audience}"
    - Desired Tone: "${userInput.tone}"${inspirationPrompt}

    User Feedback Analysis:
    - The user found these posts "USEFUL": ${usefulPosts.length > 0 ? JSON.stringify(usefulPosts, null, 2) : "None"}. Apply these successful patterns.
    - The user found these posts "NOT USEFUL": ${notUsefulPosts.length > 0 ? JSON.stringify(notUsefulPosts, null, 2) : "None"}. Avoid these characteristics.
    
    Instructions:
    - Generate a completely new set of 3 posts. IMPORTANT: Prioritize the platforms specified in the "Primary Platform" field: "${userInput.platform}". Ensure at least one post is created for each specified platform if possible.
    - These new posts MUST strongly align with the 'USEFUL' examples and avoid the traits of the 'NOT USEFUL' examples.
    - Generate a new "week_plan", "dm_template", "comment_reply_template", "weekly_experiment", and "observations" improved by this feedback.
  `;

  try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: singleCallSchema,
            temperature: 0.8,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        });
        
        const jsonStr = response.text.trim();
        const plan: Omit<SocialPlan, 'posts'> & { posts: Omit<SocialPost, 'id' | 'feedback' | 'generated_images'>[] } = JSON.parse(jsonStr);

        const postsWithIdsAndImages = await Promise.all(
            plan.posts.map(async (post) => ({
                ...post,
                id: crypto.randomUUID(),
                generated_images: await generateImagesForPost(post),
            }))
        );

        return { ...plan, posts: postsWithIdsAndImages };
    } catch (error) {
        console.error("Error calling Gemini API for regeneration:", error);
        throw new Error("Could not regenerate social media plan from API.");
    }
};
