import { Component, OnInit } from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Universite } from "src/app/models/Universite";
import { UserToRegister } from "src/app/models/UserToRegister";
import { ApiServiceService } from "src/app/service/api-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userToRegister: UserToRegister;
  universites: Universite[] = [];
  universiteTable: Universite;
  constructor(private service: ApiServiceService, private router: Router) {}

  ngOnInit() {
    this.service.getUniversites().subscribe((resp: Universite) => {
      this.universites.push(resp);
      this.universiteTable = this.universites[0];
      console.log("hello", this.universiteTable);
    });
  }

  register(registerForm: NgForm) {
    this.userToRegister = {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      phone: registerForm.value.phone,
      universite: {
        libelle: registerForm.value.libelle,
      },
      role: {
        id: "2",
        name: "user",
      },
    };
    this.service.register(this.userToRegister).subscribe((response: any) => {
      console.log(response);
    });
    this.router.navigate(["/user-profile"]);
  }
}
