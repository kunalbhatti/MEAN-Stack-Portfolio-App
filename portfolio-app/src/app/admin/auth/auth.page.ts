import {
  Component,
  OnInit
} from "@angular/core";
import {
  NgForm
} from "@angular/forms";
import {
  Router
} from "@angular/router";

import {
  first
} from "rxjs/operators";
import {
  AuthService
} from "./../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.css']
})
export class AuthPage implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(f: NgForm): void {
    const email = f.value.email;
    const password = f.value.password;

    this.authService.login(email, password).pipe(first()).subscribe(
      (result: {
        auth: boolean,
        token: string
      }) => {
        if (result.auth) {
          localStorage.setItem('portfolio-app-token', result.token);
          this.router.navigate(['/', 'admins', 'control-panel'])
        }
      }, (error: {
        auth: boolean,
        message: string
      }) => {
        this.error = error.message;
      }
    );
  }
}
