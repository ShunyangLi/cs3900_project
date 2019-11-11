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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChatModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
