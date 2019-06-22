import { Component, OnInit } from '@angular/core';
import { RecommendationFeedback } from '../../models/recommendation-feedback.enum';
import { Recommendation } from '../../models/recommendation.model';
import { RecommendationService } from '../services/recommendation.service';
import { RecommendationType } from '../types/recommendation-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public loadingRecommendations = true;
  public recommendations: Recommendation[] = [];
  private demoRecommendations: Recommendation[] = [
    {
      id: '1',
      recommendationType: RecommendationType.Hangout,
      message: 'Think maybe you\'d like to happy hour with a small group and talk about video games?',
      date: '6/22/2019',
      userId: '1',
      tagCategoryId: '1',
      dismissed: false,
    },
    {
      id: '2',
      recommendationType: RecommendationType.Event,
      message: 'Think maybe you\'d to grab a beer with Pete Peterson?',
      date: '6/22/2019',
      userId: '2',
      tagCategoryId: '1',
      dismissed: false,
    },
    {
      id: '3',
      recommendationType: RecommendationType.Event,
      message: 'Ben Rogers wants to help you with functional react.',
      date: '6/22/2019',
      userId: '1',
      tagCategoryId: '2',
      dismissed: false,
    },
    {
      id: '4',
      recommendationType: RecommendationType.Event,
      message: 'I should not be shown and was not liked.',
      date: '6/22/2019',
      userId: '1',
      tagCategoryId: '1',
      dismissed: true,
      feedback: RecommendationFeedback.Disliked
    },
    {
      id: '5',
      recommendationType: RecommendationType.Event,
      message: 'I have also been dismissed but I was liked.',
      date: '6/22/2019',
      userId: '1',
      tagCategoryId: '1',
      dismissed: true,
      feedback: RecommendationFeedback.Liked
    },
  ];

  constructor(private recommendationNotificationService: RecommendationService) { }

  ngOnInit() {
    this.recommendationNotificationService.getRecommendations().subscribe(
      (notifications: Recommendation[]) => {
        this.recommendations = notifications.filter((r) => !r.dismissed);
        this.loadingRecommendations = false;
      }, () => {
        this.recommendations = this.demoRecommendations.filter((r) => !r.dismissed);
        this.loadingRecommendations = false;
      }
    );
  }

  public accept(notification: Recommendation, accept: boolean): void {
    if (accept) {
      console.log(`you accepted notification ${notification.id}.`);
    }

    this.dismiss(notification);
  }

  private dismiss(notification: Recommendation): void {
    this.recommendations = this.recommendations.filter(n => n.id !== notification.id);
  }

}
