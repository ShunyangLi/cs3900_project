import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { RandomComponent } from './random/random.component';
import { ActivateComponent } from './activate/activate.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { ScripthackComponent } from './scripthack/scripthack.component';
import { MapSidebarComponent } from './map-sidebar/map-sidebar.component';
import { ChangeMapSidebarDirective } from './directives/change-map-sidebar.directive';
import { SidebarRecommdDirective } from './directives/sidebar-recommd.directive';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComRecommendationComponent } from './booking-com-recommendation/booking-com-recommendation.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { BookingComponent } from './booking/booking.component';
import {DialogModule, WindowModule} from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ListingmanComponent } from './listingman/listingman.component';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { RoommanComponent } from './roomman/roomman.component';
import { VarDirective } from './directives/var.directive';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomepageComponent,
    SignupComponent,
    RandomComponent,
    ActivateComponent,
    TopNavigationComponent,
    ProfileComponent,
    ChatbotComponent,
    InteractiveMapComponent,
    ScripthackComponent,
    MapSidebarComponent,
    ChangeMapSidebarDirective,
    SidebarRecommdDirective,
    BookingComRecommendationComponent,
    SearchResultComponent,
    BookingComponent,
    ListingmanComponent,
    RoommanComponent,
    VarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChatModule,
    BrowserAnimationsModule,
    WindowModule,
    ButtonsModule,
    GridModule,
    PDFModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
