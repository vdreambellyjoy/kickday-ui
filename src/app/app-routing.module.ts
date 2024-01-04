import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'home',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: 'adminDashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
  },
  {
    path: 'allUsers',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/all-users/all-users.module').then(m => m.AllUsersPageModule)
  },
  {
    path: 'userOverview/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/user-overview/user-overview.module').then(m => m.UserOverviewPageModule)
  },
  {
    path: 'listings',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./common/listings/listings.module').then(m => m.ListingsPageModule)
  },
  {
    path: 'listingOverView/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./common/listing-over-view/listing-over-view.module').then(m => m.ListingOverViewPageModule)
  },
  {
    path: 'customerOrderDetails/:id',
    loadChildren: () => import('./common/customer-order-details/customer-order-details.module').then(m => m.CustomerOrderDetailsPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./common/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'editprofile/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./common/profile/profile.module').then(m => m.ProfilePageModule)
  },


  {
    path: 'makerDashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/maker-dashboard/maker-dashboard.module').then(m => m.MakerDashboardPageModule)
  },
  {
    path: 'createListing',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/create-listing/create-listing.module').then(m => m.CreateListingPageModule)
  },
  {
    path: 'editListing/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/create-listing/create-listing.module').then(m => m.CreateListingPageModule)
  },


  {
    path: 'customerProfile',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./customer/customer-profile/customer-profile.module').then(m => m.CustomerProfilePageModule)
  },
  {
    path: 'customerListings',
    loadChildren: () => import('./customer/customer-listings/customer-listings.module').then(m => m.CustomerListingsPageModule)
  },
  {
    path: 'customerListings/:id',
    loadChildren: () => import('./customer/customer-listing-overview/customer-listing-overview.module').then(m => m.CustomerListingOverviewPageModule)
  },
  {
    path: 'AddressList',
    loadChildren: () => import('./customer/customer-address-list/customer-address-list.module').then(m => m.CustomerAddressListPageModule)
  },
  {
    path: 'orderSummary/:id',
    loadChildren: () => import('./customer/customer-order-summary/customer-order-summary.module').then( m => m.CustomerOrderSummaryPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./customer/customer-orders/customer-orders.module').then( m => m.CustomerOrdersPageModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
