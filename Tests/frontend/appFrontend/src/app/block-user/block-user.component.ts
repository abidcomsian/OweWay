import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrl: './block-user.component.css'
})
export class BlockUserComponent {
  blockedUsers: any[] = [];

  // Columns should always be shown
  showColumns: { [key: string]: boolean } = {
    id: true,
    name: true,
    email: true,
    admin: true,
    blocked: true
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBlockedUsers();
  }

  loadBlockedUsers(): void {
    this.http.get<any[]>('http://localhost:54303/api/users/blocked').subscribe(
      data => {
        // Map response to match your expected keys
        this.blockedUsers = data.map(user => ({
          id: user.Id,
          name: user.Name,
          email: user.Email,
          admin: user.Admin,
          blocked: user.Block
        }));
      },
      error => {
        console.error('Failed to load blocked users', error);
      }
    );
  }

  // Don’t allow column toggling in this component!
}
