import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/User";
import * as moment from "moment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LocalStorageService } from "./local-storage-service.service";
import { environment } from "src/environments/environment";
import { ApiServiceService } from "./api-service.service";
import { TokenLogOut } from "../models/TokenLogOut";

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
  tokenToLog: TokenLogOut;

  constructor(private apiService: ApiServiceService) {
    const token = localStorage.getItem("profanis_auth");
    this._isLoggedIn$.next(!!token);
  }

  login(user: User) {
    return this.apiService.login(user).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        //localStorage.setItem("profanis_auth", response.accessToken);
        this.tokenToLog = {
          User: user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
        console.log();
      })
    );
  }


  logout() {
    return this.apiService.logout(this.tokenToLog);
  }
}
