import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from '../services/menu.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  showNav: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private menuService: MenuService) {}

  ngOnInit() {
    this.userService.currentUserSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })

    this.userService.checkCurrentUser();

    this.menuService.forceRegistrationSubject.subscribe((forceRegistration) => {
      console.log('changed', !forceRegistration)
      this.showNav = !forceRegistration;
    })
  }
}
