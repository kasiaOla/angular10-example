import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authentication/auth/auth.service';
import { UserSharedService } from '../../../shared/shared-services/user/user-shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from '../../../shared/shared-services/logger/logger.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],

})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private logger: LoggerService,
              private userSharedService: UserSharedService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched)
    );
  }

  login(): void {

    if (this.loginForm.dirty && this.loginForm.valid) {

      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.success === false) {
          } else if (data.success === true) {
            this.userSharedService.shareUser(data.respons);
         //   this.router.navigate(['user/profile']);
          }
          this.loginForm.reset();
        }, (Error: any) => {
          if (Error instanceof HttpErrorResponse) {
            this.logger.error('Error name: ' + Error.error);
            this.logger.error('Error status text: ' + Error.statusText);
            this.logger.error('Error status: ' + Error.status);
          }
        });

    }
  }

}
