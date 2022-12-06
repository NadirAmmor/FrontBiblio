import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Documents, DocumentsToAdd } from '../model/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  selectedFile : File = null;
  filedata = new FormData();

  constructor(private http: HttpClient) { }

  getDocuments(){
    return this.http.get('http://localhost:8036/api/document/all');
  }

  getThematique(){
    return this.http.get('http://localhost:8036/api/thematique/');
  }

  createDocument(formData:FormData){
    return this.http.post('http://localhost:8036/api/document/upload',formData)
          .pipe(map((data:any) => {
            return data;
          }));
  }

 
}
