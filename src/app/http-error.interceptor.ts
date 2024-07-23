import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';

                if (error.error instanceof ErrorEvent) {
                    // Client-side error
                    errorMsg = `Error: ${error.error.message}`;
                } else {
                    // Server-side error
                    if (error.status === 0) {
                        errorMsg = 'El servidor no está disponible. Por favor, intenta más tarde.';
                        this.toastr.error(errorMsg, 'Error de conexión');
                    } else {
                        errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        this.toastr.error(errorMsg, 'Error del servidor');
                    }
                }

                return throwError(errorMsg);
            })
        );
    }
}
