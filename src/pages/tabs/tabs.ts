import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NotificationPage } from '../notification/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = NotificationPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
