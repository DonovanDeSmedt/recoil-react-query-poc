import { atom, atomFamily } from 'recoil';

export const todosState = atom({
  key: 'todos',
  default: [],
});
