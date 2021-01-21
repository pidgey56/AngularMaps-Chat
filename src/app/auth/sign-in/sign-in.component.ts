import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private snackService: SnackbarService,
    private router: Router
  ) {}

  loginForm: FormGroup;
  errorMessage: string;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  onReset() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .signInUser(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.snackService.openSnackBar('Connexion successfull', 5000);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.errorMessage = err;
      });
  }
}
