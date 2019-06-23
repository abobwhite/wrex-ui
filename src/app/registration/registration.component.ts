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

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private referenceService: ReferenceService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.manageSlackCode();
    this.getBranches();
    this.getLinesOfService();
  }

  private manageSlackCode() {
    const code = this.activatedRoute.snapshot.queryParamMap.get('code');
    if (code) {
      if (!environment.production) {
        if (this.userService.getAuth()) {
          this.router.navigateByUrl('/dashboard');
        }
        this.userService.setCurrentUser(code).subscribe((user) => {
          this.userService.checkCurrentUser();
          this.continueLoggingIn(user);
        })
      } else {
        this.userService.postUsersCode(code).subscribe((user) => {
          this.userService.setCurrentUser(user.id).subscribe(() => {
            this.userService.checkCurrentUser();
            this.continueLoggingIn(user);
          });
        }, (e) => {
          console.log(e, 'error posting slack code');
        })
      }
    }
  }

  private continueLoggingIn(user) {
    this.user = user;
    const registrationIncomplete = !this.user.hireDate && !this.user.branchId && !this.user.lineOfServiceId;
    if (!registrationIncomplete) {
      this.userService.storeAuth(user);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.menuService.setForceRegistration(registrationIncomplete);
    }

    this.buildFormGroup();
    this.userLoading = false;
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
    const user = { ...this.userFormGroup.value };
    user.id = this.user.id;
    this.userService.updateUser(user).subscribe(() => {
      this.userService.setCurrentUser(this.user.id);
      this.menuService.setForceRegistration(false);
      this.userService.storeAuth(user);
      this.router.navigateByUrl('/preferences');
    });

  }
}
