import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../../../backend/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.createSignInForm();
  }

  createSignInForm(){
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  signIn() {
    const signInData = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }
    this.authService.signIn(signInData);
  }
}
