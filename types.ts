export interface UserInput {
  businessName: string;
  category: string;
  product: string;
  city: string;
  goal: string;
  tone: string;
  platform: string;
  audience: string;
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
}

export interface SocialPlan {
  week_plan: string;
  posts: SocialPost[];
  dm_template: string;
  comment_reply_template: string;
  weekly_experiment: string;
  observations: string;
}
