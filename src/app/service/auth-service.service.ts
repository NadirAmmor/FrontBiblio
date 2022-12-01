import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/User";
import * as moment from "moment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LocalStorageService } from "./local-storage-service.service";
import { environment } from "src/environments/environment";
import { ApiServiceService } from "./api-service.service";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiServiceService) {
    const token = localStorage.getItem("profanis_auth");
    this._isLoggedIn$.next(!!token);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem("profanis_auth", response.token);
      })
    );
  }
}
