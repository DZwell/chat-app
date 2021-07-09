export interface CurrentUser {
  timeStamp: number;
  userName: string;
}

export interface ChatMessage {
  isDeleted: boolean;
  id: string;
  message: string;
  name: string;
  reaction?: number;
}

export interface ChatRoom {
  id: number;
  name: string;
  users?: string[];
}
