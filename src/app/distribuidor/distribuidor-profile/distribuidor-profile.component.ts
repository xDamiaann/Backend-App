import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-distribuidor-profile',
  templateUrl: './distribuidor-profile.component.html',
  styleUrls: ['./distribuidor-profile.component.css']
})
export class DistribuidorProfileComponent implements OnInit {
  distribuidor: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('distribuidor');
    if (distribuidorJson) {
      this.distribuidor = JSON.parse(distribuidorJson);
    }
  }
}
