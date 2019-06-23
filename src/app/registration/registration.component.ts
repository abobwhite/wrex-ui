import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from '../services/reference.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public linesOfService;
  public branches;

  public linesOfServiceLoading = true;
  public branchesLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private referenceService: ReferenceService) {
  }

  ngOnInit() {
    this.manageSlackCode();
    this.getBranches();
    this.getLinesOfService();
  }

  private manageSlackCode() {
    const code = this.activatedRoute.snapshot.queryParamMap.get('code');
    if (code) {
      this.userService.postUsersCode(code).subscribe((thing) => {
        console.log(thing);
      }, (e) => {
        console.log(e, 'error posting slack code');
      })
    } else {
      console.log('no code, bruh')
    }
  }

  private getBranches() {
    this.referenceService.getBranches().subscribe((branches) => {
      this.branches = branches
      this.branchesLoading = false;
    })
  }

  private getLinesOfService() {
    this.referenceService.getLinesOfService().subscribe((linesOfService) => {
      this.linesOfService = linesOfService;
      this.linesOfServiceLoading = false;
    })
  }
}
