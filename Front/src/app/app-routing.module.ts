import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/panel/admin/admin.component';
import { EventsComponent } from './components/events/events.component';
import { UserComponent } from './components/panel/user/user.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch : 'full'},
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:tipo', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'client', component: UserComponent},
  { path: 'client/:type', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
