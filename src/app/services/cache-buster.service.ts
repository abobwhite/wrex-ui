import { Injectable } from '@angular/core';
import { RecommendationService } from './recommendation.service';
import { ReferenceService } from './reference.service';
import { StatusesService } from './statuses.service';

@Injectable({
  providedIn: 'root'
})
export class CacheBusterService {

  constructor(private recommendationService: RecommendationService, private statusesService: StatusesService, private referenceService: ReferenceService) { }

  public clearCache() {
    this.recommendationService.resetRecommendations();
    this.statusesService.resetStatuses();
  }
}
