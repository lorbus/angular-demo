import {Component, OnInit} from '@angular/core';
import {AuthStore} from './service/auth.store';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthStore,
    private readonly router: Router,
  ) {

  }

  ngOnInit() {
    // empty method
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login").then(r => []);
  }
}
