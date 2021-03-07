import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
})
export class PageNotFoundPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  navigateBack(){
    this.navController.navigateBack(['/', 'portfolio', 'projects']);
  }

}
