// types.ts

export interface GeneratedImage {
  id: string;
  base64: string;
  description: string;
  rationale: string;
}

// FIX: Removed circular import of UserInput from the same file.
export interface UserInput {
  businessName: string;
  category: string;
  product: string;
  city: string;
  goal: string;
  tone: string;
  platform: string;
  audience: string;
  socialMediaLink?: string;
}

export interface SocialPost {
  id: string;
  platform: string;
  title: string;
  caption: string;
  suggested_time: string;
  image_prompt: string;
  rationale: string;
  impact_score: number;
  simple_test_idea: string;
  feedback?: 'useful' | 'not useful';
  insight?: string;
  change?: string;
  generated_images?: GeneratedImage[];
}

export interface SocialPlan {
  week_plan: string;
  posts: SocialPost[];
  dm_template: string;
  comment_reply_template: string;
  weekly_experiment: string;
  observations: string;
}

// Data for Strategy Rationale
export interface StrategyRationaleData {
  whyItWorks: string[];
  potentialChallenges: string[];
  strategySummary: string;
}

// Data for MultiPlatformStrategy tab - REMOVED
// Data for NextBestAction tab - REMOVED

export interface ChannelRecommendation {
  platform: string;
  reason: string;
  potential_impact: string;
}

// A comprehensive object containing all generated data
export interface FullStrategy {
  socialPlan: SocialPlan;
  strategyRationale: StrategyRationaleData;
  otherChannelRecommendations: ChannelRecommendation[];
}
