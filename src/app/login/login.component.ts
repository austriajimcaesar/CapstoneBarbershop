import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  constructor(private ds:DataService, private router:Router, public formBuilder: FormBuilder) { }

  ngOnInit(){
    this.form = this.formBuilder.group({ 
      'login_username': [null, [Validators.required]],
      'login_password': [null, [Validators.required]],
    }); 
  }

  loginData: any = {}
  a: any = {};

  onSubmit(){
    if(this.form.valid){
      this.login();
    }else{
      Swal.fire({
        title: 'Invalid Inputs!',
        icon: 'error',
      confirmButtonText: "Confirm",
      })
    }
  }

  login() {
    this.loginData.admin_username = this.form.get("login_username").value;
    this.loginData.admin_password = this.form.get("login_password").value;
 
    this.ds.sendApiRequest("loginadmin/", this.loginData).subscribe(async (data: any) => {
      this.a = data.payload;  

      // this.storage.set('barbers_id', this.a.barbers_id)
      //  this.storage.set('barbers_username', this.a.barbers_username)
      //  this.storage.set('barbers_fname', this.a.barbers_fname)
      //  this.storage.set('barbers_lname', this.a.barbers_lname)
     
      window.sessionStorage.setItem('admin_id', this.a.admin_id);
      window.sessionStorage.setItem('admin_username', this.a.admin_username);

     if(this.a.admin_id != null && this.a.admin_username != null) {
          this.ds.setLogin();
          Swal.fire({
            title: 'Welcome!',
            icon: 'success',
          confirmButtonText: "Confirm",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          Swal.fire({
            title: 'Incorrect Username or Password!',
            icon: 'error',
          confirmButtonText: "Confirm",
          })
        }
      
      
    }, (err: any) => {
      console.log(err.error.status.message)
      if(err.error.status.message == 'Incorrect Password') {
        Swal.fire({
          title: 'Incorrect Password. Please try again.',
          icon: 'error',
          confirmButtonText: "Confirm",
        });
      }
      
      if(err.error.status.message == 'User does not exist') {
        Swal.fire({
          title: 'There is no such User!',
          icon: 'error',
          confirmButtonText: "Confirm",
        });
      }
    }
    );
  }

}