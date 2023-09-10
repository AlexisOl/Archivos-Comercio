import { CanActivateFn } from '@angular/router';

export const utilsGuard: CanActivateFn = (route, state) => {
  return true;
};
