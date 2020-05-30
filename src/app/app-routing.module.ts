import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { RegistrationMerchantComponent } from './registration-merchant/registration-merchant.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './service/service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { PackageComponent } from './package/package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { MarchantProfileComponent } from './marchant-profile/marchant-profile.component';
import { AddMainCategoryComponent } from './add-main-category/add-main-category.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { AdminSubscriptionComponent } from './admin-subscription/admin-subscription.component';
import { BuySubscriptionComponent } from './buy-subscription/buy-subscription.component';
import { PurchaseSubscriptionComponent } from './purchase-subscription/purchase-subscription.component';
import { AdminMarchantComponent } from './admin-marchant/admin-marchant.component';
import { MarchantBookingComponent } from './marchant-booking/marchant-booking.component';
import { MarchantBookingViewComponent } from './marchant-booking-view/marchant-booking-view.component';
import { MarchantBookingComplateComponent } from './marchant-booking-complate/marchant-booking-complate.component';
import { PolicyComponent } from './policy/policy.component';
import { AboutComponent } from './about/about.component';
import { MarchantDashboardComponent } from './marchant-dashboard/marchant-dashboard.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { MarchantReviewComponent } from './marchant-review/marchant-review.component';
import { FaqComponent } from './faq/faq.component';
import { AddFaqComponent } from './add-faq/add-faq.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },

  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'register',
    component: RegistrationMerchantComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'service',
    component: ServiceComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'service/add',
    component: AddServiceComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'category',
    component: MainCategoryComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'category/add',
    component: AddMainCategoryComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'package',
    component: PackageComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'package/add',
    component: AddPackageComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'profile',
    component: MarchantProfileComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'employee/add',
    component: AddEmployeeComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'subscription/add',
    component: AddSubscriptionComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'subscription/buy',
    component: BuySubscriptionComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'subscription',
    component: AdminSubscriptionComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'subscription/admin/view',
    component: PurchaseSubscriptionComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'Marchant/admin/view',
    component: AdminMarchantComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'marchant/booking',
    component: MarchantBookingComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'marchant/booking/complete',
    component: MarchantBookingComplateComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'marchant/booking/single',
    component: MarchantBookingViewComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'marchant/dashboard',
    component: MarchantDashboardComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'marchant/review',
    component: MarchantReviewComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'admin/review',
    component: AdminReviewComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'policy',
    component: PolicyComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'faq/add',
    component: AddFaqComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'Heroes List' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {

}
