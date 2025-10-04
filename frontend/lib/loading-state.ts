// Global loading state to ensure animation only plays once per session
let hasLoadedOnce = false;

export const getHasLoadedOnce = (): boolean => {
  return hasLoadedOnce;
};

export const setHasLoadedOnce = (value: boolean): void => {
  hasLoadedOnce = value;
};