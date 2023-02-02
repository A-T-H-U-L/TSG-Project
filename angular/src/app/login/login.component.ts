import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../auth/authentication.service';
import { CredentialsService } from '@app/auth';


const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // version: string | null = environment.version;
  error: string | undefined;
  // loginForm!: FormGroup;
  // isLoading = false;
  errTrue:boolean=false;
  loginError: boolean = false;
  isLoading: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private _formBuilder :FormBuilder,
    private _credentialService :CredentialsService,
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  // login() {
  //   if (this.loginForm.valid) {
     
  //     this.isLoading = true;
  //     this.authenticationService
  //       .login(this.loginForm.value)
  //       .pipe(
  //         finalize(() => {
  //           this.loginForm.markAsPristine();
  //           this.isLoading = false;
  //         }),
  //         untilDestroyed(this)
  //       )
  //       .subscribe((data) => {
  //         log.debug(`${data} successfully logged in`);
  //         console.log("credentials"+JSON.stringify(data))
  //       // this._router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
  //       // this._credentialService.setCredentials(credentials)
        
  //         console.log('aaaa1');
  //       });
  //   }
  //   console.log('aaaa');
  // }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('this.loginForm.valid', this.loginForm.value);
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response) => {
        
          this.isLoading = false;
          console.log('response', response);
          this._credentialService.setCredentials(response)
          this._router.navigate(['/home']);
        },
        (error) => {
          this.isLoading = false;
          this.errTrue = true
          console.log('response', error);
        }
      );
    }
  };

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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
