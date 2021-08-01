import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/session/login/login.component';
import { NavbarComponent } from './components/headers/navbar/navbar.component';
import { RegisterComponent } from './components/session/register/register.component';
import { EventsComponent } from './components/user/events/events.component';
import { LogoutComponent } from './components/session/logout/logout.component';
import { ProfileComponent } from './components/session/profile/profile.component';
import { PostsComponent } from './components/admin/posts/posts.component';
import { UsersComponent } from './components/admin/users/users.component';
import { EventsadminComponent } from './components/admin/eventsadmin/eventsadmin.component';
import { PostComponent } from './components/user/post/post.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch : 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'post/:idPost', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:tipo', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'admin/posts', component: PostsComponent},
  { path: 'admin/users', component: UsersComponent},
  { path: 'admin/events', component: EventsadminComponent},
  { path: 'client/events', component: EventsComponent},
  { path: 'client/events/:tipo', component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
