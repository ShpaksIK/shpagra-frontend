import { instance } from '.';

export const userAPI = {
  auth() {
    return instance.get('user');
  },
};
