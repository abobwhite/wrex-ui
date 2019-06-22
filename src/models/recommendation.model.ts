import { RecommendationFeedback } from './recommendation-feedback.enum';
import { RecommendationType } from '../app/types/recommendation-type.enum';

export class Recommendation {
  id: string;
  recommendationType: RecommendationType;
  tagCategoryId: string;
  date: string;
  userId: string;
  message: string;
  dismissed: boolean;
  feedback?: RecommendationFeedback;
}
