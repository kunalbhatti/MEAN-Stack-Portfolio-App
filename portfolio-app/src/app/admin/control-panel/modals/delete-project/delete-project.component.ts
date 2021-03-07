import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Project } from './../../../../models/project.model';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss'],
})
export class DeleteProjectComponent implements OnInit {

  @Input() project: Project;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onDismiss(){
    this.modalController.dismiss(null, 'close');
  }

  onDelete() {
    this.modalController.dismiss({image: this.project.image, video: this.project.video}, 'delete');
  }
}
