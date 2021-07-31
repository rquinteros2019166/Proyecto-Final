import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/session/login/login.component';
import { NavbarComponent } from './components/headers/navbar/navbar.component';
import { RegisterComponent } from './components/session/register/register.component';
import { AdminComponent } from './components/panel/admin/admin.component';
import { EventsComponent } from './components/user/events/events.component';
import { UserComponent } from './components/panel/user/user.component';
import { LogoutComponent } from './components/session/logout/logout.component';
import { ProfileComponent } from './components/session/profile/profile.component';
import { PostsComponent } from './components/admin/posts/posts.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch : 'full'},
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:tipo', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'client', component: UserComponent},
  { path: 'client/events', component: EventsComponent},
  { path: 'client/events/:tipo', component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
