import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  ModalController
} from '@ionic/angular';
import {
  Message
} from './../../../../models/message.model';

@Component({
  selector: 'app-reply-to-message',
  templateUrl: './reply-to-message.component.html',
  styleUrls: ['./reply-to-message.component.scss'],
})
export class ReplyToMessageComponent implements OnInit {

  @Input() message: Message;

  constructor(private modalcontroller: ModalController) {}

  ngOnInit() {}

  onDismiss() {
    this.modalcontroller.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm) {
    this.modalcontroller.dismiss(form.value, 'send');
  }
}
