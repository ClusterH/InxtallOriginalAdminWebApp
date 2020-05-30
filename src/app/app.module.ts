import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MainCategoryComponent } from './main-category/main-category.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RegistrationMerchantComponent } from './registration-merchant/registration-merchant.component';
import { NgxEditorModule } from 'ngx-editor';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ServiceComponent } from './service/service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { PackageComponent } from './package/package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MarchantProfileComponent } from './marchant-profile/marchant-profile.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { AddMainCategoryComponent } from './add-main-category/add-main-category.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { AdminSubscriptionComponent } from './admin-subscription/admin-subscription.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { BuySubscriptionComponent } from './buy-subscription/buy-subscription.component';
import { PurchaseSubscriptionComponent } from './purchase-subscription/purchase-subscription.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AdminMarchantComponent } from './admin-marchant/admin-marchant.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { MarchantBookingComponent } from './marchant-booking/marchant-booking.component';
import { MarchantBookingViewComponent } from './marchant-booking-view/marchant-booking-view.component';
import { MarchantBookingComplateComponent } from './marchant-booking-complate/marchant-booking-complate.component';
import { PolicyComponent } from './policy/policy.component';
import { AboutComponent } from './about/about.component';
import { MessagingService } from './messaging.service';
import { MarchantDashboardComponent } from './marchant-dashboard/marchant-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { MarchantReviewComponent } from './marchant-review/marchant-review.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { FaqComponent } from './faq/faq.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    WelcomeComponent,
    MainCategoryComponent,
    RegistrationMerchantComponent,
    LoginComponent,
    ServiceComponent,
    AddServiceComponent,
    PackageComponent,
    AddPackageComponent,
    MarchantProfileComponent,
    AddMainCategoryComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    AddSubscriptionComponent,
    AdminSubscriptionComponent,
    BuySubscriptionComponent,
    PurchaseSubscriptionComponent,
    TimeAgoPipe,
    AdminMarchantComponent,
    MarchantBookingComponent,
    MarchantBookingViewComponent,
    MarchantBookingComplateComponent,
    PolicyComponent,
    AboutComponent,
    MarchantDashboardComponent,
    MarchantReviewComponent,
    AdminReviewComponent,
    FaqComponent,
    AddFaqComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
ChartsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularMultiSelectModule,
    HttpClientModule,
    NgxPayPalModule,
    FormsModule,
    NgxEditorModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    NgxImageGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
