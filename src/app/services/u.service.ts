import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';
import { Firestore, doc, getDoc,deleteDoc, setDoc} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UService {

  token: string | number = "MonTokenAvecUnValeur"; // token reçu après la connexion de l'utilisateur (enlever la chaine et mettre un ! devant token)
  user:UserI = <UserI>{}; // typé mon objet en UserI

  constructor(private router: Router,private bdd:Firestore,private auth:Auth) { 
    this.getFireUser(this.auth.currentUser?.uid as string);
  }
  async getFireUser(uid : string){
    const userDoc = doc(this.bdd, "user", uid);
    let test=await getDoc(userDoc);
    this.user= test.data() as UserI;
    return this.user;
  }
  async updateFireUser(code : string, data: UserI){
    const docUser = doc(this.bdd, "user", code);
    await setDoc(docUser, data, {merge:true});
  }
  deconnexion(){
    this.user = <UserI>{};
    this.auth.signOut();
    this.router.navigateByUrl('/')
  }
}
