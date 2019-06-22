import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiRouteMapperService } from './api-route-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private apiRouteMapper: ApiRouteMapperService) { }

  public getUser(userId: string) {
    return this.http.get(this.apiRouteMapper.mapRoute({userId}, environment.apiEndpoints.getUser));
  }
}
