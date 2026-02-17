export interface Action {
  type: any;
  payload?: any;
}

export type LoadingType = {
  isLoading: boolean;
  isSuccess: boolean;
  isDone: boolean;
};
