export interface CurrentUser {
  timeStamp: number;
  userName: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  name: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  users?: string[];
}