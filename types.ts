
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
}

export interface SocialPlan {
  week_plan: string;
  posts: SocialPost[];
  dm_template: string;
  comment_reply_template: string;
  weekly_experiment: string;
  observations: string;
}

// Data for PerformanceAnalysis tab
export interface PastMetric {
  title: string;
  likes: number;
  comments: number;
  dms: number;
  type: string;
}

export interface PerformanceAnalysisData {
  pastMetrics: PastMetric[];
  whatWorked: string[];
  whatDidnt: string[];
  newPlanPosts: SocialPost[];
  aiInsightSummary: string;
}

// Data for MultiPlatformStrategy tab
export interface PlatformStrategy {
  platform: string;
  icon: string;
  color: string;
  focus: string;
  format: string;
  caption: string;
  hashtags: string;
  cta: string;
  time: string;
  rationale: string;
}

export interface MultiPlatformStrategyData {
  masterConcept: {
    title: string;
    description: string;
  };
  platformStrategies: PlatformStrategy[];
}

// Data for NextBestAction tab
export interface PossibleAction {
    id: number;
    text: string;
    chosen: boolean;
}

export interface UpgradeTrigger {
    condition: string;
    message: string;
    value: string;
    timing: string;
}

export interface NextBestActionData {
    scenario: string;
    possibleActions: PossibleAction[];
    justification: {
        why: string;
        data: string;
        logic: string;
    };
    executedAction: {
        title: string;
        post: {
            platform: string;
            caption: string;
            hashtags: string;
        }
    };
    upgradeTriggers: UpgradeTrigger[];
    productInsight: string;
}


// A comprehensive object containing all generated data
export interface FullStrategy {
  socialPlan: SocialPlan;
  performanceAnalysis: PerformanceAnalysisData;
  multiPlatformStrategy: MultiPlatformStrategyData;
  nextBestAction: NextBestActionData;
}