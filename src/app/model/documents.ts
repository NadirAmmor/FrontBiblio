
export interface Documents {
  id: string;
  titre: string;
  statut: boolean;
  visibilite: boolean;
  thematique: string;
  file: File;
}

export interface DocumentsToEdit {
  id: string;
  titre: string;
  visibilite: boolean;
  thematique: string;
  file: File;
}
export class DocumentsToAdd {
  id?: string;
  file: any;
  userName: string;
  thematique: string;
  visi: boolean;

  /*  constructor(id:string,file:File,userName:string,thematique:string,visi:boolean){
        this.id = id;
        this.file = file;
        this.userName = userName;
        this.thematique = thematique;
        this.visi= visi;
    }*/
  constructor() {}
}
