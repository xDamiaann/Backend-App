import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/admin/admin-service.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {
  idAdmin: any;
  admin: any;
  isFormDisabled: boolean = true;  // Estado para habilitar/deshabilitar el formulario
  showPassword: boolean = false;  // Estado para mostrar/ocultar la contraseña

  constructor(private adminService: AdminServiceService, private router: Router, private toastr: ToastrService) { }

  username: string = '';
  adminForm!: FormGroup;

  ngOnInit(): void {
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.username = admin ? admin.username : '';
      this.idAdmin = admin ? admin.id : '';
      this.cargarDatosAdmin();
    }
  }

  cargarDatosAdmin() {
    this.adminService.getAdminInfoId(this.idAdmin).subscribe(
      data => {
        this.admin = data;
        console.log("datos del admin", this.admin);
      },
      error => {
        console.error('Error al cargar los datos del admin:', error);
      }
    );
  }

  AlertaSucess(msj: string) {
    console.log("alerta", msj);
    this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  }

  AlertaFail(msj: string) {
    this.toastr.error(msj, 'Error', { timeOut: 4000 });
  }

  enableForm() {
    this.isFormDisabled = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get passwordFieldType() {
    return this.showPassword ? 'text' : 'password';
  }

  onSubmit(form: any) {
    if (form.valid) {
      const adminData = { ...form.value, id_admin: this.idAdmin };
      this.adminService.updateAdmin(this.idAdmin, adminData).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          this.isFormDisabled = true;
          this.AlertaSucess('Datos del admin actualizados correctamente');
        },
        error => {
          console.error('Error al actualizar los datos del admin:', error);
          this.AlertaFail('Error al actualizar los datos del admin');
        }
      );
    }
  }
}
