import {
  Component
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  first
} from 'rxjs/operators';
import {
  AuthService
} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  error: string;

  constructor(private authService: AuthService) {}

  onLogin(f: NgForm): void {
    const email = f.value.email;
    const password = f.value.password;

    this.authService.login(email, password).pipe(first()).subscribe(
      (result: {
        auth: boolean,
        token: string
      }) => {
        if (result.auth) {
          localStorage.setItem('porfolio-app-token', result.token);
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
