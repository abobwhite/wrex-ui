import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recommendation } from 'src/models/recommendation.model';
import { ApiRouteMapperService } from './api-route-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private recommendations$: Observable<Recommendation[]>;

  constructor(private http: HttpClient, private apiRouteMapper: ApiRouteMapperService) { }

  public getRecommendations(userId: string) {
    const route = this.apiRouteMapper.mapRoute({ userId }, environment.apiEndpoints.getRecommendations);
    this.recommendations$ = this.http.get<Recommendation[]>(route);

    return this.recommendations$;
  }

  public updateRecommendation(recommendation: Recommendation) {
    const route = this.apiRouteMapper.mapRoute({ recommendationId: recommendation.id }, environment.apiEndpoints.patchRecommendation);
    return this.http.patch(route, recommendation);
  }

  public resetRecommendations() {
    this.recommendations$ = of([])
  }
}
