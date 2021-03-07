import {
  Injectable
} from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import {
  Observable,
  of ,
  throwError
} from "rxjs";
import {
  catchError,
  map,
  take
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url: string = '';
  //private url: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable < {
    auth: boolean,
    token: string
  } > {

    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    const body = {
      email,
      password
    }

    return this.httpClient.post < {
      auth: boolean,
      token: string
    } > (`${this.url}/auth/login`, body, {
      headers
    }).pipe(catchError(this.errorHandler));

  }

  checAuthStatus(): Observable < {
    auth: boolean,
    status: number
  } > {

    const headers = {
      'content-type': 'application/json'
    }

    return this.httpClient.post < {
      auth: boolean,
      message: string
    } > (`${this.url}/auth/check-auth-status`, {}, {
      headers
    }).pipe(take(1), map(
      (user: {
        auth: boolean,
        message: string
      }) => {
        if (user) {
          return {
            auth: user.auth,
            status: 200
          }
        }
      }
    ), catchError((err: HttpErrorResponse) => {
      return of({
        auth: err.error.auth,
        status: err.status
      })
    }))
  }

  getAccessToken(){
    let token = localStorage.getItem('portfolio-app-token');
    if (!token) {
      token = '';
    }

    return token;
  }

  private errorHandler(errorRes: HttpErrorResponse): Observable < any > {
    let errorMessage = 'Unknown error';

    if (errorRes.message)
      errorMessage = errorRes.error;

    return throwError(errorMessage);
  }
}
