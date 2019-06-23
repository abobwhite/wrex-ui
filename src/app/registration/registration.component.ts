import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public linesOfService = [
    {name: 'BA'},
    {name: 'D&A'},
    {name: 'SA&E'},
  ]

  public branches = [
    {name: 'STL'},
    {name: 'MSL'}
  ]

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.postUsersCode(this.activatedRoute.snapshot.paramMap.get('code'))
  }
}
