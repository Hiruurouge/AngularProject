export interface IdI {
    id: string | number;
    passe: string | number;
}

export interface UserI {
    nom: string;
    prenoms:Array<string>;
    statut?:string;
}
