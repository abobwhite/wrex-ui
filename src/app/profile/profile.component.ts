import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Tag } from 'src/models/tag.model';
import { User } from '../../models/user.model';
import { ReferenceService } from '../services/reference.service';
import { StatusesService } from '../services/statuses.service';
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
  public loadingStatuses = true;

  public hasSubmit = false;
  public myProfile: boolean;

  public user: User;
  public branches: any[];
  public linesOfService: any[];
  public tags: Tag[];
  public statuses: any[];

  public userTags: any;

  public userProfilePictureRoute: string;
  public statusMessage: string;

  private user$: Observable<any>;
  private tags$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private referenceService: ReferenceService,
    private statusesService: StatusesService
  ) { }

  ngOnInit() {
    this.checkParams();
    this.getBranches();
    this.getLinesOfService();
  }

  private checkParams() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const userFromRoute = params.get('userId');

      this.myProfile = !userFromRoute;

      if (this.myProfile) {
        this.user$ = this.userService.getCurrentUser('UKFMZV1NW');
      } else {
        this.user$ = this.userService.getUser(userFromRoute);
      }

      this.prepMapTags();
    })
  }

  private prepMapTags() {
    this.tags$ = this.referenceService.getTags();

    const forkingShit = forkJoin([this.tags$, this.user$]);

    forkingShit.subscribe(
      ([tags, user]) => {
        this.tags = tags;
        this.loadingTags = false;
        this.user = user;
        this.loadingUser = false;
        this.userProfilePictureRoute = this.getUserProfilePicture();
        this.getStatuses();
        this.mapTags();
      });
  }

  private getStatuses() {
    this.statusesService.getStatuses(this.user.id).subscribe((statuses: any[]) => {
      this.statuses = statuses.reverse().slice(0, 5);
      this.loadingStatuses = false;
    })
  }

  private mapTags() {
    this.userTags = this.tags.filter(
      (tag) => this.user.userTags.find(
        (userTag) => userTag && tag.id === userTag.tagId)).slice(0, 20);
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
    if (this.statusMessage) {
      this.postStatus();
    }
  }

  private postStatus() {
    this.statusesService.postStatus(this.user.id, { message: this.statusMessage }).subscribe(() => {
      this.hasSubmit = true;
      this.statusMessage = '';
      this.getStatuses();
    })
  }
}
