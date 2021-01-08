import { message } from './message.model';

export interface chat {
  messages: message[];
  keyConv: string;
}
