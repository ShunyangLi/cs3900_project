import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SignupComponent} from './signup/signup.component';
import {ActivateComponent} from './activate/activate.component';
import {ChatbotComponent} from './chatbot/chatbot.component';
import {InteractiveMapComponent} from './interactive-map/interactive-map.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'map', component: InteractiveMapComponent},
  { path: 'chat', component: ChatbotComponent},
  {path: 'activate/:token', component: ActivateComponent},
  { path: '',   redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
