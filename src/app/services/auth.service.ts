import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly auth:Auth,private router:Router) { }
  identification(mail:string,mdp:string){
    signInWithEmailAndPassword(this.auth,mail,mdp)
    .then(d=>{
      console.log(d);
      this.router.navigateByUrl('/intranet')
  })
    .catch(e=>console.log(e));
  }
}
