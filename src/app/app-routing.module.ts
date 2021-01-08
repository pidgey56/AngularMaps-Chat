import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NewChatComponent } from './new-chat/new-chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'chat', component: ChatContainerComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'newChat', component: NewChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
