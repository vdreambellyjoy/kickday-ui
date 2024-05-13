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
  defaultSegment = 'Live';
  constructor(
    private router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.changeSegment({ target: { value: this.defaultSegment } });
  }

  async ngAfterViewInit() {
    const loading = await this.adminService.presentLoading();
    this.adminService.getCustomerOrders({}).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orders = res.data;
      }
      loading.dismiss()
    }, (err) => {
      console.log(err);
      loading.dismiss()
    })
  }

  goToDashboard() {
    this.router.navigate(['/customerListings']);
  }

  goToProfile() {
    this.router.navigate(['/customerProfile']);
  }

  navigateToOrderOverView(order: any) {
    this.router.navigateByUrl('/orderOverView/' + order._id)
  }

  changeSegment(event: any) {
    this.adminService.getCustomerOrders({ value: event.target.value }).subscribe((res: any) => {
      if (res.success && res.data) {
        this.orders = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }

}
