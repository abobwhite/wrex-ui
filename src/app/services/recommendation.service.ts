import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recommendation } from 'src/models/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private recommendations$: Observable<Recommendation[]>;

  constructor(private http: HttpClient) { }

  public getRecommendations() {
    this.recommendations$ = this.http.get(`${environment.apiEndpoints.recommendation}`) as any;

    return this.recommendations$;
  }
}
