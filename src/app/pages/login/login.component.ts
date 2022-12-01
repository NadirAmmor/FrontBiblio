import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthServiceService } from "src/app/service/auth-service.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {}
  ngOnInit() {
    this.Signform = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  Signform: FormGroup;

  login() {
    if (this.Signform.invalid) {
      return;
    }

    this.authService
      .login(
        this.Signform.get("username")?.value,
        this.Signform.get("password")?.value
      )
      .subscribe((response) => {
        this.router.navigate(["/dashboard"]);
      });
  }
}
