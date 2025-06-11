import { Component } from '@angular/core';
import { BestSellingWidget } from './DashBoard//sakai-ng-19.0.1/src/app/pages/dashboard/components/bestsellingwidget'; // ✅ import the component
import { NotificationsWidget } from './DashBoard//sakai-ng-19.0.1/src/app/pages/dashboard/components/notificationswidget';
import { RecentSalesWidget } from './DashBoard//sakai-ng-19.0.1/src/app/pages/dashboard/components/recentsaleswidget';
import { RevenueStreamWidget } from './DashBoard//sakai-ng-19.0.1/src/app/pages/dashboard/components/revenuestreamwidget';
import { StatsWidget } from './DashBoard//sakai-ng-19.0.1/src/app/pages/dashboard/components/statswidget';
//import { Dashboard } from './DashBoard//sakai-ng-19.0.1/src/app/pages/dashboard/dashboard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // ✅ use styleUrls (plural!)
  imports: [BestSellingWidget, NotificationsWidget, NotificationsWidget, RecentSalesWidget, RevenueStreamWidget, StatsWidget]
})
export class AppComponent {

}
