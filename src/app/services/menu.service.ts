import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public forceRegistrationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setForceRegistration(force: boolean) {
    console.log(force);
    this.forceRegistrationSubject.next(force);
  }
}
