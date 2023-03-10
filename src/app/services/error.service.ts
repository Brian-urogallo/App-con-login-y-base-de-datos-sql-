import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  msggError(e: HttpErrorResponse){
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'ERROR');
    } else {
      this.toastr.error('Upps... ha ocurrido un error inesperado', 'ERROR');
    }
  }
}
