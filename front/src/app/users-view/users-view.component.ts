import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../model';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent {

  users: User[] = [];

  constructor(private apiService: ApiService, private permissionsService: PermissionsService) {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.apiService.getAllUsers().subscribe(resp => {
      this.users = resp;
    });
  }

  canCreate(): boolean {
    return this.permissionsService.permissions.includes("can_create_users");
  }

  canDelete(): boolean {
    return this.permissionsService.permissions.includes("can_delete_users");
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(resp => {
      console.log(resp);
      this.getAllUsers();
    })
  }

}
