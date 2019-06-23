import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiRouteMapperService } from './api-route-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser$: Observable<any>;
  private users$: Observable<any>;

  constructor(private http: HttpClient, private apiRouteMapper: ApiRouteMapperService) {
  }

  public getCurrentUser(userId: string) {
    if (!this.currentUser$) {
      this.currentUser$ = this.getUser(userId);
    }
    return this.currentUser$;
  }

  public getUser(userId: string) {
    return this.http.get(this.apiRouteMapper.mapRoute({userId}, environment.apiEndpoints.getUser));
  }

  public getUsers() {
    if (!this.users$) {
      this.users$ = this.http.get(environment.apiEndpoints.getUsers);
    }
    return this.users$;
  }

  public postUsersCode(code: string) {
    return this.http.post(environment.apiEndpoints.postUsersCode, {code})
  }
}
