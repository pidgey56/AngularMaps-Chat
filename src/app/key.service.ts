import { Injectable } from '@angular/core';
import { AuthentificationService } from './service/authentification.service';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  constructor(private authService: AuthentificationService) {}

  generateKey(input?: string): string {
    if (input === 'self') {
      return 'self';
    }
    let key =
      Date.now().toString() + this.authService.currentUser().uid + input;
    return key;
  }
}
