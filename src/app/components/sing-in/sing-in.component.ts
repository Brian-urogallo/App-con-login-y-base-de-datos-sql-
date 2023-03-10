import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: Boolean = false;


  constructor(private toastr: ToastrService, 
              private _userService: UserService,
              private  router: Router,
              private _errorService: ErrorService){}

  ngOnInit(): void {
    
  }

  addUser(){
    //validar campos
    if(this.username == '' || this.password == '' || this.confirmPassword == ''){
         this.toastr.error('Todos los campos son obligatorios', 'ERROR');
      return;
    }

    //validamos passwords iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'ERROR');
      return;
    }

    // creamos el objeto
    const user: User ={
      username: this.username,
      password: this.password,
    }
    this.loading = true;
    this._userService.singIn(user).subscribe({next: (v) => {
      this.loading= false;
      this.toastr.success('Usuario agregado exitosamente', 'EXITO');
      this.router.navigate(['/login']);
    },
    error: (e: HttpErrorResponse) => {
      this.loading = false;
      this._errorService.msggError(e);
    },
    complete: () => console.info('complete') 
    })
  }
}
      
     
  
    

