import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  Observable,
  throwError
} from "rxjs";
import {
  take,
  map,
  catchError
} from "rxjs/operators";
import {
  Project
} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private _projects: Project[];

  set projects(projects: Project[]) {
    this._projects = projects;
  }

  get projects() {
    return this._projects;
  }

  private url: string = '';
  //private url: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable < any > {

    return this.httpClient.get(`${this.url}/app/get-projects`).pipe(take(1), map((projectsList: {
      projects: Project[]
    }) => {
      projectsList.projects.forEach((project: Project) => {
        project.imageLink = `${this.url}/app/images/${project.image}`;
        project.videoLink = `${this.url}/app/video/${project.video}`;
      })
      return projectsList;
    }), catchError(this.errorHandler));

  }

  filterProject(projectId: string): Project {
    const project = this._projects.filter(project => {
      return project._id === projectId;
    });

    return project[0];
  }

  getProject(projectId: string): Observable < Project > {
    return this.httpClient.get(`${this.url}/app/get-project/${projectId}`).pipe(take(1), map((data: {
      project: Project
    }) => {
      data.project.imageLink = `${this.url}/app/images/${data.project.image}`;
      data.project.videoLink = `${this.url}/app/video/${data.project.video}`;
      return data.project;
    }), catchError(this.errorHandler));
  }

  private errorHandler(errorRes: HttpErrorResponse): Observable < any > {
    let errorMessage = 'Unknown error';

    if (errorRes.message) {
      errorMessage = errorRes.error
    }

    return throwError(errorMessage);
  }
}
