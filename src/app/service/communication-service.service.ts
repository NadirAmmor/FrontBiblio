import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DocumentsToEdit } from "../model/documents";
import { UserAfterLogin, UserToRegister } from "../models/UserToRegister";

@Injectable({
  providedIn: "root",
})
export class CommunicationServiceService {
  constructor() {}

  private userAfterLogin = new Subject<UserAfterLogin>();
  private savedUser$ = this.userAfterLogin.asObservable();

  private editDocumentSource = new Subject<DocumentsToEdit>();
  private editDocument$ = this.editDocumentSource.asObservable();

  setAfterLoginUser(afterLoginUser: UserAfterLogin): void {
    this.userAfterLogin.next(afterLoginUser);
  }

  getAfterLoginUser(): Observable<UserAfterLogin> {
    return this.savedUser$;
  }

  setEditDocument(documentToEdit: DocumentsToEdit) {
    this.editDocumentSource.next(documentToEdit);
  }

  getEditDocument(): Observable<DocumentsToEdit> {
    return this.editDocument$;
  }
}
