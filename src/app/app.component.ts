import { Component, OnInit } from '@angular/core';
import { ReferenceService } from './services/reference.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private referenceService: ReferenceService, private userService: UserService) { }

  public ngOnInit() {
    this.getBranches();
    this.getLinesOfService();
    this.getTags();
  }

  private getBranches() {
    this.referenceService.getBranches().subscribe();
  }

  private getLinesOfService() {
    this.referenceService.getLinesOfService().subscribe();
  }

  private getTags() {
    this.referenceService.getTags().subscribe();
  }
}
