(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{"2E56":function(e,t,n){"use strict";n.r(t),n.d(t,"ProjectsPageModule",function(){return z});var i=n("ofXK"),o=n("3Pt+"),c=n("TEn/"),r=n("tyNb"),l=n("fXoL");let a=(()=>{class e{constructor(e){this.modalController=e}ngOnInit(){}onDismiss(){this.modalController.dismiss(null,"close")}onDelete(){this.modalController.dismiss({image:this.project.image,video:this.project.video},"delete")}}return e.\u0275fac=function(t){return new(t||e)(l.Jb(c.F))},e.\u0275cmp=l.Db({type:e,selectors:[["app-delete-project"]],inputs:{project:"project"},decls:14,vars:1,consts:[["slot","primary"],[3,"click"],["name","close-outline","slot","icon-only"],[1,"ion-padding"],[2,"height","100%"],[1,"ion-justify-content-center",2,"height","100%","flex-direction","column"],[2,"display","flex","justify-content","center","align-items","center"],[3,"src"],["color","danger","expand","block",2,"margin-top","10px",3,"click"]],template:function(e,t){1&e&&(l.Mb(0,"ion-header"),l.Mb(1,"ion-toolbar"),l.Mb(2,"ion-title"),l.lc(3,"Delete Project"),l.Lb(),l.Mb(4,"ion-buttons",0),l.Mb(5,"ion-button",1),l.Ub("click",function(){return t.onDismiss()}),l.Kb(6,"ion-icon",2),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(7,"ion-content",3),l.Mb(8,"ion-grid",4),l.Mb(9,"ion-row",5),l.Mb(10,"ion-col",6),l.Kb(11,"ion-img",7),l.Lb(),l.Mb(12,"ion-button",8),l.Ub("click",function(){return t.onDelete()}),l.lc(13," Delete "),l.Lb(),l.Lb(),l.Lb(),l.Lb()),2&e&&(l.zb(11),l.bc("src",null==t.project?null:t.project.imageLink))},directives:[c.n,c.C,c.B,c.g,c.f,c.o,c.l,c.m,c.v,c.k,c.p],styles:[""]}),e})();function s(e,t){1&e&&(l.Mb(0,"ion-label"),l.lc(1,"Image"),l.Lb())}function b(e,t){if(1&e&&(l.Mb(0,"ion-card-header"),l.Kb(1,"ion-img",19),l.Lb()),2&e){const e=l.Wb();l.zb(1),l.bc("src",e.selectedImage?e.selectedImage:null==e.project?null:e.project.imageLink)}}function d(e,t){1&e&&(l.Mb(0,"ion-label"),l.lc(1,"Video"),l.Lb())}function p(e,t){if(1&e&&(l.Mb(0,"ion-card-header"),l.Mb(1,"video",20),l.Kb(2,"source",21),l.Lb(),l.Lb()),2&e){const e=l.Wb();l.zb(2),l.bc("src",e.selectedVideo?e.selectedVideo:null==e.project?null:e.project.videoLink,l.hc)}}let u=(()=>{class e{constructor(e){this.modalController=e}ngOnInit(){}onDismiss(){this.modalController.dismiss(null,"close")}onSubmit(e){e.value.image=this.file,e.value.video=this.videoFile,this.modalController.dismiss({data:e.value},"submit")}fileChange(e,t){if(e.target.files&&e.target.files[0]){"image"===t?this.file=e.target.files[0]:this.videoFile=e.target.files[0];let n=new FileReader;n.onload=e=>{"image"===t?this.selectedImage=e.target.result:this.selectedVideo=e.target.result},n.readAsDataURL(e.target.files[0])}}}return e.\u0275fac=function(t){return new(t||e)(l.Jb(c.F))},e.\u0275cmp=l.Db({type:e,selectors:[["app-edit-project"]],inputs:{project:"project"},decls:46,vars:15,consts:[["slot","primary"],[3,"click"],["slot","icon-only","name","close-outline"],[1,"ion-padding"],[3,"ngSubmit"],["f","ngForm"],["position","floating"],["type","text","name","name","required","",3,"ngModel"],[1,"input-gap"],["type","text","name","description","required","",3,"ngModel"],[2,"display","flex","align-items","center"],[4,"ngIf"],[1,"ion-text-center"],["required","","type","file","name","image","ngModel","",3,"disabled","change"],["required","","type","file","name","video","ngModel","",3,"disabled","change"],["type","text","name","technology","required","",3,"ngModel"],["type","text","name","github","required","",3,"ngModel"],["type","text","name","preview",3,"ngModel"],["type","submit","expand","block",3,"disabled","color"],[3,"src"],["id","videoPlayer","controls","",2,"max-width","100%","max-height","auto"],["type","video/mp4",3,"src"]],template:function(e,t){if(1&e){const e=l.Nb();l.Mb(0,"ion-header"),l.Mb(1,"ion-toolbar"),l.Mb(2,"ion-title"),l.lc(3),l.Lb(),l.Mb(4,"ion-buttons",0),l.Mb(5,"ion-button",1),l.Ub("click",function(){return t.onDismiss()}),l.Kb(6,"ion-icon",2),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(7,"ion-content",3),l.Mb(8,"form",4,5),l.Ub("ngSubmit",function(){l.gc(e);const n=l.fc(9);return t.onSubmit(n)}),l.Mb(10,"ion-item"),l.Mb(11,"ion-label",6),l.lc(12," Name "),l.Lb(),l.Kb(13,"ion-input",7),l.Lb(),l.Mb(14,"ion-item",8),l.Mb(15,"ion-label",6),l.lc(16," Description "),l.Lb(),l.Kb(17,"ion-input",9),l.Lb(),l.Mb(18,"ion-item",8),l.Mb(19,"div",10),l.kc(20,s,2,0,"ion-label",11),l.Mb(21,"ion-card",12),l.kc(22,b,2,1,"ion-card-header",11),l.Mb(23,"ion-card-content"),l.Mb(24,"input",13),l.Ub("change",function(e){return t.fileChange(e,"image")}),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(25,"ion-item",8),l.Mb(26,"div",10),l.kc(27,d,2,0,"ion-label",11),l.Mb(28,"ion-card",12),l.kc(29,p,3,1,"ion-card-header",11),l.Mb(30,"ion-card-content"),l.Mb(31,"input",14),l.Ub("change",function(e){return t.fileChange(e,"video")}),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(32,"ion-item",8),l.Mb(33,"ion-label",6),l.lc(34," Technology "),l.Lb(),l.Kb(35,"ion-input",15),l.Lb(),l.Mb(36,"ion-item",8),l.Mb(37,"ion-label",6),l.lc(38," Github Link "),l.Lb(),l.Kb(39,"ion-input",16),l.Lb(),l.Mb(40,"ion-item",8),l.Mb(41,"ion-label",6),l.lc(42," Preview Link "),l.Lb(),l.Kb(43,"ion-input",17),l.Lb(),l.Mb(44,"ion-button",18),l.lc(45),l.Lb(),l.Lb(),l.Lb()}if(2&e){const e=l.fc(9);l.zb(3),l.mc(t.project?null==t.project?null:t.project.name:"Create Project"),l.zb(10),l.bc("ngModel",null==t.project?null:t.project.name),l.zb(4),l.bc("ngModel",null==t.project?null:t.project.description),l.zb(3),l.bc("ngIf",!(t.selectedImage||null!=t.project&&t.project.imageLink)),l.zb(2),l.bc("ngIf",t.selectedImage||(null==t.project?null:t.project.imageLink)),l.zb(2),l.bc("disabled",!!t.project),l.zb(3),l.bc("ngIf",!(t.selectedVideo||null!=t.project&&t.project.videoLink)),l.zb(2),l.bc("ngIf",t.selectedVideo||(null==t.project?null:t.project.videoLink)),l.zb(2),l.bc("disabled",!!t.project),l.zb(4),l.bc("ngModel",null==t.project?null:t.project.technology),l.zb(4),l.bc("ngModel",null==t.project?null:t.project.github),l.zb(4),l.bc("ngModel",null==t.project?null:t.project.preview),l.zb(1),l.bc("disabled",e.invalid)("color",t.project?"warning":"primary"),l.zb(1),l.nc(" ",t.project?"Edit":"Create"," ")}},directives:[c.n,c.C,c.B,c.g,c.f,c.o,c.l,o.m,o.i,o.j,c.r,c.s,c.q,c.I,o.l,o.h,o.k,i.j,c.h,c.i,o.a,c.j,c.p],styles:[".input-gap[_ngcontent-%COMP%]{margin-top:2px}"]}),e})();var m=n("IzEk"),h=n("tk/3"),g=n("z6cu"),j=n("lJxs"),f=n("5+tZ"),M=n("JIr8");let L=(()=>{class e{constructor(e){this.httpClient=e,this.url=""}createProject(e){const t=e.data.image,n=`${e.data.name}_${(new Date).getTime()}_thumbnail.png`;e.data.image=n;const i=e.data.video,o=`${e.data.name}_${(new Date).getTime()}_video.mp4`;e.data.video=o;const c=new h.d({"content-type":"application/json",enctype:"multipart/form-data"});return this.httpClient.post(`${this.url}/admin/create-project`,e,{headers:c}).pipe(Object(m.a)(1),Object(j.a)(e=>e),Object(f.a)(e=>this.uploadFile(t,n,"image").pipe(Object(m.a)(1),Object(j.a)(()=>{const t=Object.assign({},e.project);return t.imageLink=`${this.url}/app/images/${n}`,t}))),Object(f.a)(e=>this.uploadFile(i,o,"video").pipe(Object(m.a)(1),Object(j.a)(()=>(e.videoLink=`${this.url}/app/video/${o}`,e)))),Object(M.a)(this.errorHandler))}editProject(e){const t=new h.d({"content-type":"application/json"});return this.httpClient.patch(`${this.url}/admin/edit-project`,e,{headers:t}).pipe(Object(m.a)(1),Object(j.a)(t=>{const n=Object.assign({},t.project);return n.imageLink=`${this.url}/app/images/${e.data.image}`,n}),Object(M.a)(this.errorHandler))}deleteProject(e,t,n){return this.httpClient.delete(`${this.url}/admin/delete-project/?projectId=${e}&imageName=${t}&videoName=${n}`).pipe(Object(M.a)(this.errorHandler))}uploadFile(e,t,n){const i=new FormData;return i.append(n,e,t),this.httpClient.post(`${this.url}/admin/upload-${n}`,i).pipe(Object(M.a)(this.errorHandler))}errorHandler(e){let t="Unknown error";return e.message&&(t=e.error),Object(g.a)(t)}}return e.\u0275fac=function(t){return new(t||e)(l.Qb(h.b))},e.\u0275prov=l.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var v=n("NBun");function y(e,t){if(1&e){const e=l.Nb();l.Mb(0,"ion-card",7),l.Kb(1,"ion-img",8),l.Mb(2,"ion-card-header"),l.Mb(3,"ion-title"),l.lc(4),l.Lb(),l.Lb(),l.Mb(5,"ion-card-content"),l.lc(6),l.Lb(),l.Mb(7,"ion-button",9),l.Ub("click",function(){l.gc(e);const n=t.$implicit;return l.Wb().presentActionSheet(n)}),l.lc(8,"More"),l.Lb(),l.Lb()}if(2&e){const e=t.$implicit;l.zb(1),l.bc("src",null==e?null:e.imageLink),l.zb(3),l.mc(null==e?null:e.name),l.zb(2),l.nc(" ",null==e?null:e.description," ")}}const k=[{path:"",component:(()=>{class e{constructor(e,t,n,i,o){this.actionSheetController=e,this.modalController=t,this.adminService=n,this.contentService=i,this.navController=o,this.projects=[]}ngOnInit(){this.contentService.getProjects().pipe(Object(m.a)(1)).subscribe(e=>{this.projects=e.projects})}presentActionSheet(e){return t=this,void 0,i=function*(){const t=yield this.actionSheetController.create({header:"Project Options",buttons:[{text:"Open",icon:"open-outline",handler:()=>{this.navController.navigateForward(["/","portfolio","projects","open-project",e._id])}},{text:"Edit",icon:"pencil-outline",handler:()=>{this.presentEditModal(e)}},{text:"Delete",role:"destructive",icon:"trash",handler:()=>{this.modalController.create({component:a,componentProps:{project:e}}).then(e=>(e.present(),e.onDidDismiss())).then(t=>{"delete"===t.role&&this.adminService.deleteProject(e._id,t.data.image,t.data.video).pipe(Object(m.a)(1)).subscribe(t=>{t.deleted&&(this.projects=this.projects.filter(t=>t._id!==e._id))})})}},{text:"Cancel",icon:"close",role:"cancel"}]});yield t.present()},new((n=void 0)||(n=Promise))(function(e,o){function c(e){try{l(i.next(e))}catch(t){o(t)}}function r(e){try{l(i.throw(e))}catch(t){o(t)}}function l(t){var i;t.done?e(t.value):(i=t.value,i instanceof n?i:new n(function(e){e(i)})).then(c,r)}l((i=i.apply(t,[])).next())});var t,n,i}presentEditModal(e){this.modalController.create({component:u,componentProps:{project:e}}).then(e=>(e.present(),e.onDidDismiss())).then(t=>{"submit"===t.role&&(e?(t.data.data._id=e._id,t.data.data.image=e.image,this.adminService.editProject(t.data).pipe(Object(m.a)(1)).subscribe(e=>{let t=this.projects.findIndex(t=>t._id===e._id);this.projects[t]=e})):this.adminService.createProject(t.data).pipe(Object(m.a)(1)).subscribe(e=>{this.projects.push(e)}))})}}return e.\u0275fac=function(t){return new(t||e)(l.Jb(c.a),l.Jb(c.F),l.Jb(L),l.Jb(v.a),l.Jb(c.G))},e.\u0275cmp=l.Db({type:e,selectors:[["app-projects"]],decls:13,vars:1,consts:[[1,"ion-padding"],[1,"ion-justify-content-center"],["size-sm","10","size-md","8","size-lg","6",1,"ion-text-center"],["expand","block","color","light",3,"click"],["name","add-outline","slot","start"],["size-sm","10","size-md","8","size-lg","6"],["class","ion-text-center ion-justify-content-center",4,"ngFor","ngForOf"],[1,"ion-text-center","ion-justify-content-center"],[3,"src"],["fill","clear",3,"click"]],template:function(e,t){1&e&&(l.Mb(0,"ion-header"),l.Kb(1,"ion-toolbar"),l.Lb(),l.Mb(2,"ion-content",0),l.Mb(3,"ion-grid"),l.Mb(4,"ion-row",1),l.Mb(5,"ion-col",2),l.Mb(6,"ion-button",3),l.Ub("click",function(){return t.presentEditModal()}),l.lc(7," Add Project "),l.Kb(8,"ion-icon",4),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(9,"ion-grid"),l.Mb(10,"ion-row",1),l.Mb(11,"ion-col",5),l.kc(12,y,9,3,"ion-card",6),l.Lb(),l.Lb(),l.Lb(),l.Lb()),2&e&&(l.zb(12),l.bc("ngForOf",t.projects))},directives:[c.n,c.C,c.l,c.m,c.v,c.k,c.f,c.o,i.i,c.h,c.p,c.j,c.B,c.i],styles:[""]}),e})()}];let w=(()=>{class e{}return e.\u0275mod=l.Hb({type:e}),e.\u0275inj=l.Gb({factory:function(t){return new(t||e)},imports:[[r.j.forChild(k)],r.j]}),e})(),z=(()=>{class e{}return e.\u0275mod=l.Hb({type:e}),e.\u0275inj=l.Gb({factory:function(t){return new(t||e)},imports:[[i.b,o.c,c.D,w]]}),e})()}}]);