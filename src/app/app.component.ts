import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private route: Router) {}

  ngOnInit() {
    this.platform.ready().then((res) => {
      if (localStorage.getItem('token') && localStorage.getItem('userData')) {
        let userData: any = localStorage.getItem('userData');
        if (!userData) this.route.navigateByUrl('/customerListings');
      }
    });
  }
}
