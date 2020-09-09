import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiRouteMapperService } from './api-route-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private statuses$;

  constructor(private http: HttpClient, private apiRouteMapperService: ApiRouteMapperService) { }
  public getStatuses(userId) {
    if (!this.statuses$) {
      this.statuses$ = this.http.get(this.apiRouteMapperService.mapRoute({ userId }, environment.apiEndpoints.postStatus));
    }

    return this.statuses$;
  }

  public postStatus(userId, status) {
    this.statuses$ = undefined;
    return this.http.post(this.apiRouteMapperService.mapRoute({ userId }, environment.apiEndpoints.postStatus), status);
  }

  public resetStatuses() {
    this.statuses$ = undefined;
  }
}
