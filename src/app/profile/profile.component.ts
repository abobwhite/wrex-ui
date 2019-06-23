import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/models/tag.model';
import { User } from '../../models/user.model';
import { ReferenceService } from '../services/reference.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public loadingUser = true;
  public loadingLinesOfService = true;
  public loadingBranches = true;
  public hasSubmit = false;
  public user: User;
  public branches: any[];
  public linesOfService: any[];

  public tags: Tag[] = [
    { id: '1', categories: [], name: 'Angular' },
    { id: '1', categories: [], name: 'React' },
    { id: '1', categories: [], name: 'Visual Basic' },
    { id: '1', categories: [], name: 'Client Gathering' },
    { id: '1', categories: [], name: 'Angular.js' },
    { id: '1', categories: [], name: 'jQuery' },
  ];

  public userProfilePictureRoute: string;

  constructor(private userService: UserService, private referenceService: ReferenceService) { }

  ngOnInit() {
    this.getUser();
    this.getBranches();
    this.getLinesOfService();
  }

  private getUser() {
    this.userService.getUser('UKFMZV1NW').subscribe((user: User) => {
      this.loadingUser = false;
      this.user = user;
      this.userProfilePictureRoute = this.getUserProfilePicture();
    }, () => {
      this.loadingUser = false;
      console.error('could not get a user');
    });
  }

  private getBranches() {
    this.referenceService.getBranches().subscribe((branches) => {
      this.branches = branches;
      this.loadingBranches = false;
    });
  }

  public getLinesOfService() {
    this.referenceService.getLinesOfService().subscribe((linesOfService) => {
      this.linesOfService = linesOfService;
      this.loadingLinesOfService = false;
    });
  }

  public getUserBranch(branchId: string): string {
    return this.branches.find((branch) => branch.id === branchId).name;
  }

  public getUserLineOfService(LineOfServiceId: string): string {
    return this.linesOfService.find((lineOfService) => lineOfService.id === LineOfServiceId).name;
  }

  public getUserProfilePicture(): string {
    const gender = Math.random() >= .5 ? 'men' : 'women';
    const index = Math.floor(Math.random() * 100);

    return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
  }

  public submitStatus() {
    this.hasSubmit = true;
  }
}
