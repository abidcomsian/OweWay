import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  users: any[] = [];
  adminUsers: any[] = [];
  selectedAdminId: number | null = null;

  // To control column visibility
  showColumns: { [key: string]: boolean } = {
    id: true,
    name: true,
    email: true,
    admin: true,
    blocked: true
  };

  // To control filter (all, blocked, unblocked)
  filterStatus: string = 'all';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadAdminUsers();
  }

  // Load users based on selected filter status
  loadUsers(): void {
    this.http.get<any[]>(`http://localhost:54303/api/users?status=${this.filterStatus}`).subscribe(
      data => {
        // Map to match expected property names
        this.users = data.map(user => ({
          id: user.Id,
          name: user.Name,
          email: user.Email,
          admin: user.Admin,
          blocked: user.Block // Rename to match Angular template
        }));
      },
      error => {
        console.error('Failed to load users', error);
      }
    );
  }

  onAdminChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected admin ID:', selectedValue);
    // You can handle filtering logic here if needed
  }


  // Load admin users only for the dropdown
  loadAdminUsers(): void {
    this.http.get<any[]>('http://localhost:54303/api/users?status=all').subscribe(
      data => {
        // Assuming admin field in DB is either true or false
        this.adminUsers = data.filter(user => user.admin === true || user.Admin === true);
      },
      error => {
        console.error('Failed to load admin users', error);
      }
    );
  }

  // Updated block method
  toggleBlockUser(user: any): void {
    this.http.post<{ message: string }>(`http://localhost:54303/api/block?userId=${user.id}`, {}).subscribe(
      response => {
        console.log('Block/unblock successful:', response);

        // Show user-friendly alert
        alert(response.message);

        if (response.message === 'User blocked') {
          // Remove user from dashboard
          this.users = this.users.filter(u => u.id !== user.id);
          // Optionally navigate to BlockedUsersComponent
          this.router.navigate(['/blockedUsers']);
        } else if (response.message === 'User unblocked') {
          // Update user's block status
          user.blocked = false;
        }
      },
      error => {
        console.error('Failed to toggle block status', error);
      }
    );
  }



  // Navigate to CallSelectorComponent
  navigateToCallSelector(): void {
    this.router.navigate(['/register']);
  }

  // Toggle column visibility
  toggleColumn(column: string): void {
    this.showColumns[column] = !this.showColumns[column];
  }

  // Change filter status and reload users
  onFilterChange(newStatus: string): void {
    this.filterStatus = newStatus;
    this.loadUsers();
  }

 

}
