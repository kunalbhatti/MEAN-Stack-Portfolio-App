import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  forkJoin,
  Observable,
  throwError
} from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  take
} from "rxjs/operators";
import {
  Project
} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url: string = '';
  //private url: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  createProject(project: Project): Observable < Project > {

    const image: File = project['data'].image;
    const imageName = `${project['data'].name}_${new Date().getTime()}_thumbnail.png`
    project['data'].image = imageName;

    const video: File = project['data'].video;
    const videoName = `${project['data'].name}_${new Date().getTime()}_video.mp4`
    project['data'].video = videoName;


    const headers: HttpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'enctype': 'multipart/form-data'
    });

    return this.httpClient.post(`${this.url}/admin/create-project`, project, {
      headers
    }).pipe(take(1), map((newProject: Project) => {
      return newProject;
    }), mergeMap((newProject: Project) => {
      return this.uploadFile(image, imageName, 'image').pipe(take(1), map(() => {

        const uploadedProject = {
          ...newProject['project']
        };
        uploadedProject.imageLink = `${this.url}/app/images/${imageName}`

        return uploadedProject;
      }))
    }), mergeMap((uploadedProject: Project) => {
      return this.uploadFile(video, videoName, 'video').pipe(take(1), map(() => {
        uploadedProject.videoLink = `${this.url}/app/video/${videoName}`
        return uploadedProject;
      }))
    }), catchError(this.errorHandler));

  }

  editProject(project: Project): Observable < any > {

    // const image: File = project['data'].image;
    // const imageName = `${project['data'].name}_${new Date().getTime()}_thumbnail.png`
    // const oldImage = project['data'].oldImage;

    // const video: File = project['data'].video;
    // const videoName = `${project['data'].name}_${new Date().getTime()}_video.mp4`
    // const oldVideo = project['data'].oldVideo;

    // delete project['data'].oldImage;
    // delete project['data'].oldVideo;

    // if (image) {
    //   project['data'].image = imageName;
    //   const fd = new FormData();
    //   fd.append('image', image, imageName);

    //   const deleteImage = this.httpClient.delete(`${this.url}/admin/delete-file?fileName=${oldImage}&type=image`);
    //   const uploadImage = this.httpClient.post(`${this.url}/admin/upload-image`, fd);

    //   forkJoin([deleteImage, uploadImage]).pipe(take(1)).subscribe(() => {});
    // }
    // if (video) {
    //   project['data'].video = videoName;

    //   const fd = new FormData();
    //   fd.append('video', video, videoName);

    //   const deleteVideo = this.httpClient.delete(`${this.url}/admin/delete-file?fileName=${oldVideo}&type=video`);
    //   const uploadVideo = this.httpClient.post(`${this.url}/admin/upload-video`, fd);

    //   forkJoin([deleteVideo, uploadVideo]).pipe(take(1)).subscribe(() => {});
    // }

    const headers: HttpHeaders = new HttpHeaders({
      'content-type': 'application/json'
    });

    return this.httpClient.patch(`${this.url}/admin/edit-project`, project, {
      headers
    }).pipe(take(1), map(
      (edittedProject: Project) => {
        const uploadedProject = {
          ...edittedProject['project']
        };
        uploadedProject.imageLink = `${this.url}/app/images/${project['data'].image}`
        return uploadedProject;
      }
    ), catchError(this.errorHandler));
  }


  deleteProject(projectId: string, imageName: string, videoName: string): any {

    return this.httpClient.delete(`${this.url}/admin/delete-project/?projectId=${projectId}&imageName=${imageName}&videoName=${videoName}`).
    pipe(catchError(this.errorHandler));
  }

  uploadFile(file: File, fileName: string, type: string) {
    const fd = new FormData();
    fd.append(type, file, fileName);
    return this.httpClient.post(`${this.url}/admin/upload-${type}`, fd).pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorRes: HttpErrorResponse): Observable < any > {
    let errorMessage = 'Unknown error';

    if (errorRes.message) {
      errorMessage = errorRes.error
    }

    return throwError(errorMessage);
  }
}
