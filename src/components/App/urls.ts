export const chatRoomsUrl = 'http://localhost:8080/api/rooms';
export const chatDetailsUrl = (roomId: number): string => `http://localhost:8080/api/rooms/${roomId}`;
export const messagesUrl = (roomId: number): string => `http://localhost:8080/api/rooms/${roomId}/messages`;
export const reactionUrl = (roomId: number, messageId: string): string =>
  `http://localhost:8080/api/rooms/${roomId}/messages/${messageId}`;
