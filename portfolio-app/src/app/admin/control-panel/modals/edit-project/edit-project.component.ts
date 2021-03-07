import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  ModalController
} from '@ionic/angular';
import {
  Project
} from './../../../../models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {

  @Input() project: Project;
  selectedImage: File | string;
  file: File;

  selectedVideo: File | string;
  videoFile: File;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onDismiss() {
    this.modalController.dismiss(null, 'close');
  }

  onSubmit(form: NgForm) {
    form.value.image = this.file;
    form.value.video = this.videoFile;

    this.modalController.dismiss({
      data: form.value
    }, 'submit');
  }

  fileChange(event: any, type: string) {

    if (event.target.files && event.target.files[0]) {
      if(type === 'image'){
        this.file = event.target.files[0];
      } else {
        this.videoFile = event.target.files[0];
      }
      let reader = new FileReader();
      reader.onload = (event: any) => {
        if(type === 'image') {
          this.selectedImage = event.target.result;
        } else {
          this.selectedVideo = event.target.result;
        }
      }
      reader.readAsDataURL(event.target.files[0]); // to trigger onload
    }

  }
}
