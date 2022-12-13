import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Documents, DocumentsToAdd } from "../model/documents";
@Injectable({
  providedIn: "root",
})
export class DocumentsService {
  selectedFile: File = null;
  filedata = new FormData();
  private _selectedDocuments: DocumentsToAdd;

  constructor(private http: HttpClient) {}

  get selectedDocuments(): DocumentsToAdd {
    if (this._selectedDocuments == null) {
      this._selectedDocuments = new DocumentsToAdd();
    }
    return this._selectedDocuments;
  }

  set selectedDocuments(value: DocumentsToAdd) {
    this._selectedDocuments = value;
  }
  getDocuments() {
    return this.http.get("http://localhost:8036/api/document/");
  }

  getThematique() {
    return this.http.get("http://localhost:8036/api/thematique/");
  }
  deleteDocument(id: string) {
    return this.http.delete(`http://localhost:8036/api/document/${id}/`);
  }
  //`${environment.apiUrl}demande/${id}`

  createDocument(formData: FormData) {
    return this.http
      .post("http://localhost:8036/api/document/upload", formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getDocumentsById(documentId: any): Observable<any> {
    return this.http.get(`http://localhost:8036/api/documentId/${documentId}/`);
  }

  download(titre: string | undefined): Observable<HttpEvent<Blob>> {
    return this.http.get(
      `http://localhost:8036/api/document/download/${titre}`,
      {
        reportProgress: true,
        observe: "events",
        responseType: "blob",
      }
    );
  }
}
