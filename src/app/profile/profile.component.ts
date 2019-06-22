import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public loadingUser = true;
  public user: User;

  public userProfilePictureRoute: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser('5d0e513ac7e3e579444ee8f6').subscribe((user: User) => {
      this.loadingUser = false;
      this.user = user;
      this.userProfilePictureRoute = this.getUserProfilePicture();
    }, () => {
      this.loadingUser = false;
      console.error('could not get a user');
    });
  }

  public getUserProfilePicture(): string {
    const gender = Math.random() >= .5 ? 'men' : 'women';
    const index = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
  }
}
