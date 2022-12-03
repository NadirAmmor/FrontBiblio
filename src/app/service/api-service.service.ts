import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenLogOut } from "../models/TokenLogOut";
import { User } from "../models/User";
import { UserToRegister } from "../models/UserToRegister";

@Injectable({
  providedIn: "root",
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post("http://localhost:8036/api/auth/login", user);
  }
  logout(token: TokenLogOut) {
    return this.http.post("http://localhost:8036/api/auth/logout", token);
  }

  register(userToRegister: UserToRegister) {
    return this.http.post(
      "http://localhost:8036/api/auth/signup",
      userToRegister
    );
  }
  getUniversites() {
    return this.http.get("http://localhost:8036/api/universite/all");
  }
}
