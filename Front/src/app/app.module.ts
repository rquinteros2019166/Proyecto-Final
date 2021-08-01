import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/headers/navbar/navbar.component';
import { RegisterComponent } from './components/session/register/register.component';
import { LoginComponent } from './components/session/login/login.component';
import { ProfileComponent } from './components/session/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/panel/user/user.component';
import { AdminComponent } from './components/panel/admin/admin.component';
import { EventsComponent } from './components/user/events/events.component';
import { AdminHeaderComponent } from './components/headers/admin-header/admin-header.component';
import { UserHeaderComponent } from './components/headers/user-header/user-header.component';
import { LogoutComponent } from './components/session/logout/logout.component';
import { PostsComponent } from './components/admin/posts/posts.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PostComponent } from './components/user/post/post.component';
import { UsersComponent } from './components/admin/users/users.component';
import { StartComponent } from './components/user/start/start.component';
import { EventsadminComponent } from './components/admin/eventsadmin/eventsadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    EventsComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    LogoutComponent,
    PostsComponent,
    PostComponent,
    UsersComponent,
    StartComponent,
    EventsadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
