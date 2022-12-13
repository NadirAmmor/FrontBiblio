import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Documents,
  DocumentsToAdd,
  DocumentsToEdit,
} from "src/app/model/documents";
import { Thematique } from "src/app/model/thematique";
import { UserAfterLogin } from "src/app/models/UserToRegister";
import { CommunicationServiceService } from "src/app/service/communication-service.service";
import { DocumentsService } from "src/app/service/documents.service";
import { saveAs } from "file-saver";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { prototype } from "events";
import * as FileSaver from "file-saver";
import { element } from "protractor";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  documentToAdd: DocumentsToAdd = new DocumentsToAdd();

  documentList: any;

  documentTable: Documents[];
  documentToEdit: DocumentsToEdit;
  selectedFile: File = null;
  filedata = new FormData();
  file: any = null;
  user: string;
  thematique: string;
  visi: Boolean;

  thematiques: Thematique[] = [];
  thematiqueTable: Thematique;
  selectThematique: Thematique;

  showModal = false;
  thematiqueTest: string;
  documentId: string;
  documentEdit: any;

  @Output() onClickEdit = new EventEmitter<any>();
  @ViewChild("form") formm: NgForm;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(
    private service: DocumentsService,
    private router: Router,
    private serviceCommunication: CommunicationServiceService,
    private route: ActivatedRoute
   ,config: NgbModalConfig, private modalService: NgbModal) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit() {
    this.service.getThematique().subscribe((resp: Thematique) => {
      this.thematiques.push(resp);
      this.thematiqueTable = this.thematiques[0];
    });

    this.getDocuments();
  }
  get selectedDocuments(): DocumentsToAdd {
    return this.service.selectedDocuments;
  }

  set selectedDocuments(value: DocumentsToAdd) {
    this.service.selectedDocuments = value;
  }
  getDocuments() {
    this.service.getDocuments().subscribe((result) => {
      this.documentList = result;
    });
  }

  deleteFile(id: string) {
    this.service.deleteDocument(id).subscribe((response) => {
      this.getDocuments();
    });
  }

  downloadFile(file: any) {
    const byteCharacters = atob(file.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: file.fileType });
    saveAs(blob, file.titre);
  }
  editFile(element) {
    this.showModal = !this.showModal;
  }

  saveDomcument(formData: FormData) {
    this.service.createDocument(formData).subscribe((response) => {
      alert("succes" + response);
    });
  }

  onSubmit(form: NgForm) {
    this.serviceCommunication.getAfterLoginUser().subscribe((response) => {
      this.user = JSON.stringify({ response });
    });

    this.filedata.append("file", this.selectedFile);
    this.filedata.append("user", this.user);
    this.filedata.append("them", form.value.thematique);
    this.filedata.append("visi", "false");
    console.log("hello", form.value.thematique);

    this.saveDomcument(this.filedata);

    this.getDocuments();
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
    //console.log("zab", this.selectedFile);
  }

  onClick(element,content) {
    this.selectedDocuments = element;
    console.log(this.selectedDocuments);
    this.modalService.open(content);
  }
  close() {
    console.log(this.selectedDocuments);
    this.modalService.dismissAll;
  }
}

/* onUpload(){
      this.filedata.append('file',this.selectedFile ,this.selectedFile.name);
      
    }*/

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
        
    });
    }*/
