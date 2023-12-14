import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DandelionService } from './services/dandelion.service';
import { PermissionsService } from './services/permissions.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(DandelionService).hasToken();
};

export const createGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).permissions.includes("can_create_users");
}

export const readGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).permissions.includes("can_read_users");
}

export const updateGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).permissions.includes("can_update_users");
}

export const deleteGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).permissions.includes("can_delete_users");
}
