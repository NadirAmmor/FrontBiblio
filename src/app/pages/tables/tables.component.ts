import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Documents, DocumentsToAdd } from 'src/app/model/documents';
import { Thematique } from 'src/app/model/thematique';
import { DocumentsService } from 'src/app/service/documents.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  documentToAdd : DocumentsToAdd = new DocumentsToAdd();
  documentList: any;
  selectedFile : File = null;
  filedata = new FormData();
  file : any = null ;
  user : any ;
  thematique : string;
  visi : Boolean ; 
  thematiques: Thematique[] = [];
  thematiqueTable : Thematique ; 

  constructor(private service:DocumentsService,
    private router:Router) { 
    this.getDocuments();
  }

  ngOnInit() {
    this.service.getThematique().subscribe((resp: Thematique) => {
      this.thematiques.push(resp);
      this.thematiqueTable = this.thematiques[0];
      console.log("hello", this.thematiqueTable);
    });
  }



  getDocuments(){
    this.service.getDocuments().subscribe(result =>{
      console.log("zabiii"+result);
      this.documentList = result;
    });
  }

   /* addForm(documentAddFrom:NgForm){
      this.fieldata.append('user', documentAddFrom.value.userName);

     this.file = this.filedata,
        this.user = documentAddFrom.value.userName,
        this.thematique = documentAddFrom.value.thematique,
        this.visi = true ;
        console.log("wa maymkensh",this.file, this.user , this.thematique , this.visi)

        this.service.postDocuments().subscribe((response: any) => {
        console.log("hahia" , response);
        this.documentList.push(response);  
        window.location.reload();
    });
    }*/

    saveDomcument(formData:FormData){
      this.service.createDocument(formData).subscribe(response => {
        alert('succes'+response);
      })
    }

    onSubmit(form:NgForm){

      const visi= "false";
      this.filedata.append('file',this.selectedFile);
      this.filedata.append('user',form.value.userName);
      this.filedata.append('thematique',form.value.thematique);
      this.filedata.append('visi', visi);
      
      this.filedata.append('documentToAdd',new Blob([JSON.stringify(this.documentToAdd)],
                  {
                    type :'application/json',
                  }
      ));
      console.log("hhahahah"+this.filedata)
      this.saveDomcument(this.filedata);
      window.location.reload();
    } 

    onFileChange(event) {
      this.selectedFile=<File>event.target.files[0];
      console.log("selected file",this.selectedFile );
    }

   /* onUpload(){
      this.filedata.append('file',this.selectedFile ,this.selectedFile.name);
      
    }*/

   
    
  }


