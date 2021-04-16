export default {
  chatRoomsUrl: "http://localhost:8080/api/rooms",
  chatDetailsUrl: (roomId) => `http://localhost:8080/api/rooms/${roomId}`,
  messagesUrl: (roomId) => `http://localhost:8080/api/rooms/${roomId}/messages`,
};
