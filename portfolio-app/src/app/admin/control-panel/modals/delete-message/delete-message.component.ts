import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  Message
} from './../../../../models/message.model';

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss'],
})
export class DeleteMessageComponent implements OnInit {
  @Input() message: Message;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onDismiss() {
    this.modalController.dismiss(null, 'cancel');
  }

  onDelete(){
    this.modalController.dismiss(null, 'delete');
  }
}
