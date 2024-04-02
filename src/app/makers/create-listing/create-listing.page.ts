import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../../services/admin.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  orderEndDateTime: any = new Date().toISOString();
  orderDeliveredDateTime: any = new Date().toISOString();
  search: any;
  selectedPrediction: any;
  autocompleteService: any;
  predictions: any;
  mediaImages: any = [];
  bindingData: any;
  youTubeUrl: any;
  addCategoryData = [
    "Butter Chicken", "Palak Paneer", "Dal Makhani", "Rajma", "Chole (Chickpea Curry)",
    "South Indian Main Dishes", "Masala Dosa", "Hyderabadi Biryani", "Sambar", "Fish Curry",
    "Uttapam", "Macher Jhol", "Prawn Malai Curry", "Rasgulla", "Sandesh",
    "Luchi", "Pav Bhaji", "Goan Fish Curry", "Dhokla", "Vada Pav",
    "Poha", "Samosa", "Chaat", "Pakora", "Aloo Tikki",
    "Bhel Puri", "Gulab Jamun", "Jalebi", "Kaju Katli", "Ras Malai",
    "Barfi", "Naan", "Roti", "Biryani", "Jeera Rice",
    "Paratha", "Masala Chai", "Lassi", "Mango Lassi", "Nimbu Pani",
    "Chai", "Mango Pickle", "Lime Pickle", "Mint Chutney", "Tamarind Chutney",
    "Coconut Chutney", "Tandoori Chicken", "Keema", "Kofta", "Paneer Tikka",
    "Chicken 65", "Aloo Gobi", "Kadai Paneer", "Matar Paneer", "Rogan Josh",
    "Dum Aloo", "Baingan Bharta", "Navratan Korma", "Shahi Paneer", "Malai Kofta",
    "Chana Masala", "Rava Idli", "Lemon Rice", "Andhra Chicken Curry", "Kerala Beef Fry",
    "Rava Dosa", "Fish Moilee", "Curd Rice", "Pongal", "Coconut Rice",
    "Onion Uthappam", "Aloo Posto", "Shorshe Ilish", "Mishti Doi", "Chingri Malai Curry",
    "Momo", "Sikkim Thukpa", "Litti Chokha", "Aloo Dum", "Dal Pitha",
    "Khar", "Misal Pav", "Undhiyu", "Bombay Duck Fry", "Kolhapuri Chicken",
    "Aamti", "Bhakri", "Thepla", "Khandvi", "Sev Usal",
    "Patra", "Kachori", "Dabeli", "Mirchi Bajji", "Gobi Manchurian",
    "Idli", "Medu Vada", "Momos", "Kathi Roll", "Paneer Pakora",
    "Ladoo", "Soan Papdi", "Halwa", "Shrikhand", "Peda",
    "Kulfi", "Moong Dal Halwa", "Kheer", "Besan Barfi", "Gajar Ka Halwa",
    "Kulcha", "Aloo Paratha", "Pulao", "Kashmiri Pulao", "Methi Thepla",
    "Puri", "Akki Roti", "Makki di Roti", "Missi Roti", "Appam",
    "Rose Lassi", "Badam Milk", "Jaljeera", "Aam Panna", "Thandai",
    "Sattu Drink", "Butter Tea", "Coffee", "Sharbat", "Kokum Juice",
    "Garlic Pickle", "Onion Chutney", "Coriander Chutney", "Peanut Chutney", "Red Chilli Pickle",
    "Sweet Mango Chutney", "Amla Pickle", "Green Chilli Pickle", "Tomato Chutney", "Carrot Pickle",
    "Hariyali Chicken Tikka", "Mutton Biryani", "Goan Prawn Curry", "Vegetable Jalfrezi", "Egg Curry",
    "Chicken Korma", "Paneer Bhurji", "Kadhi Pakora", "Aloo Tikki Chaat", "Schezwan Fried Rice",
    "Gujiya", "Modak", "Kaju Roll", "Karanji", "Chhena Poda",
    "Patishapta", "Payesh", "Nolen Gurer Sandesh", "Til Ladoo", "Bisi Bele Bath",
    "Laal Maas", "Chettinad Chicken", "Kappa Tapioca", "Bamboo Shoot Curry", "Vangi Bath",
    "Fish Tenga", "Nihari", "Dhansak", "Sarson Ka Saag", "Kadai Vegetables",
    "Gatte Ki Sabzi", "Aloo Shimla Mirch", "Bhindi Masala", "Malai Matar", "Tawa Paneer",
    "Vegetable Kolhapuri", "Matar Mushroom", "Paneer Lababdar", "Chicken Chettinad", "Mutton Rogan Josh",
    "Prawn Masala", "Fish Amritsari", "Lamb Vindaloo", "Nalli Nihari", "Chicken Xacuti",
    "Mutton Keema", "Goan Sausage Pulao", "Snacks and Light Eats", "Masala Peanuts", "Banana Chips",
    "Bhakarwadi", "Murukku", "Chakli", "Sev", "Papdi",
    "Mathri", "Mixture", "Pani Puri", "Unique Regional Varieties", "Kachalu Chaat",
    "Aloo Handi Chaat", "Kanji Vada", "Shami Kebab", "Galouti Kebab", "Chicken Ghee Roast",
    "Nargisi Kofta", "Chicken Angara", "Tandoori Pomfret", "Crab Masala", "Milk Cake",
    "Rabri", "Angoori Rasmalai", "Phirni", "Sheera", "Balushahi",
    "Imarti", "Chikki", "Kulhad Kulfi", "Shahi Tukda", "Chili Chicken",
    "Veg Manchurian", "Hakka Noodles", "Schezwan Chicken", "Spring Rolls", "Chili Paneer",
    "Manchow Soup", "American Chop Suey", "Dragon Chicken", "Mangalorean Fish Curry", "Malabar Parotta",
    "Karimeen Pollichathu", "Prawn Gassi", "Tandoori Crab", "Fish Fry", "Squid Masala",
    "Bombil Fry", "Kombdi Vade", "Neer Dosa", "Sprout Salad", "Oats Idli",
    "Multigrain Roti", "Quinoa Upma", "Bajra Khichdi", "Ragi Dosa", "Moong Dal Chila",
    "Millet Biryani", "Palak Khichdi", "Barley Salad", "Achari Chicken", "Shalgam Ki Sabzi",
    "Kadi Pakoda", "Soya Chaap Curry", "Aloo Methi", "Paneer Jalfrezi", "Mutton Do Pyaza",
    "Bharwan Bhindi", "Mushroom Masala", "Kofta Curry", "Kozhikode Biryani", "Chicken Gassi",
    "Vegetable Stew", "Meen Pollichathu", "Kanava Thoran Squid with Coconut", "Chicken Sukka", "Mysore Pak",
    "Chicken 65 Biryani", "Karnataka Style Sambar", "Kerala Style Parotta", "Bhapa Ilish", "Kala Chana Ghugni",
    "Mutton Dak Bungalow", "Tomato Khejur Chutney", "Posto Bora", "Aloo Potol Posto", "Kancha Lonka Murgi",
    "Chhena Jhilli", "Bihari Kabab", "Sattu Paratha", "Surti Undhiyu", "Aamras Puri",
    "Kolambi Masala", "Kothimbir Vadi", "Zunka Bhakar", "Khaman", "Patra Ni Machhi",
    "Prawn Koliwada", "Bharli Vangi", "Ragda Patties", "Vada Sambar", "Hara Bhara Kabab",
    "Pani Ke Batashe", "Khaman Dhokla", "Aloo Chaat", "Sev Puri", "Dal Vada",
    "Sabudana Khichdi", "Chole Bhature", "Motichoor Ladoo", "Kesar Peda", "Malpua",
    "Akhrot Barfi", "Boondi Ladoo", "Chenna Murki", "Basundi", "Kulfi Falooda",
    "Shakkarpara", "Rumali Roti", "Batata Vada", "Tandoori Roti", "Bhature",
    "Aloo Kulcha", "Vegetable Biryani", "Chole Kulche", "Egg Biryani", "Saffron Rice",
    "Aloo Baingan Rice", "Badam Sharbat", "Kesar Milk", "Masala Soda", "Rose Milk",
    "Falooda", "Kokum Sharbat", "Saffron Lassi", "Sol Kadhi", "Sugarcane Juice",
    "Mango Milkshake", "Fish Pickle", "Carrot and Ginger Chutney", "Brinjal Pickle", "Sweet Lime Pickle",
    "Tomato Garlic Chutney", "Capsicum Chutney", "Beetroot Chutney", "Peanut Garlic Chutney", "Lemon Garlic Pickle",
    "Pudina Chutney", "Chilli Garlic Noodles", "Bombay Sandwich", "Paneer Manchurian", "Palak Corn",
    "Mushroom Pepper Fry", "Chicken Manchurian", "Aloo Mutter", "Goan Vindaloo", "Malabar Chicken Curry",
    "Rajasthani Laal Maas", "Coorg Pandi Curry", "Hyderabadi Haleem", "Kashmiri Yakhni", "Andhra Gongura Chicken",
    "Tamil Nadu Kuzhambu", "Gujarati Handvo", "Bengali Doi Maach", "Bhindi Fry", "Paneer Butter Masala",
    "Gobi Masala", "Kadai Bhindi", "Vegetable Korma", "Paneer Pasanda", "Aloo Jeera",
    "Veg Pulao", "Mushroom Biryani", "Kadai Mushroom", "Chicken Tikka Masala", "Mutton Korma",
    "Fish Tikka", "Prawn Biryani", "Chicken Dum Biryani", "Egg Masala", "Lamb Curry",
    "Butter Garlic Prawns", "Mutton Chops", "Chicken Fry", "Corn Chaat", "Spinach Pakoda",
    "Masala Corn", "Onion Pakoda", "Paneer Cutlet", "Masala Papad", "Puffed Rice Snack",
    "Aloo Bondas", "Bread Pakora", "Masala Toast", "Aloo Poshto", "Kaju Curry",
    "Mutton Saagwala", "Tandoori Lobster", "Paneer Chilli Dry", "Lamb Biryani", "Andhra Prawn Fry",
    "Mutton Sukka", "Pista Burfi", "Dry Fruit Ladoo", "Coconut Barfi", "Besan Ladoo",
    "Kheer Kadam", "Rasgulla", "Bal Mithai", "Apple Jalebi", "Chili Garlic Noodles",
    "Gobi 65", "Dragon Paneer", "Chicken Lollipop", "Veg Hakka Noodles", "Chilli Mushroom",
    "Egg Fried Rice", "Paneer 65", "Chicken Schezwan Fried Rice", "Chilli Gobi", "More Coastal Delicacies",
    "Masala Fried Fish", "Konkani Chicken Curry", "Mangalore Buns", "Karwari Fish Curry", "Prawn Balchao",
    "Rava Fried Fish", "Crab Curry", "Pomfret Pollichathu", "Tandoori Fish Tikka", "Spinach Soup",
    "Barley Soup", "Moong Sprout Salad", "Brown Rice Biryani", "Vegetable Clear Soup", "Lauki Ki Sabzi",
    "Ragi Malt", "Carrot Ginger Soup", "Beetroot Curry", "Quinoa Pilaf", "Sohan Papdi",
    "Kesar Burfi", "Chum Chum", "Mohanthal", "Coconut Ladoo", "Kalakand",
    "Seviyan Kheer", "Pista Halwa", "Badusha", "Rava Ladoo", "Kesar Pista Kulfi",
    "Shahi Tukra", "Angoori Gulab Jamun", "Pinni", "Chandrakala", "Patisa",
    "Khoya Barfi", "Ghevar", "Kakinada Kaja", "Ajmeri Kalakand", "Sandesh",
    "Rajbhog", "Aam Shrikhand", "Cham Cham", "Doda Barfi", "Milk Peda",
    "Khaja", "Malai Sandwich", "Kaju Pista Roll", "Mango Kulfi", "Kheer Mohan",
    "Rabdi", "Almond Barfi", "Nankhatai", "Agra Petha", "Shakkar Pare",
    "Sutarfeni", "Anjeer Barfi", "Kaju Barfi", "Son Papdi", "Til Laddu",
    "Dodha Barfi", "Amrakhand", "Kesar Mawa Barfi", "Besan Ki Barfi", "Akhrot Halwa",
    "Apple Halwa", "Atta Ladoo", "Badam Halwa", "Besan Ka Halwa", "Bombay Halwa",
    "Bundi Ladoo", "Chana Dal Halwa", "Chocolate Barfi", "Dal Ka Halwa", "Date Barfi",
    "Dry Fruit Barfi", "Elaichi Barfi", "Fig Barfi", "Gajar Halwa", "Kaju Apple",
    "Kaju Strawberry", "Khoya Gulab Jamun", "Laddu", "Malai Ladoo", "Malai Rabri",
    "Moong Dal Ladoo", "Rava Upma", "Poha", "Sabudana Vada",
    "Mirchi Bajji", "Dhokar Dalna", "Khandvi",
    "Matar Kachori", "Batata Vada", "Masala Vada",
    "Onion Pakora ", "Paneer Pakora", "Masala Poori", "Aloo Tikki",
    "Chana Jor Garam", "Fafda Jalebi", "Khakhra", "Pav Bhaji",
    "Bhakarwadi", "Idli with Chutney", "Medu Vada with Sambar",
    "Gobi Manchurian", "Sev Tamatar",
    "Chicken Lollipop", "Bread Pakora", "Chilli Chicken",
    "Aloo Chaat", "Samosa Chaat", "Dahi Vada",
    "Ragda Pattice", "Bhindi Kurkuri", "Veg Momos",
    "Chicken 65", "Chilli Paneer", "Egg Roll",
    "Paneer Kathi Roll", "Moong Dal Chilla", "Pani Puri",
    "Bhatura", "Aloo Paratha", "Veg Frankie",
    "Sukha Bhel", "Misal Pav", "Litti Chokha",
    "Veg Cutlet", "Keema Pav", "Kachori with Aloo Sabzi",
    "Pav Sandwich", "Methi Thepla", "Sabudana Thalipeeth",
    "Vangi Bhath", "Kothu Parotta", "Masala Papad",
    "Sev Khamani", "Dal Dhokli", "Usal Pav",
    "Aloo Posto", "Chakli", "Corn Pakoda",
    "Matar Paneer Samosa", "Veg Frankie",
    "Pav Vada", "Sabudana Khichdi", "Chicken Shami Kebab",
    "Methi Muthia", "Peanut Masala", "Instant Rava Dhokla",
    "Paneer Chilli Dry", "Aloo Kachori", "Keema Samosa",
    "Egg Kebab", "Maggi Masala Noodles", "Bharwa Karela",
    "Kadhi Pakoda", "Veg Kebab", "Raj Kachori",
    "Paniyaram", "Dahi Puri", "Aloo Gobi Dry",
    "Chicken Momos", "Pav Bhaji Dosa", "Mutton Cutlet",
    "Stuffed Capsicum", "Masala Khichdi", "Palak Pakoda",
    "Chana Dal Vada", "Paneer Tikka Masala", "Tandoori Gobi",
    "Aloo Paneer Tikki", "Gatte Ki Sabzi",
    "Bombay Grilled Sandwich", "Masala Chai with Bun Maska", "Bread Omelette", "Aloo Tikki Burger",
    "Chicken Seekh Kebab", "Gobi 65", "Vegetable Cutlet", "Onion Bhajiya",
    "Aloo Paneer Tikki", "Cheese Stuffed Mushrooms", "Veg Puff", "Stuffed Tomato Bhaji",
    "Veg Momos", "Stuffed Bitter Gourd", "Batata Harra", "Bhindi Fry",
    "Stuffed Paratha", "Dahi Puri", "Veg Kathi Roll",
    "Chole Tikki", "Khasta Kachori", "Baby Corn Fritters", "Dal Kachori", "Aloo Gobi Dry",
    "Veg Manchurian Dry", "Masala Vada", "Veg Frankie", "Corn Pakoda", "Veg Spring Rolls",
    "Mysore Bonda", "Sukha Bhel", "Stuffed Paneer Pakora", "Tawa Idli", "Sev Khamani",
    "Veg Schezwan Fried Rice", "Spinach Corn Sandwich", "Masala Puri", "Sabudana Vada", "Mirchi Vada",
    "Stuffed Bread Pakora", "Punugulu", "Mirapakaya Bajji", "Chegodilu", "Garelu or Vada",
    "Pesarattu", "Sakinalu", "Boorelu", "Pulihora", "Atukulu",
    "Kobbari Burelu", "Karijelu", "Pappu Chekkalu", "Andhra Murukku or Chakli", "Karapusa or Sev",
    "Pachi Pulusu", "Gutti Vankaya Fry", "Bellam Gavvalu", "Minapa Sunnundalu or Urad Dal Laddu", "Palakayalu",
    "Andhra Style Corn Vada", "Karam Podi with Idli", "Bonda", "Mamidikaya Pulihora or Raw Mango Rice",
    "Chintapandu Pulihora or Tamarind Rice", "Allam Pakodi or Ginger Fritters", "Andhra Style Idli", "Ulava Charu Horse Gram Soup",
    "Perugu Vada", "Dahi Vada", "Mokkajonna Garelu", "Corn Vada", "Aratikaya Bajji", "Raw Banana Fritters",
    "Royyala Vepudu", "Prawn Fry", "Andhra Kodi Fry", "Andhra Chicken Fry", "Jonna Rotte", "Sorghum Flatbread",
    "Dondakaya Fry", "Ivy Gourd Fry", "Gutti Dondakaya", "Stuffed Ivy Gourd", "Beerakaya Bajji", "Ridge Gourd Fritters",
    "Bobbatlu", "Puran Poli", "Andhra Spicy Mixture", "Pootharekulu", "Sunnundalu", "Qubani Ka Meetha",
    "Double Ka Meetha", "Ariselu", "Poornalu", "Jhangri", "Andhra Laddu",
    "Bandar Laddu", "Kajjikayalu", "Sweet Dumplings", "Payasam", "Rice/Milk-based dessert", "Andhra Halwa", "Luqmi",
    "Badushah", "Gongura Pachadi", "Sorrel Leaves Pickle", "Mango Avakaya", "Mango Thokku", "Tomato Pachadi",
    "Dosakaya Mukkala Pachadi", "Cucumber Pickle", "Lime Pickle", "Nimmakaya Pachadi", "Chintakaya Pachadi", "Tamarind Pickle",
    "Amla Indian Gooseberry Pickle", "Mixed Vegetable Pickle", "Andhra Chicken Pickle", "Mutton Pickle", "Prawn Pickle",
    "Andhra Style Gongura Mutton Pickle", "Gunpowder Kandi Podi", "Nuvvula Podi", "Sesame Seed Powder",
    "Andhra Style Paruppu Podi", "Karivepaku Podi", "Curry Leaf Powder", "Kobbari Podi", "Coconut Powder",
    "Palli Podi", "Peanut Powder", "Pappula Podi", "Roasted Chana Dal Powder", "Vellulli Karam Podi", "Garlic Spice Powder",
    "Idli Karam Podi", "Coriander Seed Powder", "Vanilla Ice Cream", "Chocolate Ice Cream", "Strawberry Ice Cream",
    "Mint Chocolate Chip Ice Cream", "Cookies and Cream Ice Cream", "Rocky Road Ice Cream", "Butter Pecan Ice Cream",
    "Neapolitan Ice Cream", "Pistachio Ice Cream", "Salted Caramel Ice Cream", "Cookie Dough Ice Cream", "Coffee Ice Cream",
    "Mango Ice Cream", "Raspberry Ripple Ice Cream", "Lemon Sorbet Ice Cream", "Banana Ice Cream", "Black Cherry Ice Cream",
    "Cotton Candy Ice Cream", "Green Tea Ice Cream", "Almond Fudge Ice Cream", "Birthday Cake Ice Cream", "Coconut Ice Cream",
    "Dulce de Leche Ice Cream", "Peppermint Ice Cream", "Tiramisu Ice Cream", "Rum Raisin Ice Cream", "Bubble Gum Ice Cream",
    "Cheesecake Ice Cream", "Blackberry Ice Cream", "Cinnamon Ice Cream", "Honey Lavender Ice Cream", "Matcha Ice Cream",
    "Dark Chocolate Ice Cream", "Mocha Ice Cream", "Blueberry Cheesecake Ice Cream", "Maple Walnut Ice Cream",
    "Red Velvet Ice Cream", "Peanut Butter Cup Ice Cream", "Snickers Ice Cream", "White Chocolate Raspberry Ice Cream",
    "Lychee Ice Cream", "Passion Fruit Ice Cream", "Espresso Ice Cream", "Ginger Ice Cream", "S'mores Ice Cream",
    "Key Lime Ice Cream", "Toffee Ice Cream", "Hazelnut Ice Cream", "Chai Spice Ice Cream", "Oreo Ice Cream",
    "Chocolate Cake", "Vanilla Sponge Cake", "Red Velvet Cake", "Carrot Cake", "Cheesecake",
    "Black Forest Cake", "Lemon Drizzle Cake", "Coffee Cake", "Banana Bread", "Pound Cake",
    "Angel Food Cake", "Tiramisu Cake", "Pineapple Upside-Down Cake", "Opera Cake", "Battenberg Cake",
    "Bundt Cake", "Marble Cake", "Spice Cake", "Flourless Chocolate Cake", "Fruitcake",
    "Velvet Cake", "Victoria Sponge Cake", "Butter Cake", "German Chocolate Cake", "Sponge Cake",
    "Chiffon Cake", "Lemon Pound Cake", "Rum Cake", "Coconut Cake", "Mocha Cake",
    "Zucchini Cake", "Apple Cake", "Pumpkin Cake", "Strawberry Shortcake", "Genoise Cake",
    "Devil's Food Cake", "Lady Baltimore Cake", "Molten Lava Cake", "Funfetti Cake", "Sacher Torte",
    "Madeira Cake", "Hummingbird Cake", "Chocolate Fudge Cake", "Blueberry Cake", "Lemon Poppy Seed Cake",
    "Orange Cake", "Pineapple Cake", "White Chocolate Raspberry Cake", "Dulce de Leche Cake", "Caramel Cake",
    "Chocolate Chip Cookies", "Shortbread Biscuits", "Oatmeal Raisin Cookies", "Peanut Butter Cookies", "Ginger Snaps",
    "Sugar Cookies", "Snickerdoodles", "Biscotti", "Macarons", "Gingersnaps",
    "Fortune Cookies", "Butter Cookies", "Digestive Biscuits", "Ladyfingers", "Madeleines",
    "Linzer Cookies", "Anzac Biscuits", "Florentines", "Molasses Cookies", "Tea Biscuits",
    "Jammie Dodgers", "Custard Creams", "Bourbon Biscuits", "Hobnobs", "Fig Rolls",
    "Nilla Wafers", "Animal Crackers", "Lebkuchen", "Pizzelle", "Russian Tea Cakes",
    "Alfajores", "Speculoos", "Spritz Cookies", "Pinwheel Cookies", "Danish Butter Cookies",
    "Empire Biscuits", "Galletas Maria", "Milano Cookies", "Palmiers", "Graham Crackers",
    "Macaroons", "Amaretti", "Viennese Whirls", "Savoiardi", "Oreos",
    "Lorna Doone", "Meringues", "Pfeffernüsse", "Stroopwafels", "Garibaldi Biscuits",
    "Milk Chocolate", "Dark Chocolate", "White Chocolate", "Semi-Sweet Chocolate", "Bittersweet Chocolate",
    "Chocolate Truffles", "Chocolate Bars", "Chocolate Coins", "Hot Chocolate Mix", "Chocolate Covered Almonds",
    "Chocolate Covered Raisins", "Chocolate Ganache", "Chocolate Mousse", "Chocolate Pralines", "Belgian Chocolate",
    "Swiss Chocolate", "German Chocolate", "Dutch Cocoa Chocolate", "Chocolate with Nuts", "Mint Chocolate",
    "Orange Chocolate", "Sea Salt Chocolate", "Caramel Filled Chocolate", "Chocolate with Fruit Pieces", "Chili Chocolate",
    "Chocolate Liqueurs", "Malted Chocolate", "Chocolate Fudge", "Ruby Chocolate", "Chocolate Covered Espresso Beans",
    "Chocolate Covered Pretzels", "Chocolate Covered Strawberries", "Chocolate Covered Marshmallows", "Chocolate Bonbons",
    "Chocolate Wafers", "Chocolate Chips", "Chocolate Bark", "Chocolate Covered Bacon", "Chocolate Fondue",
    "Chocolate Spread", "Chocolate Brownies", "Chocolate Pudding", "Chocolate Crinkles", "Chocolate Tarts",
    "Modeling Chocolate", "Compound Chocolate", "Chocolate Brittle", "Chocolate Macarons", "Peanut Brittle",
    "Caramel Squares", "Marshmallows", "Fudge", "Toffee", "Lollipops",
    "Gummy Candies", "Hard Candy Drops", "Peppermint Patties", "Almond Roca", "Coconut Bars",
    "Lemon Drops", "Chocolate Bark with nuts, fruits, etc.", "Divinity Candy", "Candy Canes", "Rock Candy",
    "Pate de Fruit Fruit Jellies", "Marzipan Fruits", "Salt Water Taffy", "Honeycomb Candy", "Turkish Delight",
    "Butter Mints", "Peanut Butter Cups", "Fruit Leather", "Mint Chocolate Bark", "Candied Orange Peels",
    "Rum Balls", "White Chocolate Truffles", "Meringue Drops", "Jelly Beans", "Nougat",
    "Pralines", "Licorice Candy", "Caramel Popcorn", "Sesame Candy", "Molasses Taffy",
    "Butterscotch Candy", "Maple Candy", "Cotton Candy", "Chocolate Covered Cherries", "Caramel Apples",
    "Chocolate Honey Truffles", "Sugar Plums", "Pecan Turtles", "Bourbon Balls", "Homemade Soaps",
    "Bath Bombs", "Lip Balms", "Body Scrubs", "Natural Deodorants", "Face Masks",
    "Shampoo Bars", "Herbal Salves", "Essential Oil Blends", "Handmade Lotions", "Knitted or Crocheted Items",
    "Handmade Pottery", "Painted Canvas Art", "Custom Jewelry", "Macramé Wall Hangings", "Hand-Sewn Pillows or Quilts",
    "Homemade Furniture", "Glass Art or Stained Glass", "Handcrafted Wooden Toys", "Herbal Pesticides", "Compost Bins",
    "Birdhouses", "Garden Ornaments", "Handmade Planters", "Natural Fertilizers", "Rain Barrels",
    "DIY Greenhouses", "Wind Chimes", "Yoga Mats", "Meditation Cushions", "Herbal Teas",
    "Natural Incense", "Aromatherapy Roll-Ons", "DIY Fitness Equipment", "Wellness Journals", "Homemade Toothpaste",
    "Natural Insect Repellents", "Handcrafted Walking Sticks", "Strawberry Jam", "Raspberry Jam", "Blackberry Jam",
    "Blueberry Jam", "Peach Jam", "Apricot Jam", "Fig Jam", "Plum Jam",
    "Cherry Jam", "Apple Butter", "Orange Marmalade", "Lemon Curd", "Mixed Berry Jam",
    "Pineapple Jam", "Mango Jam", "Pear Jam", "Grape Jelly", "Rhubarb Jam",
    "Pomegranate Jelly", "Cranberry Jam", "Pumpkin Butter", "Almond Butter", "Peanut Butter",
    "Cashew Butter", "Hazelnut Spread", "Chocolate Hazelnut Spread", "Honey Butter", "Caramel Spread",
    "Coconut Butter", "Apple Cinnamon Jam", "Tomato Jam", "Red Pepper Jelly", "Green Tomato Jam",
    "Onion Jam", "Garlic Jelly", "Bacon Jam", "Balsamic Fig Jam", "Ginger Marmalade",
    "Kiwi Jam", "Banana Jam", "Watermelon Jelly", "Elderberry Jelly", "Chia Seed Jam",
    "Rose Petal Jam", "Lavender Jelly", "Kumquat Marmalade", "Gooseberry Jam", "Passion Fruit Jam",
    "Date Spread", "Tamarind Jam", "Classic Honey Almond Granola", "Maple Pecan Granola", "Chocolate Chunk Granola",
    "Coconut Cashew Granola", "Peanut Butter Granola", "Cinnamon Spice Granola", "Vanilla Blueberry Granola",
    "Cranberry Walnut Granola", "Pumpkin Spice Granola", "Banana Nut Granola", "Cherry Almond Granola",
    "Apple Cinnamon Granola", "Mixed Berry Granola", "Tropical Fruit Granola", "Dark Chocolate and Raspberry Granola",
    "Gingerbread Granola", "Matcha Green Tea Granola", "Chai Spiced Granola", "Espresso Bean Granola",
    "Savory Parmesan Garlic Granola", "Oat and Honey Bars", "Nutty Fruit Bars", "Peanut Butter Chocolate Chip Bars",
    "No-Bake Protein Bars", "Chewy Granola Bars", "Date and Nut Energy Bars", "Quinoa and Chia Seed Bars",
    "Trail Mix Bars", "Apple Pie Bars", "Almond Joy Bars", "Dark Chocolate and Sea Salt Bars",
    "Raspberry Oatmeal Bars", "Pumpkin Seed and Cranberry Bars", "Banana Bread Bars", "Lemon Poppy Seed Bars",
    "Cherry and Pistachio Bars", "Fig and Walnut Bars", "Coconut and Lime Bars", "Blueberry Yogurt Bars",
    "Caramel Pecan Bars", "Carrot Cake Bars", "Mocha Espresso Bars", "Peanut Butter and Jelly Bars",
    "Matcha Green Tea Bars", "Mango Coconut Bars", "Sesame Honey Bars", "Chocolate Mint Bars",
    "Spiced Apple Bars", "Yogurt and Berry Parfait Bars", "Ginger and Turmeric Energy Bars", "Olive Oil",
    "Coconut Oil", "Avocado Oil", "Flaxseed Oil", "Walnut Oil", "Almond Oil",
    "Sesame Oil", "Sunflower Seed Oil", "Grape Seed Oil", "Pumpkin Seed Oil", "Hemp Seed Oil",
    "Peanut Oil", "Hazelnut Oil", "Safflower Oil", "Canola Oil", "Black Seed Oil",
    "Chia Seed Oil", "Pine Nut Oil", "Apricot Kernel Oil", "Macadamia Nut Oil", "Pecan Oil",
    "Cashew Oil", "Brazil Nut Oil", "Pistachio Oil", "Prickly Pear Seed Oil", "Mustard Seed Oil",
    "Jojoba Oil", "Baobab Oil", "Wheat Germ Oil", "Rice Bran Oil", "Garlic Infused Olive Oil",
    "Rosemary Infused Oil", "Chili Pepper Infused Oil", "Lemon Infused Olive Oil", "Basil Infused Oil",
    "Thyme Infused Oil", "Oregano Infused Oil", "Truffle Infused Oil", "Sun-Dried Tomato Infused Oil",
    "Ginger Infused Oil", "Sage Infused Oil", "Cilantro Infused Oil", "Dill Infused Oil",
    "Mint Infused Oil", "Orange Zest Infused Oil", "Lavender Infused Oil", "Vanilla Bean Infused Oil",
    "Lemongrass Infused Oil", "Fennel Seed Infused Oil", "Tarragon Infused Oil", "Coriander Seed Infused Oil",
    "Cardamom Infused Oil", "Cinnamon Infused Oil", "Star Anise Infused Oil", "Coffee Bean Infused Oil",
    "Clove Infused Oil", "Bay Leaf Infused Oil", "Nutmeg Infused Oil", "Juniper Berry Infused Oil",
    "Saffron Infused Oil", "Peppercorn Infused Oil", "Hibiscus Infused Oil", "Kaffir Lime Leaf Infused Oil",
    "Rose Petal Infused Oil", "Almond Infused Oil", "Walnut Infused Oil", "Hazelnut Infused Oil",
    "Pumpkin Seed Infused Oil", "Avocado Infused Oil", "Grapefruit Infused Oil", "Marjoram Infused Oil",
    "Parsley Infused Oil", "Smoked Paprika Infused Oil", "Chive Infused Oil", "Cocoa Infused Oil",
    "Mustard Seed Infused Oil", "Bergamot Infused Oil", "Caraway Seed Infused Oil", "Curry Leaf Infused Oil",
    "Pomegranate Seed Infused Oil", "Garam Masala", "BBQ Rub", "Cajun Seasoning", "Taco Seasoning",
    "Italian Seasoning", "Curry Powder", "Jerk Seasoning", "Chinese Five Spice", "Ras el Hanout North African Spice Mix",
    "Za'atar Mix", "Tandoori Masala", "Herbes de Provence", "Thai Spice Mix", "Greek Seasoning",
    "Pumpkin Pie Spice", "Fajita Seasoning", "Old Bay Seasoning for Seafood", "Chaat Masala", "Ethiopian Berbere",
    "Poultry Seasoning", "Shawarma Spice Mix", "All-Purpose Steak Rub", "Lemon Pepper Seasoning", "Montreal Steak Spice",
    "Achiote Paste Mexican Spice Paste", "Harissa Spice Mix", "Kansas City BBQ Rub", "Creole Seasoning",
    "Caribbean Spice Mix", "Chimichurri Dry Mix", "Mole Spice Mix", "Bengali Five Spice Panch Phoron",
    "Dukkah Egyptian Nut and Spice Blend", "Fish Seasoning", "Korean BBQ Rub", "Adobo Seasoning",
    "Baharat Middle Eastern Spice Mix", "Chai Spice Mix", "Szechuan Seasoning", "Mulling Spices",
    "Pickling Spice Mix", "Coffee Dry Rub for Meats", "Mexican Chili Powder", "Celery Salt",
    "Dry Sriracha Seasoning", "Smoked Paprika Rub", "Moroccan Spice Rub", "Thai Curry Powder",
    "Tuscan Herb Mix", "Paella Seasoning"
  ];
  results: string[] = [];
  newItemName: string = '';
  newItemPrice: string = '';
  newItemQuantity: string = '';
  items: any[] = [];

  deliveryType: string = '';
  deliveryPrice: number = 0;
  deliveryItems: any[] = [];
  deliveryOptions: any = [
    { disabled: false, type: 'Pickup Available' },
    { disabled: false, type: 'Neighbourhood 5KM' },
    { disabled: false, type: 'Town/City 20KM' },
    { disabled: false, type: 'PAN India above 20KM' },
  ];
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
  userData: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private adminService: AdminService,
    public loadingCtrl: LoadingController,
    private authService: AuthServiceService,
    private sanitizer: DomSanitizer,
    private alertController: AlertController
  ) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
    let data: any = localStorage.getItem('userData');
    this.userData = JSON.parse(data);
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this._id = this.router.url.split('/')[2];
    this.bindingData = '';
    this.orderEndDateTime = new Date().toISOString();
    this.orderDeliveredDateTime = new Date().toISOString();
    if (this._id) {
      this.adminService.getListingBasedOnId({ _id: this._id }).subscribe((res: any) => {
        if (res.success) {
          this.bindingData = res.data;
          this.label = this.bindingData?.label;
          this.orderEndDateTime = this.bindingData.orderEndsOn;
          this.deliveryItems = this.bindingData.deliveryOptions;
          this.deliveryOptions = this.deliveryOptions.map((e: any) => {
            if (this.deliveryItems.find((ele: any) => e.type == ele.type)) e.disabled = true;
            return e;
          })
          this.items = this.bindingData.listingOrders.map((e: any) => {
            return { name: e.name, price: e.price, quantity: e.quantity }
          })
          this.youTubeUrl = this.bindingData.youtubeUrl;

          this.orderDeliveredDateTime = this.bindingData.orderDeliveredOn;
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

  onCancelDateSelection(type: any) {
    this.showOrderEndDateTimePicker = false;
    this.showOrderDeliveredDateTimePicker = false;
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
    this.newItemName = item;
    this.results = [];
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
      this.deliveryItems.push({ type: this.deliveryType, price: this.isFreeDelivery || this.deliveryType == "Pickup Available" ? 0 : this.deliveryPrice, freeDelivery: this.deliveryType == "Pickup Available" ? false : this.isFreeDelivery });
      this.deliveryOptions = this.deliveryOptions.map((e: any) => {
        if (e.type == this.deliveryType) e.disabled = true;
        return e;
      });
      this.deliveryPrice = 0;
      this.deliveryType = '';
      this.isFreeDelivery = false;
    }
  }

  async openNoteDialog(item: any) {
    const alert = await this.alertController.create({
      header: 'Note',
      inputs: [
        {
          name: 'note',
          type: 'textarea',
          placeholder: 'Enter your notes',
          cssClass: 'custom-input',
          value: item?.notes || ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Canceled');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            let i = this.deliveryItems.findIndex(e => item.type == e.type);
            if (i > -1) this.deliveryItems[i].notes = data.note
          }
        }
      ]
    });

    await alert.present();
  }

  removeDeliveryItem(deliveryItem: any) {
    this.deliveryItems = this.deliveryItems.filter(e => e.type != deliveryItem.type);
    this.deliveryOptions = this.deliveryOptions.map((e: any) => {
      if (e.type == deliveryItem.type) e.disabled = false;
      return e;
    })
  }

  addListing() {
    let obj: any = {
      address: this.selectedPrediction.formatted_address,
      lat: this.selectedPrediction.lat,
      lng: this.selectedPrediction.lng,
      label: this.label,
      category: this.selectedItems[0],
      orderEndsOn: new Date(this.orderEndDateTime),
      orderDeliveredOn: new Date(this.orderDeliveredDateTime),
      orders: this.items,
      deliveryOptions: this.deliveryItems,
      youtubeUrl: this.youTubeUrl,
      image: this.mediaImages,
      role: this.userData?.primaryRole || this.userData?.role,
      refMakerId: this.bindingData?.refMakerId,
    }
    if(!obj.orders.length) return;
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
    this.showOrderEndDateTimePicker = false;
    this.showOrderDeliveredDateTimePicker = false;
    if (type === 'orderEndDateTime') {
      this.showOrderEndDateTimePicker = true;
    } else if (type === 'orderDeliveredDateTime') {
      this.showOrderDeliveredDateTimePicker = true;
    }
  }

  onDateTimeChange(type: string) {
    this.showOrderEndDateTimePicker = false;
    this.showOrderDeliveredDateTimePicker = false;
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
