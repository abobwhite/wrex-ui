import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recommendation } from 'src/models/recommendation.model';
import { ApiRouteMapperService } from './api-route-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private recommendations$: Observable<Recommendation[]>;

  constructor(private http: HttpClient, private apiRouteMapper: ApiRouteMapperService) { }

  public getRecommendations() {
    this.recommendations$ = this.http.get(`/api/users/5d0e513ac7e3e579444ee8f6/recommendations`) as any;

    return this.recommendations$;
  }

  public updateRecommendation(recommendation: Recommendation) {
    return this.http.patch(`${environment.apiEndpoints.recommendation}/${recommendation.id}`, recommendation);
  }
}
