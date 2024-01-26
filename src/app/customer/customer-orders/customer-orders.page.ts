import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service'

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage implements OnInit {
  orders: any = [];
  constructor(
    private router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.adminService.getCustomerOrders({}).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orders = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }

  goToDashboard() {
    this.router.navigate(['/customerListings']);
  }

  goToProfile() {
    this.router.navigate(['/customerProfile']);
  }

  navigateToOrderOverView(order: any) {
    this.router.navigateByUrl('/customerOrderOverView/' + order._id)
  }

}
