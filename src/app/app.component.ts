import { Component, OnInit } from '@angular/core';
import { PocService } from './poc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dbs-hackathon-ui';
  info: any;
  infoSubscribable: any;
  constructor(private pocService: PocService) {}

  ngOnInit() {
    this.getInfo();
  }
  /**
   * getInfo
   */
    public getInfo() {
      this.infoSubscribable = this.pocService.getInfo()
      .subscribe((info: any) => {
        this.info = info;
      });
  }
}
