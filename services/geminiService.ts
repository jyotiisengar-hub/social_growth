import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SocialPlan, SocialPost, FullStrategy } from '../types';

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

// ========== Performance Analysis Schema ==========
const performanceAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        pastMetrics: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    likes: { type: Type.NUMBER },
                    comments: { type: Type.NUMBER },
                    dms: { type: Type.NUMBER },
                    type: { type: Type.STRING },
                },
                required: ["title", "likes", "comments", "dms", "type"],
            }
        },
        whatWorked: { type: Type.ARRAY, items: { type: Type.STRING } },
        whatDidnt: { type: Type.ARRAY, items: { type: Type.STRING } },
        newPlanPosts: { type: Type.ARRAY, items: postSchema },
        aiInsightSummary: { type: Type.STRING },
    },
    required: ["pastMetrics", "whatWorked", "whatDidnt", "newPlanPosts", "aiInsightSummary"],
};

// ========== Multi-Platform Strategy Schema ==========
const multiPlatformStrategySchema = {
    type: Type.OBJECT,
    properties: {
        masterConcept: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
            },
            required: ["title", "description"],
        },
        platformStrategies: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    platform: { type: Type.STRING },
                    icon: { type: Type.STRING },
                    color: { type: Type.STRING },
                    focus: { type: Type.STRING },
                    format: { type: Type.STRING },
                    caption: { type: Type.STRING },
                    hashtags: { type: Type.STRING },
                    cta: { type: Type.STRING },
                    time: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                },
                required: ["platform", "icon", "color", "focus", "format", "caption", "hashtags", "cta", "time", "rationale"],
            }
        }
    },
    required: ["masterConcept", "platformStrategies"],
};

// ========== Next Best Action Schema ==========
const nextBestActionSchema = {
    type: Type.OBJECT,
    properties: {
        scenario: { type: Type.STRING },
        possibleActions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.NUMBER },
                    text: { type: Type.STRING },
                    chosen: { type: Type.BOOLEAN },
                },
                required: ["id", "text", "chosen"],
            }
        },
        justification: {
            type: Type.OBJECT,
            properties: {
                why: { type: Type.STRING },
                data: { type: Type.STRING },
                logic: { type: Type.STRING },
            },
            required: ["why", "data", "logic"],
        },
        executedAction: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                post: {
                    type: Type.OBJECT,
                    properties: {
                        platform: { type: Type.STRING },
                        caption: { type: Type.STRING },
                        hashtags: { type: Type.STRING },
                    },
                    required: ["platform", "caption", "hashtags"],
                },
            },
            required: ["title", "post"],
        },
        upgradeTriggers: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    condition: { type: Type.STRING },
                    message: { type: Type.STRING },
                    value: { type: Type.STRING },
                    timing: { type: Type.STRING },
                },
                required: ["condition", "message", "value", "timing"],
            }
        },
        productInsight: { type: Type.STRING },
    },
    required: ["scenario", "possibleActions", "justification", "executedAction", "upgradeTriggers", "productInsight"],
};


// ========== Full Strategy Schema ==========
const fullStrategySchema = {
    type: Type.OBJECT,
    properties: {
        socialPlan: socialPlanSchema,
        performanceAnalysis: performanceAnalysisSchema,
        multiPlatformStrategy: multiPlatformStrategySchema,
        nextBestAction: nextBestActionSchema,
    },
    required: ["socialPlan", "performanceAnalysis", "multiPlatformStrategy", "nextBestAction"]
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
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: fullStrategySchema,
            temperature: 0.8,
          }
        });
        
        const jsonStr = response.text.trim();
        const strategy = JSON.parse(jsonStr) as FullStrategy;

        // Add unique IDs to posts for React keys
        strategy.socialPlan.posts = strategy.socialPlan.posts.map(p => ({ ...p, id: crypto.randomUUID() }));
        strategy.performanceAnalysis.newPlanPosts = strategy.performanceAnalysis.newPlanPosts.map(p => ({ ...p, id: crypto.randomUUID() }));

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
        - "posts": An array of 4 ready-to-post items for Instagram, Facebook, X.com, and LinkedIn.
        - "dm_template", "comment_reply_template", "weekly_experiment", "observations": All tailored to the business.

    2. "performanceAnalysis": A SIMULATED analysis of a hypothetical previous week to demonstrate learning.
        - "pastMetrics": Create 3 plausible past posts with realistic metrics (likes, comments, DMs) for this business. One should be a clear winner.
        - "whatWorked" & "whatDidnt": Analyze the metrics you just created.
        - "newPlanPosts": Generate 2 NEW posts that are a direct improvement based on your analysis. Include "insight" and "change" fields explaining your reasoning.
        - "aiInsightSummary": A one-line summary of the key learning.

    3. "multiPlatformStrategy": Adapt a single master concept for different platforms.
        - "masterConcept": Create one core post idea relevant to the business (e.g., for a bakery, 'Behind the scenes of our sourdough').
        - "platformStrategies": Adapt this concept for Instagram (visual/story), LinkedIn (professional/value), and Facebook (community/local), detailing the different captions, formats, CTAs, etc. For "icon", use font-awesome class names (e.g., "fa-brands fa-instagram"). For "color", use hex codes.

    4. "nextBestAction": Propose and simulate an autonomous action.
        - "scenario": Write a brief scenario based on the generated social plan (e.g., 'Two posts performed well, driving high-intent DMs').
        - "possibleActions": List 4 plausible next actions, with one marked as "chosen: true".
        - "justification": Explain why the chosen action is the most impactful, using the data from your scenario.
        - "executedAction": Generate the content for the chosen action (e.g., the full text for a limited-time offer post).
        - "upgradeTriggers": Create two contextual upgrade triggers with conditions and persuasive copy.
        - "productInsight": A one-line insight about user behavior and upgrades.
  `;

  return callGeminiApi(prompt);
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
    - Generate a completely new set of 4 posts for different platforms.
    - These new posts MUST strongly align with the 'USEFUL' examples and avoid the traits of the 'NOT USEFUL' examples.
    - Generate a new "week_plan", "dm_template", "comment_reply_template", "weekly_experiment", and "observations" improved by this feedback.
  `;

  try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: singleCallSchema,
            temperature: 0.8,
          }
        });
        
        const jsonStr = response.text.trim();
        const plan: Omit<SocialPlan, 'posts'> & { posts: Omit<SocialPost, 'id' | 'feedback'>[] } = JSON.parse(jsonStr);

        const postsWithIds = plan.posts.map(post => ({
            ...post,
            id: crypto.randomUUID(),
        }));

        return { ...plan, posts: postsWithIds };
    } catch (error) {
        console.error("Error calling Gemini API for regeneration:", error);
        throw new Error("Could not regenerate social media plan from API.");
    }
};