import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../auth/authentication.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // version: string | null = environment.version;
  // error: string | undefined;
  // loginForm!: FormGroup;
  // isLoading = false;
  loginError: boolean = false;
  isLoading: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private _formBuilder :FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.isLoading = true;
      this.authenticationService
        .login(this.loginForm.value)
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe((credentials) => {
          log.debug(`${credentials} successfully logged in`);
          console.log("credentials"+credentials)
          // this._router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
        
        
        
        });
    }
    console.log('aaaa');
  }
  // login() {
  //   this.isLoading = true;
  //   const login$ = this.authenticationService.login(this.loginForm.value);
  //   login$
  //     .pipe(
  //       finalize(() => {
  //         this.loginForm.markAsPristine();
  //         this.isLoading = false;
  //       }),
  //       untilDestroyed(this)
  //     )
  //     .subscribe(
  //       (credentials) => {
  //         log.debug(`${credentials.username} successfully logged in`);
  //         this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
  //       },
  //       (error) => {
  //         log.debug(`Login error: ${error}`);
  //         this.error = error;
  //       }
  //     );
  // }

  private createForm() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
