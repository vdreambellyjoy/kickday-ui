import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  mediaImages: any = [];
  bindingData: any;
  youTubeUrl: any;
  addCategoryData = [
    'Butter Chicken', 'Palak Paneer', 'Dal Makhani', 'Rajma', 'Chole', 'South Indian Main Dishes', 'Masala Dosa', 'Hyderabadi Biryani', 'Sambar', 'Fish Curry', 'Uttapam', 'Macher Jhol', 'Prawn Malai Curry', 'Rasgulla', 'Sandesh', 'Luchi', 'Pav Bhaji', 'Goan Fish Curry', 'Dhokla', 'Vada Pav', 'Poha', 'Samosa', 'Chaat', 'Pakora', 'Aloo Tikki', 'Bhel Puri', 'Gulab Jamun', 'Jalebi', 'Kaju Katli', 'Ras Malai', 'Barfi', 'Naan', 'Roti', 'Biryani', 'Jeera Rice', 'Paratha', 'Masala Chai', 'Lassi', 'Mango Lassi', 'Nimbu Pani', 'Chai', 'Mango Pickle', 'Lime Pickle', 'Mint Chutney', 'Tamarind Chutney', 'Coconut Chutney', 'Tandoori Chicken', 'Keema', 'Kofta', 'Paneer Tikka', 'Chicken 65', 'Aloo Gobi', 'Kadai Paneer', 'Matar Paneer', 'Rogan Josh', 'Dum Aloo', 'Baingan Bharta', 'Navratan Korma', 'Shahi Paneer', 'Malai Kofta', 'Chana Masala', 'Rava Idli', 'Lemon Rice', 'Andhra Chicken Curry', 'Kerala Beef Fry', 'Rava Dosa', 'Fish Moilee', 'Curd Rice', 'Pongal', 'Coconut Rice', 'Onion Uthappam', 'Aloo Posto', 'Shorshe Ilish', 'Mishti Doi', 'Chingri Malai Curry', 'Momo', 'Sikkim Thukpa', 'Litti Chokha', 'Aloo Dum', 'Dal Pitha', 'Khar', 'Misal Pav', 'Undhiyu', 'Bombay Duck Fry', 'Kolhapuri Chicken', 'Aamti', 'Bhakri', 'Thepla', 'Khandvi', 'Sev Usal', 'Patra', 'Kachori', 'Dabeli', 'Mirchi Bajji', 'Gobi Manchurian', 'Idli', 'Medu Vada', 'Momos', 'Kathi Roll', 'Paneer Pakora', 'Ladoo', 'Soan Papdi', 'Halwa', 'Shrikhand', 'Peda', 'Kulfi', 'Moong Dal Halwa', 'Kheer', 'Besan Barfi', 'Gajar Ka Halwa', 'Kulcha', 'Aloo Paratha', 'Pulao', 'Kashmiri Pulao', 'Methi Thepla', 'Puri', 'Akki Roti', 'Makki di Roti', 'Missi Roti', 'Appam', 'Rose Lassi', 'Badam Milk', 'Jaljeera', 'Aam Panna', 'Thandai', 'Sattu Drink', 'Butter Tea', 'Coffee', 'Sharbat', 'Kokum Juice', 'Garlic Pickle', 'Onion Chutney', 'Coriander Chutney', 'Peanut Chutney', 'Red Chilli Pickle', 'Sweet Mango Chutney', 'Amla Pickle', 'Green Chilli Pickle', 'Tomato Chutney', 'Carrot Pickle', 'Hariyali Chicken Tikka', 'Mutton Biryani', 'Goan Prawn Curry', 'Vegetable Jalfrezi', 'Egg Curry', 'Chicken Korma', 'Paneer Bhurji', 'Kadhi Pakora', 'Aloo Tikki Chaat', 'Schezwan Fried Rice', 'Gujiya', 'Modak', 'Kaju Roll', 'Karanji', 'Chhena Poda', 'Patishapta', 'Payesh', 'Nolen Gurer Sandesh', 'Til Ladoo', 'Bisi Bele Bath', 'Laal Maas', 'Chettinad Chicken', 'Kappa', 'Bamboo Shoot Curry', 'Vangi Bath', 'Fish Tenga', 'Nihari', 'Dhansak', 'Sarson Ka Saag', 'Kadai Vegetables', 'Gatte Ki Sabzi', 'Aloo Shimla Mirch', 'Bhindi Masala', 'Malai Matar', 'Tawa Paneer', 'Vegetable Kolhapuri', 'Matar Mushroom', 'Paneer Lababdar', 'Chicken Chettinad', 'Mutton Rogan Josh', 'Prawn Masala', 'Fish Amritsari', 'Lamb Vindaloo', 'Nalli Nihari', 'Chicken Xacuti', 'Mutton Keema', 'Goan Sausage Pulao', 'Snacks and Light Eats', 'Masala Peanuts', 'Banana Chips', 'Bhakarwadi', 'Murukku', 'Chakli', 'Sev', 'Papdi', 'Mathri', 'Mixture', 'Pani Puri', 'Unique Regional Varieties', 'Kachalu Chaat', 'Aloo Handi Chaat', 'Kanji Vada', 'Shami Kebab', 'Galouti Kebab', 'Chicken Ghee Roast', 'Nargisi Kofta', 'Chicken Angara', 'Tandoori Pomfret', 'Crab Masala', 'Milk Cake', 'Rabri', 'Angoori Rasmalai', 'Phirni', 'Sheera', 'Balushahi', 'Imarti', 'Chikki', 'Kulhad Kulfi', 'Shahi Tukda', 'Chili Chicken', 'Veg Manchurian', 'Hakka Noodles', 'Schezwan Chicken', 'Spring Rolls', 'Chili Paneer', 'Manchow Soup', 'American Chop Suey', 'Dragon Chicken', 'Mangalorean Fish Curry', 'Malabar Parotta', 'Karimeen Pollichathu', 'Prawn Gassi', 'Tandoori Crab', 'Fish Fry', 'Squid Masala', 'Bombil Fry', 'Kombdi Vade', 'Neer Dosa', 'Sprout Salad', 'Oats Idli', 'Multigrain Roti',
    'Quinoa Upma', 'Bajra Khichdi', 'Ragi Dosa', 'Moong Dal Chila', 'Millet Biryani', 'Palak Khichdi', 'Barley Salad', 'Achari Chicken', 'Shalgam Ki Sabzi', 'Kadi Pakoda', 'Soya Chaap Curry', 'Aloo Methi', 'Paneer Jalfrezi', 'Mutton Do Pyaza', 'Bharwan Bhindi', 'Mushroom Masala', 'Kofta Curry', 'Kozhikode Biryani', 'Chicken Gassi', 'Vegetable Stew', 'Meen Pollichathu', 'Kanava Thoran', 'Chicken Sukka', 'Mysore Pak', 'Chicken 65 Biryani', 'Karnataka Style Sambar', 'Kerala Style Parotta', 'Bhapa Ilish', 'Kala Chana Ghugni', 'Mutton Dak Bungalow', 'Tomato Khejur Chutney', 'Posto Bora', 'Aloo Potol Posto', 'Kancha Lonka Murgi', 'Chhena Jhilli', 'Bihari Kabab', 'Sattu Paratha', 'Surti Undhiyu', 'Aamras Puri', 'Kolambi Masala', 'Kothimbir Vadi', 'Zunka Bhakar', 'Khaman', 'Patra Ni Machhi', 'Prawn Koliwada', 'Bharli Vangi', 'Ragda Patties', 'Vada Sambar', 'Hara Bhara Kabab', 'Pani Ke Batashe', 'Khaman Dhokla', 'Aloo Chaat', 'Sev Puri', 'Dal Vada', 'Sabudana Khichdi', 'Chole Bhature', 'Motichoor Ladoo', 'Kesar Peda', 'Malpua', 'Akhrot Barfi', 'Boondi Ladoo', 'Chenna Murki', 'Basundi', 'Kulfi Falooda', 'Shakkarpara', 'Rumali Roti', 'Batata Vada', 'Tandoori Roti', 'Bhature', 'Aloo Kulcha', 'Vegetable Biryani', 'Chole Kulche', 'Egg Biryani', 'Saffron Rice', 'Aloo Baingan Rice', 'Badam Sharbat', 'Kesar Milk', 'Masala Soda', 'Rose Milk', 'Falooda', 'Kokum Sharbat', 'Saffron Lassi', 'Sol Kadhi', 'Sugarcane Juice', 'Mango Milkshake', 'Fish Pickle', 'Carrot and Ginger Chutney', 'Brinjal Pickle', 'Sweet Lime Pickle', 'Tomato Garlic Chutney', 'Capsicum Chutney', 'Beetroot Chutney', 'Peanut Garlic Chutney', 'Lemon Garlic Pickle', 'Pudina Chutney', 'Chilli Garlic Noodles', 'Bombay Sandwich', 'Paneer Manchurian', 'Palak Corn', 'Mushroom Pepper Fry', 'Chicken Manchurian', 'Aloo Mutter', 'Goan Vindaloo', 'Malabar Chicken Curry', 'Rajasthani Laal Maas', 'Coorg Pandi Curry', 'Hyderabadi Haleem', 'Kashmiri Yakhni', 'Andhra Gongura Chicken', 'Tamil Nadu Kuzhambu', 'Gujarati Handvo', 'Bengali Doi Maach', 'Bhindi Fry', 'Paneer Butter Masala', 'Gobi Masala', 'Kadai Bhindi', 'Vegetable Korma', 'Paneer Pasanda', 'Aloo Jeera', 'Veg Pulao', 'Mushroom Biryani', 'Kadai Mushroom', 'Chicken Tikka Masala', 'Mutton Korma', 'Fish Tikka'
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
        this.youTubeUrl = data.enteredText
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
    private navCtrl: NavController,
    private adminService: AdminService,
    public loadingCtrl: LoadingController,
    private authService: AuthServiceService,
    private sanitizer: DomSanitizer,
  ) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    if (this._id) {
      this.adminService.getListingBasedOnId({ _id: this._id }).subscribe((res: any) => {
        if (res.success) {
          this.bindingData = res.data
          this.orderEndDateTime = this.bindingData.endDateTime;
          this.deliveryItems = this.bindingData.deliveryOptions;
          this.items = this.bindingData.listingOrders.map((e: any) => {
            return { name: e.name, price: e.price, quantity: e.quantity }
          })
          this.youTubeUrl = this.bindingData.youtubeUrl;

          this.orderDeliveredDateTime = this.bindingData.startDateTime;
          console.log(res)
          this.mediaImages = [];
          this.bindingData.imageArray?.map(async (e: any) => {
            let localLogo = await this.authService.getLogoImageById({ fileId: e });
            let localimageName = localLogo?.data?.name
            let localimage: any = '';
            if (!localLogo.success) localimage = '';
            if (localLogo.data.mimetype == "svg+xml") {
              localimage = await this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${localLogo.data.data}`);
            }
            localimage = `data:image/jpg;base64,${localLogo.data.data}`;
            this.mediaImages.push({ image: localimage, imageName: localimageName, imageId: e });
          })
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
    if (this.deliveryType && (this.deliveryPrice || this.deliveryPrice == 0)) {
      this.deliveryItems.push({ type: this.deliveryType, price: this.deliveryPrice });
      // this.deliveryPrice = 0;
    }
  }

  removeDeliveryItem(deliveryItem: any) {
    this.deliveryItems = this.deliveryItems.filter(i => i !== deliveryItem);
  }

  addListing() {
    let obj: any = {
      address: this.selectedPrediction.formatted_address,
      lat: this.selectedPrediction.lat,
      lng: this.selectedPrediction.lng,
      label: this.label,
      category: this.selectedItems[0],
      startDateTime: new Date(this.orderDeliveredDateTime),
      endDateTime: new Date(this.orderEndDateTime),
      orders: this.items,
      deliveryOptions: this.deliveryItems,
      youtubeUrl: this.youTubeUrl,
      image: this.mediaImages,
    }
    if (this._id) obj._id = this._id
    this.adminService.addEditListing(obj).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/listings']);
      }
    }, (err: any) => {
      console.log(err);
    })
  }


  goToBack() {
    this.navCtrl.back();
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
      this.showOrderEndDateTimePicker = false;
    } else if (type === 'orderDeliveredDateTime') {
      this.showOrderDeliveredDateTimePicker = false;
    }
  }

  async onSearchInput() {
    if (this.search?.length > 0) {
      const loading = await this.loadingCtrl.create();
      this.autocompleteService.getPlacePredictions({ input: this.search }, (predictions: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.predictions = predictions;
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
        this.selectedPrediction.lat = placeResult.geometry.location.lat();
        this.selectedPrediction.lng = placeResult.geometry.location.lng();
      }
    });
    this.predictions = []
  }

  toggleFreeDelivery() {
    this.deliveryPrice = 0;
    this.isFreeDelivery = !this.isFreeDelivery;
  }

  addMediaImages(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      this.addMultipleMediaImages(files);
    }
  }

  addMultipleMediaImages(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imageData = e.target.result as string;
        const imageName = file.name;
        const imageObject = { image: imageData, imageName };
        this.mediaImages.push(imageObject);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.mediaImages.splice(index, 1);
    const mediaFormData = this.mediaImages;
  }

}
