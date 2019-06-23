import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiRouteMapperService } from './api-route-mapper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser$: Observable<any>;
  public currentUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private users$: Observable<any>;

  constructor(private http: HttpClient, private apiRouteMapper: ApiRouteMapperService, private router: Router) {
  }

  public checkCurrentUser() {
    console.log(!!this.currentUser$)
    this.currentUserSubject.next(!!this.currentUser$);
  }

  public getCurrentUser() {
    if (!this.currentUser$ && !this.getAuth()) {
      this.router.navigateByUrl('/');
      return EMPTY;
    }

    if (!this.currentUser$) {
      return this.setCurrentUser(JSON.parse(this.getAuth()).id)
    }

    return this.currentUser$;
  }

  public setCurrentUser(userId: string) {
    this.currentUser$ = this.getUser(userId);
    this.currentUserSubject.next(!!this.currentUser$);
    return this.currentUser$;
  }

  public getUser(userId: string) {
    return this.http.get(this.apiRouteMapper.mapRoute({ userId }, environment.apiEndpoints.getUser));
  }

  public getUsers() {
    if (!this.users$) {
      this.users$ = this.http.get(environment.apiEndpoints.getUsers);
    }
    return this.users$;
  }

  public updateUser(user) {
    return this.http.patch(this.apiRouteMapper.mapRoute({ userId: user.id }, environment.apiEndpoints.getUser), user);
  }

  public storeAuth(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getAuth() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public clearAuth() {
    localStorage.clear();
  }

  public postUsersCode(code: string): Observable<any> {
    return this.http.post(environment.apiEndpoints.postUsersCode, { code })
  }
}
