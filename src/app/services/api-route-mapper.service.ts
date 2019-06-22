import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRouteMapperService {

  constructor() { }

  mapRoute(props: any, route: string): string {
    Object.entries(props).forEach(([key, value]: [string, string]) => {
      console.log(key, value);
      route = route.replace(`:${key}`, value);
      console.log('looping', route);
    });
    console.log('outside of loop', route);
    return route;
  }
}
