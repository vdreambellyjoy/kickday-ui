import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.page.html',
  styleUrls: ['./create-listing.page.scss'],
})
export class CreateListingPage implements OnInit {

  selectedItemsText: string = '';
  selectedItems: string[] = [];
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

  constructor(private router: Router) { }

  ngOnInit() {
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
      this.items.push({
        name: this.newItemName,
        price: this.newItemPrice,
        quantity: this.newItemQuantity
      });

      this.newItemName = '';
      this.newItemPrice = '';
      this.newItemQuantity = '';
    }
  }

  removeItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  addDeliveryItem(){
    if (this.deliveryType && this.deliveryPrice) {
      this.deliveryItems.push({
        type: this.deliveryType,
        price: this.deliveryPrice
      });

      this.deliveryType = '';
      this.deliveryPrice = 0;
    }
  }

  removeDeliveryItem(deliveryItem: any) {
    this.deliveryItems = this.deliveryItems.filter(i => i !== deliveryItem);
  }


  navigateToCustomerOrders() {
    this.router.navigate(['/customer-orders']);
  }

}
