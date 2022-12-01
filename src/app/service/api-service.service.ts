import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
  providedIn: "root",
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post("login", { username, password });
  }

  getProducts(): Observable<User[]> {
    return this.http.get<User[]>("", {
      headers: {},
    });
  }
}
