import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  NavController
} from '@ionic/angular';

import {
  DeleteProjectComponent
} from '../modals/delete-project/delete-project.component';
import {
  EditProjectComponent
} from '../modals/edit-project/edit-project.component';

import {
  AdminService
} from './../../../services/admin.service';

import {
  ContentService
} from './../../../services/content.service';

import {
  Project
} from './../../../models/project.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: Project[] = [];

  constructor(private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private adminService: AdminService,
    private contentService: ContentService,
    private navController: NavController) {}

  ngOnInit() {
    this.contentService.getProjects().pipe(take(1)).subscribe(
      (projectsList: {
        projects: Project[]
      }) => {
        this.projects = projectsList.projects;
      }
    );
  }

  async presentActionSheet(project: Project) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Project Options',
      buttons: [{
        text: 'Open',
        icon: 'open-outline',
        handler: () => {
          this.navController.navigateForward(['/', 'portfolio', 'projects', 'open-project', project._id])
        },
      }, {
        text: 'Edit',
        icon: 'pencil-outline',
        handler: () => {
          this.presentEditModal(project);
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.modalController.create({
            component: DeleteProjectComponent,
            componentProps: {
              project
            }
          }).then(modal => {
            modal.present();
            return modal.onDidDismiss();
          }).then(modalData => {
            if (modalData.role === 'delete') {
              this.adminService.deleteProject(project._id, modalData.data.image, modalData.data.video).pipe(take(1)).subscribe(
                (result: {
                  deleted: boolean
                }) => {
                  if (result.deleted) {
                    this.projects = this.projects.filter(projectItem => {
                      if (projectItem._id !== project._id) {
                        return true;
                      }
                      return false;
                    })
                  }
                }
              );
            }
          })
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  presentEditModal(project ? : Project) {
    this.modalController.create({
      component: EditProjectComponent,
      componentProps: {
        project
      }

    }).then(
      modal => {
        modal.present();
        return modal.onDidDismiss();
      }).then(
      modalData => {
        if (modalData.role === 'submit') {
          if (!project) {
            this.adminService.createProject(modalData.data).pipe(take(1)).subscribe(

              (uploadedProject: Project) => {
                this.projects.push(uploadedProject);
              }
            );
          } else {
            modalData.data.data._id = project._id;
            modalData.data.data.image = project.image;
            // modalData.data.data.oldImage = project.image;
            // modalData.data.data.oldVideo = project.video;

            this.adminService.editProject(modalData.data).pipe(take(1)).subscribe(
              (edittedProject: Project) => {
                let projectIndex = this.projects.findIndex(project => {
                  if (project._id === edittedProject._id) {
                    return true;
                  }
                  return false;
                });

                this.projects[projectIndex] = edittedProject;
              }
            )
          }
        }
      }
    );
  }

}
