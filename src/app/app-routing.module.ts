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
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
