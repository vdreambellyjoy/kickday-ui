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
    path: 'adminDashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./admin/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'makerDashboard',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/maker-dashboard/maker-dashboard.module').then( m => m.MakerDashboardPageModule)
  },
  {
    path: 'createLlisting',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/create-listing/create-listing.module').then( m => m.CreateListingPageModule)
  },
  {
    path: 'editLlisting/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/create-listing/create-listing.module').then( m => m.CreateListingPageModule)
  },
  {
    path: 'makerListings',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/all-listings/all-listings.module').then( m => m.AllListingsPageModule)
  },
  {
    path: 'listingOverview/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/listing-overview/listing-overview.module').then( m => m.ListingOverviewPageModule)
  },
  {
    path: 'maker-order-overview',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./makers/maker-order-overview/maker-order-overview.module').then( m => m.MakerOrderOverviewPageModule)
  },


  {
    path: 'customerProfile',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./customer/customer-profile/customer-profile.module').then( m => m.CustomerProfilePageModule)
  },
  {
    path: 'customerListings',
    loadChildren: () => import('./customer/customer-listings/customer-listings.module').then( m => m.CustomerListingsPageModule)
  },
  {
    path: 'customer-listing-overview',
    loadChildren: () => import('./customer/customer-listing-overview/customer-listing-overview.module').then( m => m.CustomerListingOverviewPageModule)
  },
  {
    path: 'delivery-options',
    loadChildren: () => import('./customer/delivery-options/delivery-options.module').then( m => m.DeliveryOptionsPageModule)
  },
  {
    path: 'final-payment',
    loadChildren: () => import('./customer/final-payment/final-payment.module').then( m => m.FinalPaymentPageModule)
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
