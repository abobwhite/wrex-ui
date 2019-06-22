import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public linesOfService = [
    { name: 'BA' },
    { name: 'D&A' },
    { name: 'SA&E' },
  ];

  public branches = [
    { name: 'STL'},
    { name: 'MSL'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
