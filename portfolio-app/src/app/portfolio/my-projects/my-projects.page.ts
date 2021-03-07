import {
  Component,
  OnInit
} from '@angular/core';
import { take } from 'rxjs/operators';
import {
  Project
} from './../../models/project.model';
import {
  ContentService
} from './../../services/content.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.page.html',
  styleUrls: ['./my-projects.page.scss'],
})
export class MyProjectsPage implements OnInit {

  projects: Project[];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getProjects().pipe(take(1)).subscribe(
      (projectsList: {
        projects: Project[]
      }) => {
        this.projects = projectsList.projects;
        this.contentService.projects = this.projects;
      }
    );
  }

}
