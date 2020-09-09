import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRouteMapperService {

  constructor() { }

  mapRoute(props: any, route: string): string {
    Object.entries(props).forEach(([key, value]: [string, string]) => {
      route = route.replace(`:${key}`, value);
    });

    return route;
  }
}
