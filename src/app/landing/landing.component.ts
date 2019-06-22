import { Component, OnInit } from '@angular/core';
import { PocService } from '../poc.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  info: any;
  constructor(private pocService: PocService) { }

  ngOnInit() {
    this.getInfo();
  }

  public getInfo() {
    this.pocService.getInfo()
      .subscribe((info: any) => {
        this.info = info;
      });
  }
}
