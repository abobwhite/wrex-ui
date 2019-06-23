import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  public branches$: Observable<any>;
  public linesOfService$: Observable<any>;

  constructor(private http: HttpClient) { }

  public getBranches() {
    if (!this.branches$) {
      this.branches$ = this.http.get(environment.apiEndpoints.getBranches).pipe(shareReplay(1));
    }

    return this.branches$;
  }

  public getLinesOfService() {
    if (!this.linesOfService$) {
      this.linesOfService$ = this.http.get(environment.apiEndpoints.getLinesOfService).pipe(shareReplay(1));
    }

    return this.linesOfService$;
  }
}
