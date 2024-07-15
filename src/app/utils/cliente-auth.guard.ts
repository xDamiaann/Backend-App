import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';  // Asegúrate de ajustar la ruta según la ubicación de tu archivo

@Injectable({
    providedIn: 'root'
})
export class ClienteAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.authService.isClienteLoggedIn()) {
            this.router.navigate(['/cliente-home']);
            return false;
        }
        return true;
    }
}
