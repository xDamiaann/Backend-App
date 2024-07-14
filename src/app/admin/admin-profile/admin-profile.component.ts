import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      this.admin = JSON.parse(adminJson);
    }
  }
}
