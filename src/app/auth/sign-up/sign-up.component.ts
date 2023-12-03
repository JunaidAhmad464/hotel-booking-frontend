import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../backend/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private authService: AuthService, 
    private fb: FormBuilder, 
    private toaster: ToastrService, 
    private router: Router
    ){}
  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm(){
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['customer']
    });
  }

  signUp(){
    const signUpData = this.signUpForm.value;
    this.authService.signUp(signUpData).subscribe({
      next: (result: any) => {
        this.router.navigate(['/room']);
        this.toaster.success("Register Successfully");
      },
      error: ({error}) =>{
        this.toaster.error(error?.message);
      }
    })
  }
}
