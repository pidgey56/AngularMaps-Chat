import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoggedGuard } from './guards/logged.guard';
import { UnloggedGuard } from './guards/unlogged.guard';
import { ProfilPageComponent } from './Profil/profil-page/profil-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent, canActivate: [LoggedGuard] },
  {
    path: 'chat',
    component: ChatContainerComponent,
    canActivate: [LoggedGuard],
  },
  { path: 'profil', component: ProfilPageComponent, canActivate: [LoggedGuard]},
  { path: 'signin', component: SignInComponent, canActivate: [UnloggedGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [UnloggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
