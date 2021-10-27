import { HomeService } from './../home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class HomePage {
  organizations;
  recipients;
  certificates;
  categories;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css', '../index2/style-landing-page.scss']
})
/**
 * Services component
 */
export class ServicesComponent implements OnInit, OnDestroy {
  constructor(private homeService: HomeService) {}

  homePageData: HomePage = new HomePage();
  subscriptions: Subscription = new Subscription();

  homePage: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscriptions.add(
      this.homeService.getAllCounters().subscribe((data: HomePage) => {
        this.homePageData = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
