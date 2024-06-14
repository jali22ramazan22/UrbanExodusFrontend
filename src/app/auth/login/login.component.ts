import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"; // Import correct modules

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(3)]), // Use FormControl, not FormGroup
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)]) // Use FormControl, not FormGroup
    });
  }



  ngOnDestroy() {

  }

  OnSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['../../home']);
    }
  }
}
