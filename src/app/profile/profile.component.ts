import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
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
  public loadingTags = true;

  public hasSubmit = false;

  public user: User;
  public branches: any[];
  public linesOfService: any[];
  public tags: Tag[];

  public userTags: any;

  public userProfilePictureRoute: string;

  private user$: Observable<any>;
  private tags$: Observable<any>;

  constructor(private userService: UserService, private referenceService: ReferenceService) { }

  ngOnInit() {
    this.getUser();
    this.getBranches();
    this.getLinesOfService();
    this.getTags();
    this.prepMapTags();
  }

  private getUser() {
    this.user$ = this.userService.getUser('UKFMZV1NW');
    this.user$.pipe(shareReplay(1)).subscribe((user: User) => {
      this.loadingUser = false;
      this.user = user;
      this.userProfilePictureRoute = this.getUserProfilePicture();
    }, () => {
      this.loadingUser = false;

      console.error('could not get a user.');
    });
  }

  private getTags() {
    this.tags$ = this.referenceService.getTags();
    this.tags$.pipe(shareReplay(1)).subscribe((tags) => {
      this.tags = tags;
      this.loadingTags = false;
    })
  }

  private prepMapTags() {
    const forkingShit = forkJoin([this.tags$, this.user$]);
    forkingShit.subscribe(([tags, user]) => {
      this.mapTags();
    });
  }

  private mapTags() {
    this.userTags = this.tags.filter(
      (tag) => this.user.userTags.find(
        (userTag) => userTag && tag.id === userTag.tagId));
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
