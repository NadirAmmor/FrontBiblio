import { RowOutlet } from "@angular/cdk/table";
import { Role } from "./Role";
import { Universite } from "./Universite";

export interface UserToRegister {
        username: string;
        email: string;
        password : string;
        phone:  string;
        universite : Universite;
        role : Role ;
}