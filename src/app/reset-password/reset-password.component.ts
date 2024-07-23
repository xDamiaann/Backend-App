import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.password).subscribe(
      response => {
        this.toastr.success('Contraseña actualizada', 'Éxito');
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Error al actualizar la contraseña', 'Error');
      }
    );
  }
}
