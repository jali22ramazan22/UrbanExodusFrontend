import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink, Routes} from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
//TODO: Write hint component that dynamically shows the error message
export class RegisterComponent implements OnInit{

  registrationForm: FormGroup;

  constructor(private router: Router){

  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
        username: new FormControl('JAD', [Validators.required]),
        email: new FormControl('pivka@gmail.com', [Validators.required, Validators.email]),
        password: new FormControl('18051905', [Validators.required]),
        password_confirmation: new FormControl('18051905', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator
      })

  }

  OnSubmit() {
    this.router.navigate(['login']);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    return control.value.password === control.value.password_confirmation
      ? null : { 'PasswordNoMatch' : true };
  }
}
