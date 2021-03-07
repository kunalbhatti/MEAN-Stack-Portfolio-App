import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {
  EventEmitter,
  Injectable
} from "@angular/core";
import {
  Observable,
  throwError
} from "rxjs";
import {
  catchError
} from "rxjs/operators";
import {
  Message
} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = '';
  //private url = 'http://localhost:3000';

  unreadCount: EventEmitter < number > = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  sendMessage(message: Message): Observable < any > {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })
    return this.httpClient.post(`${this.url}/messenger/create-message`, message, {
      headers
    }).pipe(catchError(this.errorHandler));
  }

  sendEmail(message: {
    email: string,
    subject: string,
    message: string
  }) {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.httpClient.post(`${this.url}/messenger/send-email`, message, {
      headers
    }).pipe(catchError(this.errorHandler));
  }

  getMessages(): Observable < any > {
    return this.httpClient.get(`${this.url}/messenger/get-messages`).pipe(catchError(this.errorHandler));;
  }

  getUnreadCount(): Observable < any > {
    return this.httpClient.get(`${this.url}/messenger/get-unread-count`).pipe(catchError(this.errorHandler));;
  }

  updateMessageStatus(messageId: string, status: string): Observable < any > {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })
    return this.httpClient.patch(`${this.url}/messenger/update-message-status`, {
      messageId,
      status
    }, {
      headers
    }).pipe(catchError(this.errorHandler));;
  }

  deleteMessage(messageId: string): Observable < any > {
    return this.httpClient.delete(`${this.url}/messenger/delete-message/${messageId}`).pipe(catchError(this.errorHandler));;
  }

  private errorHandler(errorRes: HttpErrorResponse): Observable < any > {
    let errorMessage = 'Unknown error';

    if (errorRes.message) {
      errorMessage = errorRes.error
    }

    return throwError(errorMessage);
  }
}
