import { Component, OnInit } from '@angular/core';
import { RecommendationFeedback } from '../../models/recommendation-feedback.enum';
import { Recommendation } from '../../models/recommendation.model';
import { RecommendationService } from '../services/recommendation.service';
import { RecommendationType } from '../../models/recommendation-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public RecommendationType = RecommendationType;

  public loadingRecommendations = true;
  public recommendations: Recommendation[] = [];

  constructor(private recommendationService: RecommendationService) { }

  ngOnInit() {
    this.recommendationService.getRecommendations().subscribe(
      (recommendations: Recommendation[]) => {
        this.recommendations = recommendations.filter((r) => !r.dismissed);
        this.loadingRecommendations = false;
      }, () => {
        console.error('aww we failed to get wrex.');
        this.loadingRecommendations = false;
      }
    );
  }

  public accept(recommendation: Recommendation, accept: boolean): void {
    this.dismiss(recommendation);

    recommendation.dismissed = true;
    recommendation.feedback = accept ? RecommendationFeedback.LIKED : RecommendationFeedback.DISLIKED;

    this.recommendationService.updateRecommendation(recommendation).subscribe();
  }

  public getRecommendationTypeIcon(type: RecommendationType) {
    let icon: string;

    switch (type) {
      case RecommendationType.EVENT:
        icon = 'calendar_today';
        break;
      case RecommendationType.HANGOUT:
        icon = 'people';
        break;
      case RecommendationType.LEARN:
        icon = 'library_books';
        break;
      case RecommendationType.MENTORSHIP:
        icon = 'school';
        break;
      case RecommendationType.OPPORTUNITY:
        icon = 'build';
        break;

      default:
        icon = 'battery_unknown';
        break;
    }

    return icon;
  }

  private dismiss(recommendation: Recommendation): void {
    this.recommendations = this.recommendations.filter(n => n.id !== recommendation.id);
  }

}
