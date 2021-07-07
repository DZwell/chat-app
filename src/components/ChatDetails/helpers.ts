import { CurrentUser } from '../App/interfaces';

const userKey = (user: string, index: number): string => `${user}-${index}`;
const userClass = (user: string, currentUser: CurrentUser): string => user === currentUser.userName ? 'currentUser' : '';
const userText = (user: string, usersInRoom: string[], index: number): string => index !== usersInRoom.length - 1 ? `${user}, ` : user;

export {
  userClass,
  userKey,
  userText
}