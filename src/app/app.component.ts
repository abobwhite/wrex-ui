import { Component, OnInit } from '@angular/core';
import { ReferenceService } from './services/reference.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private referenceService: ReferenceService) { }

  public ngOnInit() {
    this.getBranches();
    this.getLinesOfService();
  }

  public getBranches() {
    this.referenceService.getBranches().subscribe();
  }

  public getLinesOfService() {
    this.referenceService.getLinesOfService().subscribe();
  }
}
