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

  deferredPrompt: any;
  showPrompt = false;

  constructor(private platform: Platform, private route: Router) {

    this.deferredPrompt;
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      console.log(e, 876567);

      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      this.showPrompt = true;
    });

    // Optional: Listen for the appinstalled event
    window.addEventListener('appinstalled', () => {
      console.log('PWA has been installed');
    });

    setTimeout(() => {
      this.showPrompt = false;
    }, 6000);
  }

  ngOnInit() {
    this.platform.ready().then((res) => {
      if (localStorage.getItem('token') && localStorage.getItem('userData')) {
        let userData: any = localStorage.getItem('userData');
        if (!userData) this.route.navigateByUrl('/customerListings');
      }
    });
  }

  openModal(result: boolean) {
    // Handle the data returned from the modal
    if (result) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }
        this.deferredPrompt = null; // Reset the prompt variable
      });
    } else {
      this.showPrompt = false;
    }

    // Wait for the user to respond to the prompt
  }
}
