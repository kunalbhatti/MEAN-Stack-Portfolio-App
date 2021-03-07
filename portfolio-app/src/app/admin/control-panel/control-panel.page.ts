import {
  Component,
  OnInit
} from "@angular/core";
import {
  NavController
} from "@ionic/angular";

import {
  take
} from "rxjs/operators";
import {
  MessageService
} from "./../../services/message.service";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.page.html',
  styleUrls: ['./control-panel.page.css']
})
export class ControlPanelPage implements OnInit {

  unreadCount: number;

  constructor(private navController: NavController, private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getUnreadCount().pipe(take(1)).subscribe((unreadMessages: {
      unreadCount: number
    }) => {
      this.unreadCount = unreadMessages.unreadCount;
    });

    this.messageService.unreadCount.subscribe((unreadCount: number) => {
      this.unreadCount = unreadCount;
    })
  }

  onLogout() {
    localStorage.removeItem('portfolio-app-token');
    this.navController.navigateBack(['/', 'admins', 'auth']);
  }

}
