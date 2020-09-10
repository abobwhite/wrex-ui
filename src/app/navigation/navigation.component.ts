import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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
  @ViewChild('drawer', {static: true}) drawer: MatDrawer;

  isLoggedIn = false;
  showNav: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private menuService: MenuService, private router: Router) {}

  ngOnInit() {
    this.userService.currentUserSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })

    this.userService.checkCurrentUser();

    this.menuService.forceRegistrationSubject.subscribe((forceRegistration) => {
      this.showNav = !forceRegistration;
    })
  }

  public close() {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.drawer.toggle();
      }
    })
  }

  public logout() {
    this.userService.clearAuth();
    this.userService.currentUser$ = undefined;
    this.isLoggedIn = false;
    this.router.navigateByUrl('/')
    this.close();
  }
}
