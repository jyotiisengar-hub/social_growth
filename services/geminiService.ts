import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SocialPlan, SocialPost } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const postSchema = {
    type: Type.OBJECT,
    properties: {
      platform: { type: Type.STRING, description: "The social media platform (e.g., Instagram, Facebook, X)." },
      title: { type: Type.STRING, description: "A short, catchy title for the post." },
      caption: { type: Type.STRING, description: "The exact post caption, 100-180 characters, including a Call to Action (CTA) and 2-3 relevant hashtags." },
      suggested_time: { type: Type.STRING, description: "Suggested local time to post for maximum engagement (e.g., '8:00 AM')." },
      image_prompt: { type: Type.STRING, description: "A simple prompt for a photo that can be taken with a phone." },
      rationale: { type: Type.STRING, description: "A single-sentence explanation of why this post will attract the target customer." },
      impact_score: { type: Type.NUMBER, description: "A score from 1-10 indicating the potential impact of the post." },
      simple_test_idea: { type: Type.STRING, description: "A simple idea to test this post's effectiveness, explained in plain language (e.g., 'Try a different call to action')." },
    },
    required: ["platform", "title", "caption", "suggested_time", "image_prompt", "rationale", "impact_score", "simple_test_idea"]
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    week_plan: {
      type: Type.STRING,
      description: "A one-sentence objective for the week's social media activities.",
    },
    posts: {
      type: Type.ARRAY,
      description: "A list of social media post suggestions for the week.",
      items: postSchema
    },
    dm_template: {
      type: Type.STRING,
      description: "A short, 2-sentence direct message template for cold outreach to potential customers.",
    },
    comment_reply_template: {
      type: Type.STRING,
      description: "A personalized template to reply to positive user comments, designed to convert engagement into a lead or booking.",
    },
    weekly_experiment: {
      type: Type.STRING,
      description: "A simple, actionable experiment for the week, explained in plain language, avoiding jargon like 'A/B test', to see what your audience likes best.",
    },
    observations: {
        type: Type.STRING,
        description: "General observations or strategic advice based on the user's input."
    }
  },
  required: ["week_plan", "posts", "dm_template", "comment_reply_template", "weekly_experiment", "observations"]
};

const callGeminiApi = async (prompt: string): Promise<SocialPlan> => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.8,
          }
        });
        
        const jsonStr = response.text.trim();
        const plan: Omit<SocialPlan, 'posts'> & { posts: Omit<SocialPost, 'id' | 'feedback'>[] } = JSON.parse(jsonStr);

        // Add IDs to the posts
        const postsWithIds = plan.posts.map(post => ({
            ...post,
            id: crypto.randomUUID(),
        }));

        return { ...plan, posts: postsWithIds };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Could not generate social media plan from API.");
    }
}

export const generatePlan = async (userInput: UserInput): Promise<SocialPlan> => {
  const { businessName, category, product, city, goal, tone, platform, audience } = userInput;

  const prompt = `
    As a Social Growth Assistant, create a detailed 7-day social media micro-plan for a small business owner with minimal marketing expertise.
    The output must be a valid JSON object that adheres to the provided schema.

    Business Details:
    - Name: "${businessName}"
    - Category: "${category}"
    - Product/Service: "${product}"
    - City: "${city}"
    - Primary Platform: "${platform}"

    Strategic Goals:
    - Primary Goal: "${goal}"
    - Target Audience: "${audience}"
    - Desired Tone: "${tone}"

    Based on the above, provide the following in your JSON response:
    1.  "week_plan": A one-sentence headline stating the objective for the week.
    2.  "posts": An array of 4 ready-to-post items, one for each of the following platforms: Instagram, Facebook, X.com, and LinkedIn. Tailor the content, tone, and format to the best practices of each specific platform.
    3.  "dm_template": A 2-sentence direct message template for cold outreach, written in the desired tone, suitable for LinkedIn or Instagram.
    4.  "comment_reply_template": A personalized template to reply to positive comments, designed to convert engagement into a lead.
    5.  "weekly_experiment": Suggest 1 simple experiment to try this week. Explain it in simple terms, avoiding marketing jargon like 'A/B test'. For example: 'Try posting one story with a question sticker and one without, and see which gets more replies.'
    6.  "observations": A brief summary of strategic advice tailored to the business, considering the multi-platform approach.
  `;

  return callGeminiApi(prompt);
};

export const regenerateAlternatives = async (userInput: UserInput, posts: SocialPost[]): Promise<SocialPlan> => {
    const usefulPosts = posts.filter(p => p.feedback === 'useful').map(({id, feedback, ...rest}) => rest);
    const notUsefulPosts = posts.filter(p => p.feedback === 'not useful').map(({id, feedback, ...rest}) => rest);

    const prompt = `
    As a learning Social Growth Assistant, you previously generated a social media plan. The user has provided feedback, which is the most critical signal for improvement.
    Your task is to generate a NEW, improved plan that takes this feedback into account.
    The output must be a valid JSON object that adheres to the provided schema.

    Original User Input:
    - Business Name: "${userInput.businessName}"
    - Category: "${userInput.category}"
    - Product/Service: "${userInput.product}"
    - City: "${userInput.city}"
    - Primary Platform: "${userInput.platform}"
    - Primary Goal: "${userInput.goal}"
    - Target Audience: "${userInput.audience}"
    - Desired Tone: "${userInput.tone}"

    User Feedback Analysis:
    - The user found the following post(s) "USEFUL". This is a strong signal. Analyze their style (e.g., local, empathetic, warm, action-oriented) and apply these successful patterns to the new posts.
    ${usefulPosts.length > 0 ? JSON.stringify(usefulPosts, null, 2) : "None"}

    - The user found the following post(s) "NOT USEFUL", likely because they were too generic or didn't resonate. Avoid these characteristics and themes entirely.
    ${notUsefulPosts.length > 0 ? JSON.stringify(notUsefulPosts, null, 2) : "None"}
    
    Instructions:
    - Generate a completely new set of 4 posts, one for each platform (Instagram, Facebook, X.com, LinkedIn).
    - These new posts MUST strongly align with the 'USEFUL' examples and avoid the traits of the 'NOT USEFUL' examples.
    - DO NOT repeat any of the posts previously provided.
    - Generate a new "week_plan", "dm_template", "comment_reply_template", "weekly_experiment", and "observations" that are improved based on this new, deeper understanding of the user's preferences.
    - All experiments and test ideas must be explained in simple, jargon-free language.
  `;

  return callGeminiApi(prompt);
};