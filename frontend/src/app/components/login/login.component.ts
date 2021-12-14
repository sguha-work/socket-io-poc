import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }
  public isValid(controlName: string) {
    return this.loginForm.get(controlName)!.invalid && this.loginForm.get(controlName)!.touched;
  }

  public login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.login(this.loginForm.value).subscribe((data)=>{

      },()=>{
        
      });
    }

  }

}
