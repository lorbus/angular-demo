import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthStore} from '../service/auth.store';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthStore,
    private readonly toast: ToastrService,
  ) {
    this.form = fb.group({
      email: [
        'test@test.io',
        [Validators.required]
      ],
      password: [
        'test',
        [Validators.required]
      ]
    });
  }

  ngOnInit() {
    // method 'ngOnInit' is empty
  }

  login() {
    const val = this.form.value;

    this.auth.login(val.email, val.password)
      .subscribe(
        () => {
          this.toast.info(val.email, "Welcome back");
          this.router.navigateByUrl("/");
        },
        err => {
          this.toast.error("Email and/or Password not correct.", "Login failed");
          console.log(err.message);
        }
      );
  }

}
