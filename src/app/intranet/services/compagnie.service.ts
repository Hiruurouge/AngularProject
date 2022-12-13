import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, deleteDoc, setDoc} from '@angular/fire/firestore';
import { AvionI, PersonnelI, VolI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {
  
  vols:Array<VolI> = [];
  avions:Array<AvionI> = [];
  personnels:Array<PersonnelI> = [];
  listeAvions:Array<{id: string, data: AvionI}>=[];




  constructor(private readonly http:HttpClient, private bdd:Firestore) {
    this.getVols()
    this.getFireAvs()
    this.getFirePersonnel()
   }

  /** 
  * Récupération des données de vols
  **/
  getVols(){
  this.http.get<Array<VolI>>("assets/data/vols.json").subscribe(p =>{
    console.log("Donnée retourné depuis le fichier json",p);
    this.vols = p 
    })
  }

   /** 
  * Récupération des données de avions
  **/

  getAvions(){
    this.http.get<Array<AvionI>>("assets/data/avions.json").subscribe(a =>{
      console.log("Donnée retourné depuis le fichier json",a);
      this.avions = a 
    })
  }

  /** 
  * Récupération des données de personels
  **/
  async getFirePersonnel() {
    console.log(this.bdd)
    await getDocs(collection(this.bdd, 'personnels'))
    .then(pe => {
      console.log(pe);
      pe.forEach(p => {
        this.personnels.push(p.data() as PersonnelI);
      })
    })
    .catch(erreur => console.log("Erreur", erreur));
  }
  /** Requete pour récupérer une collection */
  async getFireAvs(){
    await getDocs(collection(this.bdd, 'avions'))
    .then(av => {
      console.log(av);
      av.forEach(a => {
        console.log(a.id, a.data());
        this.listeAvions.push({id:a.id, data:a.data() as AvionI}); 
        this.avions.push(a.data() as AvionI);
        console.log(this.listeAvions)
      })
    })
    .catch(erreur => console.log("Erreur", erreur));
  }

  /** Recuperer un avion à partir de son code */
  async getFireAvions(code : string){
    const docAvion = doc(this.bdd, "avions", code);
    await getDoc(docAvion);
  }

  /** delete un avion à partir de son code */
  async delFireAvions(code : string){
    const docAvion = doc(this.bdd, "avions", code);
    await deleteDoc(docAvion);
  }

  /** Recuperer un avion à partir de son code */
  async updateFireAvions(code : string, data: AvionI){
    const docAvion = doc(this.bdd, "avions", code);
    await setDoc(docAvion, data, {merge:true});
  }

}
