import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  take
} from 'rxjs/operators';

import {
  Project
} from './../../../models/project.model';
import {
  ContentService
} from './../../../services/content.service';
import {
  ToasterService
} from './../../../services/toaster.service';

@Component({
  selector: 'app-open-project',
  templateUrl: './open-project.page.html',
  styleUrls: ['./open-project.page.scss'],
})
export class OpenProjectPage implements OnInit {
  project: Project;
  constructor(private route: ActivatedRoute,
    private contentService: ContentService,
    private toasterService: ToasterService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('projectId');
      try {
        this.project = this.contentService.filterProject(projectId);
      } catch (err) {
        this.contentService.getProject(projectId).pipe(take(1)).subscribe(project => {
          this.project = project;
        }, (error: {
          message: string
        }) => {
          this.toasterService.createToast('Error loading Project', error.message, 'danger');
        });
      }
    })
  }

}
