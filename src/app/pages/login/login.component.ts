import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";
import { AuthServiceService } from "src/app/service/auth-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {}

  login(form: NgForm) {
    this.user = {
      username: form.value.username,
      password: form.value.password,
    };
    this.authService.login(this.user).subscribe((response) => {
      localStorage.setItem("profanis_auth", response.accessToken);
      this.router.navigate(["/dashboard"]);
    });
  }
}
