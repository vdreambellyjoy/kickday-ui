import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { LoadingController } from '@ionic/angular';

declare var google: any;
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.page.html',
  styleUrls: ['./create-listing.page.scss'],
})
export class CreateListingPage implements OnInit {
  _id: any = '';
  label: any = '';
  selectedItemsText: string = '';
  selectedItems: string[] = [];
  showOrderEndDateTimePicker = false;
  showOrderDeliveredDateTimePicker = false;
  orderEndDateTime: string = '';
  orderDeliveredDateTime: string = '';
  search: any;
  selectedPrediction: any;
  autocompleteService: any;
  predictions: any;
  addCategoryData = [
    'Biryani',
    'Sweets',
    'Cova',
    'Fried Rice',
    'Pizza',
    'Burger',
    'Desserts',
    'Pani Puri',
    'Cool Drinks',
    'Mandi',
  ];
  results: string[] = [];
  newItemName: string = '';
  newItemPrice: string = '';
  newItemQuantity: string = '';
  items: any[] = [];

  deliveryType: string = '';
  deliveryPrice: number = 0;
  deliveryItems: any[] = [];

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: (data: any) => {
        // 'data' parameter contains the entered text
        console.log('Entered text:', data.enteredText);
      },
    },
  ];

  public alertInputs = [
    {
      name: 'enteredText',
      placeholder: 'Enter URL',
    },
  ];
  isFreeDelivery: any = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    public loadingCtrl: LoadingController,
  ) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    if (this._id) {
      this.adminService.getListingBasedOnId({ _id: this._id }).subscribe((res: any) => {
        if (res.success) {
          console.log(res)
        }
      }, (err: any) => {
        console.log(err);
      })
    }

    this.search = '';
    this.selectedPrediction = ''
  }

  removeCategoryItem(item: string) {
    this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.results = [];
    } else {
      this.results = this.addCategoryData.filter((data) => data.toLowerCase().indexOf(query) > -1);
    }
  }

  selectItem(item: string) {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems = [];
      this.selectedItems.push(item);
      this.selectedItemsText = '';
      this.results = [];
    }
  }

  isSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }

  addItem() {
    if (this.newItemName && this.newItemPrice && this.newItemQuantity) {
      this.items.push({ name: this.newItemName, price: this.newItemPrice, quantity: this.newItemQuantity });
      this.newItemName = '';
      this.newItemPrice = '';
      this.newItemQuantity = '';
    }
  }

  removeItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  addDeliveryItem() {
    if (this.deliveryType && this.deliveryPrice) {
      this.deliveryItems = [];
      this.deliveryItems.push({ type: this.deliveryType, price: this.deliveryPrice });
      this.deliveryType = '';
      // this.deliveryPrice = 0;
    }
  }

  removeDeliveryItem(deliveryItem: any) {
    this.deliveryItems = this.deliveryItems.filter(i => i !== deliveryItem);
  }

  addListing() {
    let obj = {
      address:this.selectedPrediction.formatted_address,
      lat: this.selectedPrediction.lat,
      lng: this.selectedPrediction.lng,
      label: this.label,
      category: this.selectedItems[0],
      startDateTime: new Date(this.orderDeliveredDateTime),
      endDateTime: new Date(this.orderEndDateTime),
      orders: this.items,
      deliveryOptions: this.deliveryItems,
      youtubeUrl: '',
    }
    this.adminService.addListing(obj).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/makerListings']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }


  navigateToCustomerOrders() {
    this.router.navigate(['/makerListings']);
  }

  openDateTimePicker(type: string) {
    if (type === 'orderEndDateTime') {
      this.showOrderEndDateTimePicker = true;
    } else if (type === 'orderDeliveredDateTime') {
      this.showOrderDeliveredDateTimePicker = true;
    }
  }

  onDateTimeChange(type: string) {
    if (type === 'orderEndDateTime') {
      console.log('Selected Order Ends with Date & Time:', this.orderEndDateTime);
      this.showOrderEndDateTimePicker = false;
    } else if (type === 'orderDeliveredDateTime') {
      console.log('Selected Order Delivered on:', this.orderDeliveredDateTime);
      this.showOrderDeliveredDateTimePicker = false;
    }
  }

  async onSearchInput() {
    if (this.search?.length > 0) {
      const loading = await this.loadingCtrl.create();
      this.autocompleteService.getPlacePredictions({ input: this.search }, (predictions: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.predictions = predictions;
          console.log(predictions, 465654);

        } else {
          this.predictions = [];
        }
      });
    } else {
      this.predictions = [];
    }
  }

  onPredictionSelect(prediction: any) {
    this.search = prediction.description
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    placeService.getDetails({ placeId: prediction.place_id }, (placeResult: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.selectedPrediction = placeResult;
        this.selectedPrediction.lat =  placeResult.geometry.location.lat();
        this.selectedPrediction.lng =  placeResult.geometry.location.lng();
      }
    });
    this.predictions = []
  }

  toggleFreeDelivery() {
    this.isFreeDelivery = !this.isFreeDelivery;
  }
}
