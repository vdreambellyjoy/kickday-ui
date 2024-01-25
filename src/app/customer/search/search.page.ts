import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // selectedLocation: string = ''
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // removeselectedLocation() {
  //   this.selectedLocation = '';
  // }

  selectItem(item: string) {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
      this.selectedItemsText = '';
      this.results = [];
    }
  }

  removeItem(item: string) {
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

  isSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }

  navigateToListings() {
    this.router.navigate(['/customerListings'])
  }

}
