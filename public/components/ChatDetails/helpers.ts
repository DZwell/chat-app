import { CurrentUser } from '../App/App';

const userKey = (user: string, index: number) => `${user}-${index}`;
const userClass = (user: string, currentUser: CurrentUser) => user === currentUser.userName ? 'currentUser' : '';
const userText = (user: string, usersInRoom: string[], index: number) => index !== usersInRoom.length - 1 ? `${user}, ` : user;

export {
  userClass,
  userKey,
  userText
}