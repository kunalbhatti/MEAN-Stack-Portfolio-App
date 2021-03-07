import {
  Injectable
} from "@angular/core";
import {
  ToastController
} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class ToasterService {
  constructor(private toastController: ToastController) {}

  createToast(header: string, message: string, color ? : string) {
    this.toastController.create({
      header,
      message,
      position: 'top',
      duration: 2000,
      color,
      buttons: [{
        text: 'Done',
        role: 'cancel'
      }]
    }).then(toastEl => {
      toastEl.present();
    });
  }

}
