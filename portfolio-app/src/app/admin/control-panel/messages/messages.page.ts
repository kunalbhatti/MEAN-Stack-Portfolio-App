import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActionSheetController,
  ModalController
} from '@ionic/angular';
import {
  take
} from 'rxjs/operators';
import {
  ToasterService
} from './../../../services/toaster.service';
import {
  Message
} from '../../../models/message.model';
import {
  DeleteMessageComponent
} from '../modals/delete-message/delete-message.component';
import {
  ReplyToMessageComponent
} from '../modals/reply-to-message/reply-to-message.component';
import {
  MessageService
} from './../../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  messages: Message[];

  constructor(private messageService: MessageService,
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {}

  ngOnInit() {

  }
  // Fetch messeges each time the page is navigated to
  ionViewDidEnter() {
    let unreadCount = 0;
    this.messageService.getMessages().pipe(take(1)).subscribe((messagesList: {
      messages: Message[]
    }) => {
      this.messages = messagesList.messages;
      this.messages.forEach((message: Message) => {
        if (message.status == 'unread') {
          unreadCount++;
        }
      });
      this.messageService.unreadCount.emit(unreadCount);
    }, (error: {
      message: string
    }) => {
      this.toasterService.createToast('Fetch Operation Failed', error.message, 'danger');
    })
  }

  presentMessageOptions(message: Message): void {
    this.actionSheetController.create({
      header: 'Message Options',
      buttons: [{
          text: 'Reply',
          icon: 'mail-outline',
          handler: () => {
            this.modalController.create({
              component: ReplyToMessageComponent,
              componentProps: {
                message
              }
            }).then(modal => {
              modal.present();
              return modal.onDidDismiss();
            }).then(modalData => {
              if (modalData.role === 'send') {

                this.messageService.sendEmail(modalData.data).pipe(take(1)).subscribe((data: {
                  message: string
                }) => {
                  this.toasterService.createToast('Email Sent', data.message)

                  // update the status of the message to read if the person has been replied to
                  this.messageService.updateMessageStatus(message._id, message.status === 'unread' ? 'read' : 'unread').pipe(take(1)).subscribe(
                    (update: {
                      status: string,
                      _id: string,
                      unreadCount: number
                    }) => {
                      const messageIndex = this.messages.findIndex(message => {
                        return message._id === update._id;
                      });
                      this.messages[messageIndex].status = update.status;
                      this.messageService.unreadCount.emit(update.unreadCount);
                    }, (error: {
                      message: string
                    }) => {
                      this.toasterService.createToast('Update Operation Failed', error.message, 'danger');
                    });

                }, (error: {
                  message: string
                }) => {
                  this.toasterService.createToast('Error Sending Mail', error.message, 'danger');
                });
              }
            });
          },
        }, {
          text: message.status === 'unread' ? 'Mark As Read' : 'Mark As Unread',
          icon: message.status === 'unread' ? 'eye-outline' : 'eye-off-outline',
          handler: () => {
            this.messageService.updateMessageStatus(message._id, message.status === 'unread' ? 'read' : 'unread').pipe(take(1)).subscribe(
              (update: {
                status: string,
                _id: string,
                unreadCount: number
              }) => {

                this.toasterService.createToast('Status Updated', 'Message status has updated to ' + update.status);

                const messageIndex = this.messages.findIndex(message => {

                  return message._id === update._id;
                });
                this.messages[messageIndex].status = update.status;
                this.messageService.unreadCount.emit(update.unreadCount);
              }, (error: {
                message: string
              }) => {
                this.toasterService.createToast('Update Operation Failed', error.message, 'danger');
              });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.modalController.create({
              component: DeleteMessageComponent,
              componentProps: {
                message
              }
            }).then(modal => {
              modal.present();
              return modal.onDidDismiss();
            }).then(modalData => {
              if (modalData.role === 'delete') {
                this.messageService.deleteMessage(message._id).pipe(take(1)).subscribe(
                  (result: {
                    _id: string,
                    unreadCount: number
                  }) => {

                    this.toasterService.createToast('Message Deleted', 'Message has been deleted successfully');

                    const messageIndex = this.messages.findIndex(message => {
                      return message._id === result._id;
                    });

                    this.messages.splice(messageIndex, 1);

                    this.messageService.unreadCount.emit(result.unreadCount);
                  }, (error: {
                    message: string
                  }) => {
                    this.toasterService.createToast('Delete Operation Failed', error.message, 'danger');
                  });
              }
            });
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        }
      ],
    }).then(messageEl => {
      messageEl.present();
    })
  }

}
