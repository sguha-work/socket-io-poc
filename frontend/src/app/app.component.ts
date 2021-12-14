import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['/home'])
    } else {
      this.router.navigate(['/login'])
    }
  }
}
