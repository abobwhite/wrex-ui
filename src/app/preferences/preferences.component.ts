import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  public user;

  public userLoading = true;

  public preferences: any[] = [
    {
      id: 'randomCoffee',
      name: 'Random Coffee',
    },
    {
      id: 'happyHour',
      name: 'Happy Hours',
    },
    {
      id: 'mentoring',
      name: 'Mentoring',
    },
    {
      id: 'mentored',
      name: 'Mentored',
    },
    {
      id: 'events',
      name: 'Events',
    },
  ];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this.userService.getCurrentUser('UKFMZV1NW').subscribe((user) => {
      this.user = user;
      if (!this.user.preferences) {
        this.user.preferences = {
          randomCoffee: false,
          happyHour: false,
          mentoring: false,
          mentored: false,
          events: false,
        }
      }
      this.userLoading = false;
    })
  }

  public submitPreferences() {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  public do(prefId, val) {
    this.user.preferences[prefId] = val;
  }

}
