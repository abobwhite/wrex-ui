import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
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

  public user;
  public userLoading = true;

  public linesOfServiceLoading = true;
  public branchesLoading = true;

  public userFormGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private referenceService: ReferenceService, private menuService: MenuService, private router: Router) {
  }

  ngOnInit() {
    this.manageSlackCode();
    this.getBranches();
    this.getLinesOfService();
  }

  private manageSlackCode() {
    const code = this.activatedRoute.snapshot.queryParamMap.get('code');
    if (code) {
      if (!environment.production) {
        this.userService.setCurrentUser('UKFMZV1NW').subscribe((user) => {
          this.userService.checkCurrentUser();
          console.log(user);
          this.user = user;
          this.menuService.setForceRegistration((!this.user.hireDate && !this.user.branchId && !this.user.lineOfServiceId));

          this.buildFormGroup();
          this.userLoading = false;
        })
      } else {
        this.userService.postUsersCode(code).subscribe((user) => {
          console.log(user);
          this.userService.setCurrentUser(user.id).subscribe();

          this.user = user;
          this.menuService.setForceRegistration(!(!this.user.hireDate && !this.user.branchId && !this.user.lineOfServiceId));
          this.buildFormGroup();
          this.userLoading = false;
        }, (e) => {
          console.log(e, 'error posting slack code');
        })
      }
    }
  }

  private buildFormGroup() {
    this.userFormGroup = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      hireDate: new FormControl(new Date(this.user.hireDate)),
      branchId: new FormControl(this.user.branchId),
      lineOfServiceId: new FormControl(this.user.lineOfServiceId),
    })
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

  public submitRegistration() {
    console.log(this.userFormGroup.value);
    const user = {...this.userFormGroup.value};
    user.id = this.user.id;
    this.userService.updateUser(user).subscribe(() => {
      this.menuService.setForceRegistration(false);
      this.router.navigateByUrl('/preferences');
    });

  }
}
