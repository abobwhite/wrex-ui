import { RecommendationFeedback } from './recommendation-feedback.enum';
import { RecommendationType } from './recommendation-type.enum';

export class Recommendation {
  id: string;
  type: RecommendationType;
  tagCategoryId: string;
  date: string;
  userId: string;
  message: string;
  dismissed: boolean;
  feedback?: RecommendationFeedback;
}
