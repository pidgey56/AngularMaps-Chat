import { Conversation } from './conversation.model';

export class User {
  profilePicture ?: string;
  uid: string;
  email: string;
  username: string;
  conversations?: Conversation[];
}
