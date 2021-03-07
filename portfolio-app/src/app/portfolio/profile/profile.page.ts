import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  ToastController
} from '@ionic/angular';
import {
  take
} from 'rxjs/operators';
import {
  ToasterService
} from '../../services/toaster.service';
import {
  MessageService
} from '../../services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private messageService: MessageService, private toasterService: ToasterService, private toastController: ToastController) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.messageService.sendMessage(form.value).pipe(take(1)).subscribe((data: {
      message: string
    }) => {
      this.toasterService.createToast('Message Sent', 'Hello there!! I have received your message and will get in touch with you as soon as possible. Have a good day.')
      form.reset();
    }, (error: {
      message: string
    }) => {
      this.toasterService.createToast('Error sending message. Please try again later.', '', 'danger');
    });
  }

}
