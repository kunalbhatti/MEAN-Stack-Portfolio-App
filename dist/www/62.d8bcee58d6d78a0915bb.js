(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{M6tl:function(e,t,s){"use strict";s.r(t),s.d(t,"MessagesPageModule",function(){return h});var n=s("ofXK"),i=s("3Pt+"),o=s("TEn/"),a=s("tyNb"),r=s("IzEk"),c=s("fXoL");let b=(()=>{class e{constructor(e){this.modalController=e}ngOnInit(){}onDismiss(){this.modalController.dismiss(null,"cancel")}onDelete(){this.modalController.dismiss(null,"delete")}}return e.\u0275fac=function(t){return new(t||e)(c.Jb(o.F))},e.\u0275cmp=c.Db({type:e,selectors:[["app-delete-message"]],inputs:{message:"message"},decls:24,vars:3,consts:[["slot","primary"],[3,"click"],["name","close-outline"],[2,"height","100%"],[1,"ion-justify-content-center",2,"height","100%","flex-direction","column"],[2,"display","flex","justify-content","center","align-items","center"],[1,"message"],["color","danger","expand","block",2,"margin-top","10px",3,"click"]],template:function(e,t){1&e&&(c.Mb(0,"ion-header"),c.Mb(1,"ion-toolbar"),c.Mb(2,"ion-title"),c.lc(3,"Delete Message"),c.Lb(),c.Mb(4,"ion-buttons",0),c.Mb(5,"ion-button",1),c.Ub("click",function(){return t.onDismiss()}),c.Kb(6,"ion-icon",2),c.Lb(),c.Lb(),c.Lb(),c.Lb(),c.Mb(7,"ion-content"),c.Mb(8,"ion-grid",3),c.Mb(9,"ion-row",4),c.Mb(10,"ion-col",5),c.Mb(11,"ion-card"),c.Mb(12,"ion-card-content",6),c.Mb(13,"ion-item"),c.Mb(14,"ion-text"),c.lc(15),c.Lb(),c.Lb(),c.Mb(16,"ion-item"),c.Mb(17,"ion-text"),c.lc(18),c.Lb(),c.Lb(),c.Mb(19,"ion-item"),c.Mb(20,"ion-text"),c.lc(21),c.Lb(),c.Lb(),c.Lb(),c.Lb(),c.Lb(),c.Mb(22,"ion-button",7),c.Ub("click",function(){return t.onDelete()}),c.lc(23," Delete "),c.Lb(),c.Lb(),c.Lb(),c.Lb()),2&e&&(c.zb(15),c.nc("Name: ",t.message.name,""),c.zb(3),c.nc("Date: ",t.message.timestamp,""),c.zb(3),c.nc("Subject: ",t.message.subject,""))},directives:[o.n,o.C,o.B,o.g,o.f,o.o,o.l,o.m,o.v,o.k,o.h,o.i,o.r,o.z],styles:[""]}),e})(),l=(()=>{class e{constructor(e){this.modalcontroller=e}ngOnInit(){}onDismiss(){this.modalcontroller.dismiss(null,"cancel")}onSubmit(e){this.modalcontroller.dismiss(e.value,"send")}}return e.\u0275fac=function(t){return new(t||e)(c.Jb(o.F))},e.\u0275cmp=c.Db({type:e,selectors:[["app-reply-to-message"]],inputs:{message:"message"},decls:28,vars:5,consts:[["slot","primary"],[3,"click"],["name","close-outline"],[2,"height","100%","width","100%"],[1,"ion-align-items-center",2,"height","100%"],[3,"ngSubmit"],["f","ngForm"],["position","floating"],["name","email","email","","required","",3,"ngModel"],["name","subject","ngModel","","required",""],["rows","18","name","body","ngModel","","required","",3,"placeholder"],["type","submit","expand","block",3,"disabled"]],template:function(e,t){if(1&e){const e=c.Nb();c.Mb(0,"ion-header"),c.Mb(1,"ion-toolbar"),c.Mb(2,"ion-title"),c.lc(3,"Send Mail"),c.Lb(),c.Mb(4,"ion-buttons",0),c.Mb(5,"ion-button",1),c.Ub("click",function(){return t.onDismiss()}),c.Kb(6,"ion-icon",2),c.Lb(),c.Lb(),c.Lb(),c.Lb(),c.Mb(7,"ion-content"),c.Mb(8,"ion-grid",3),c.Mb(9,"ion-row",4),c.Mb(10,"ion-col"),c.Mb(11,"form",5,6),c.Ub("ngSubmit",function(){c.gc(e);const s=c.fc(12);return t.onSubmit(s)}),c.Mb(13,"ion-item"),c.Mb(14,"ion-label",7),c.lc(15,"To"),c.Lb(),c.Kb(16,"ion-input",8),c.Lb(),c.Mb(17,"ion-item"),c.Mb(18,"ion-label",7),c.lc(19,"Subject"),c.Lb(),c.Kb(20,"ion-input",9),c.Lb(),c.Mb(21,"ion-item"),c.Mb(22,"ion-label",7),c.lc(23,"Message"),c.Lb(),c.Kb(24,"ion-textarea",10),c.Xb(25,"titlecase"),c.Lb(),c.Mb(26,"ion-button",11),c.lc(27,"Send"),c.Lb(),c.Lb(),c.Lb(),c.Lb(),c.Lb(),c.Lb()}if(2&e){const e=c.fc(12);c.zb(16),c.bc("ngModel",t.message.email),c.zb(8),c.bc("placeholder","Hello "+c.Yb(25,3,t.message.name)+","),c.zb(2),c.bc("disabled",e.invalid)}},directives:[o.n,o.C,o.B,o.g,o.f,o.o,o.l,o.m,o.v,o.k,i.m,i.i,i.j,o.r,o.s,o.q,o.I,i.b,i.l,i.h,i.k,o.A],pipes:[n.m],styles:[""]}),e})();var d=s("tZre"),m=s("Ymxs");const u=function(e){return{boxShadow:e}};function g(e,t){if(1&e){const e=c.Nb();c.Mb(0,"ion-card"),c.Mb(1,"ion-card-content",3),c.Mb(2,"ion-item"),c.Mb(3,"ion-text"),c.lc(4),c.Lb(),c.Lb(),c.Mb(5,"ion-item"),c.Mb(6,"ion-text"),c.lc(7),c.Xb(8,"date"),c.Lb(),c.Lb(),c.Mb(9,"ion-item"),c.Mb(10,"ion-text"),c.lc(11),c.Lb(),c.Lb(),c.Mb(12,"ion-item"),c.Mb(13,"ion-text"),c.lc(14),c.Lb(),c.Lb(),c.Lb(),c.Mb(15,"ion-button",4),c.Ub("click",function(){c.gc(e);const s=t.$implicit;return c.Wb().presentMessageOptions(s)}),c.lc(16,"More"),c.Lb(),c.Lb()}if(2&e){const e=t.$implicit;c.jc(c.dc(8,u,"unread"===e.status?"0px 0px 5px #ffca22":"")),c.zb(4),c.nc("Name: ",e.name,""),c.zb(3),c.nc("Date: ",c.Yb(8,6,e.timestamp),""),c.zb(4),c.nc("Subject: ",e.subject,""),c.zb(3),c.nc("Message: ",e.body,"")}}const p=[{path:"",component:(()=>{class e{constructor(e,t,s,n){this.messageService=e,this.toasterService=t,this.actionSheetController=s,this.modalController=n}ngOnInit(){}ionViewDidEnter(){let e=0;this.messageService.getMessages().pipe(Object(r.a)(1)).subscribe(t=>{this.messages=t.messages,this.messages.forEach(t=>{"unread"==t.status&&e++}),this.messageService.unreadCount.emit(e)},e=>{this.toasterService.createToast("Fetch Operation Failed",e.message,"danger")})}presentMessageOptions(e){this.actionSheetController.create({header:"Message Options",buttons:[{text:"Reply",icon:"mail-outline",handler:()=>{this.modalController.create({component:l,componentProps:{message:e}}).then(e=>(e.present(),e.onDidDismiss())).then(t=>{"send"===t.role&&this.messageService.sendEmail(t.data).pipe(Object(r.a)(1)).subscribe(t=>{this.toasterService.createToast("Email Sent",t.message),this.messageService.updateMessageStatus(e._id,"unread"===e.status?"read":"unread").pipe(Object(r.a)(1)).subscribe(e=>{const t=this.messages.findIndex(t=>t._id===e._id);this.messages[t].status=e.status,this.messageService.unreadCount.emit(e.unreadCount)},e=>{this.toasterService.createToast("Update Operation Failed",e.message,"danger")})},e=>{this.toasterService.createToast("Error Sending Mail",e.message,"danger")})})}},{text:"unread"===e.status?"Mark As Read":"Mark As Unread",icon:"unread"===e.status?"eye-outline":"eye-off-outline",handler:()=>{this.messageService.updateMessageStatus(e._id,"unread"===e.status?"read":"unread").pipe(Object(r.a)(1)).subscribe(e=>{this.toasterService.createToast("Status Updated","Message status has updated to "+e.status);const t=this.messages.findIndex(t=>t._id===e._id);this.messages[t].status=e.status,this.messageService.unreadCount.emit(e.unreadCount)},e=>{this.toasterService.createToast("Update Operation Failed",e.message,"danger")})}},{text:"Delete",role:"destructive",icon:"trash",handler:()=>{this.modalController.create({component:b,componentProps:{message:e}}).then(e=>(e.present(),e.onDidDismiss())).then(t=>{"delete"===t.role&&this.messageService.deleteMessage(e._id).pipe(Object(r.a)(1)).subscribe(e=>{this.toasterService.createToast("Message Deleted","Message has been deleted successfully");const t=this.messages.findIndex(t=>t._id===e._id);this.messages.splice(t,1),this.messageService.unreadCount.emit(e.unreadCount)},e=>{this.toasterService.createToast("Delete Operation Failed",e.message,"danger")})})}},{text:"Cancel",icon:"close",role:"cancel"}]}).then(e=>{e.present()})}}return e.\u0275fac=function(t){return new(t||e)(c.Jb(d.a),c.Jb(m.a),c.Jb(o.a),c.Jb(o.F))},e.\u0275cmp=c.Db({type:e,selectors:[["app-messages"]],decls:7,vars:1,consts:[[1,"ion-justify-content-center"],["size-sm","10","size-md","8","size-lg","6",1,"ion-text-center"],[3,"style",4,"ngFor","ngForOf"],[1,"message"],["fill","clear",3,"click"]],template:function(e,t){1&e&&(c.Mb(0,"ion-header"),c.Kb(1,"ion-toolbar"),c.Lb(),c.Mb(2,"ion-content"),c.Mb(3,"ion-grid"),c.Mb(4,"ion-row",0),c.Mb(5,"ion-col",1),c.kc(6,g,17,10,"ion-card",2),c.Lb(),c.Lb(),c.Lb(),c.Lb()),2&e&&(c.zb(6),c.bc("ngForOf",t.messages))},directives:[o.n,o.C,o.l,o.m,o.v,o.k,n.i,o.h,o.i,o.r,o.z,o.f],pipes:[n.d],styles:[".messaege[_ngcontent-%COMP%]{font-size:15px}"]}),e})()}];let M=(()=>{class e{}return e.\u0275mod=c.Hb({type:e}),e.\u0275inj=c.Gb({factory:function(t){return new(t||e)},imports:[[a.j.forChild(p)],a.j]}),e})(),h=(()=>{class e{}return e.\u0275mod=c.Hb({type:e}),e.\u0275inj=c.Gb({factory:function(t){return new(t||e)},imports:[[n.b,i.c,o.D,M]]}),e})()}}]);