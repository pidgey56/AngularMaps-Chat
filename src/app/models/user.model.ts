import { Conversation } from './conversation.model';

export class User {
  uid: string;
  email: string;
  username: string;
  conversations?: Conversation[];
}
