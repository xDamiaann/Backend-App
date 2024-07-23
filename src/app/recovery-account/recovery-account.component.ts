import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recovery-account',
  templateUrl: './recovery-account.component.html',
  styleUrls: ['./recovery-account.component.css']
})
export class RecoveryAccountComponent implements OnInit {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.recoverAccount(this.email).subscribe(
      response => {
        this.toastr.success('Correo enviado', 'Revisa tu correo para recuperar tu cuenta');
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Error al enviar el correo', 'Error');
      }
    );
  }
}
