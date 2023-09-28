import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ProfileManagementComponent } from './Components/profile-management/profile-management.component';
import { ManagementSidenavComponent } from './Components/management-sidenav/management-sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profileManagement', component: ProfileManagementComponent },
  {
    path: 'management-sidenav',
    component: ManagementSidenavComponent,
    children: [
      { path: 'profileManagement', component: ProfileManagementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
