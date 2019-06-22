import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PocService {

  constructor(private httpClient: HttpClient) { }

  public getInfo() {
    return this.httpClient.get(`${environment.apiBase}${environment.apiEndpoints.info}`);
  }
}
