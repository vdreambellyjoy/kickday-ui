import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private route: Router,
    private http: HttpClient,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  // admin page API START
  getUsersCount(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getUsersCount", data);
  }

  getListingsCount(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getListingsCount", data);
  }

  getAllListings(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getAllListings", data);
  }

  getListingBasedOnId(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getListingBasedOnId", data);
  }

  getAllUsersList(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getAllUsersList", data);
  }

  getUserBasedOnId(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getUserBasedOnId", data);
  }

  activeDeActiveListing(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/activeDeActiveListing", data);
  }


  createMaker(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/createMaker", data);
  }

  updateKitchenImages(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/updateKitchenImages", data);
  }

  updateBankDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/updateBankDetails", data);
  }

  getUserOverView(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getUserOverView", data);
  }

  activeDeActiveUser(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/activeDeActiveUser", data);
  }
  // admin page API END



  // maker page API START
  getMakerDashboardData(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/getMakerDashboardData", data);
  }

  addEditListing(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/addEditListing", data);
  }

  deleteListing(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/deleteListing", data);
  }

  changeOrderStatus(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/changeOrderStatus", data);
  }

  toggleMakerStatus(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/toggleMakerStatus", data);
  }
  // maker page API END


  // customer page API START
  updateCustomerDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/updateCustomerDetails", data);
  }

  getCustomerOrders(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/getCustomerOrders", data);
  }

  getAllListingsForCustomer(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/getAllListingsForCustomer", data);
  }

  setFavItem(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/setFavItem", data);
  }

  setUnFavItem(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/setUnFavItem", data);
  }

  getListingForUser(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/getListingForUser", data);
  }

  getCustomerAddress(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/getCustomerAddress", data);
  }

  deleteTempOrder(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/deleteTempOrder", data);
  }

  addCustomerAddress(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/addCustomerAddress", data);
  }

  setDefaultAddress(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/setDefaultAddress", data);
  }

  deleteAddress(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/deleteAddress", data);
  }

  addToCart(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/addToCart", data);
  }

  getCustomerOrderSummary(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/getCustomerOrderSummary", data);
  }

  placeOrder(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/placeOrder", data);
  }

  createOrderInRazorPay(paymentDetails: any) {
    return this.http.post(environment.baseUrl + "/customer/createOrderInRazorPay", paymentDetails);
  }

  async payWithRazorpay(orderId: string, amount: any, tempOrderId: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const options = {
        key: environment.razorpayKey,
        amount: amount * 100,
        currency: 'INR',
        name: 'Vdream Innovations (OPC) private limited',
        description: 'Vdream Innovations',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const verificationResponse: any = await this.verifyPayment({ verify: response });
            let obj = { ...verificationResponse, ...response };
            console.log({ obj })
            resolve(obj);
          } catch (error) {
            console.log({ error })
            reject(error);
          }
        },
        prefill: { name: 'test', email: 'test', contact: 'test' },
        theme: { color: '#3399cc' },
        modal: {
          ondismiss: () => {
            reject({ message: "Your payment has been cancelled." });
          },
        },
        retry: {
          enabled: false,  // Disable retry option
        },
      };

      const rzp = new Razorpay(options);
      await rzp.on('payment.failed', async (response: any) => {
        let error = response.error || response || {};
        error.message = error.message || error.description;
        rzp.close();
        console.log('closed')
        reject(error);
      });
      await rzp.open();
    });
  }

  verifyPayment(paymentDetails: any) {
    return this.http.post(environment.baseUrl + "/customer/verifyPaymentDetails", paymentDetails);
  }

  savePaymentFailedDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/savePaymentFailedDetails", data);
  }

  // customer page API END


  async presentDeleteConfirmation(header: any, message: any, cssClass: any): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        cssClass: cssClass,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'OK',
            cssClass: 'primary',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }
}
