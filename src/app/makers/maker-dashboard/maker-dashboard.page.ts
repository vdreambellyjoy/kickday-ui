import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maker-dashboard',
  templateUrl: './maker-dashboard.page.html',
  styleUrls: ['./maker-dashboard.page.scss'],
})
export class MakerDashboardPage implements OnInit {

  isToggleChecked: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleChanged() {
    !this.isToggleChecked;
  }

  navigateToCreateListing(){
    this.router.navigate(['/create-listing'])
  }

  navigateToAllListings(){
    this.router.navigate(['/all-listings'])
  }

}
