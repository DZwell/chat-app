export interface CurrentUser {
  timeStamp: number;
  userName: string;
}

export interface ChatMessage {
  message: string;
  name: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  users?: string[];
}