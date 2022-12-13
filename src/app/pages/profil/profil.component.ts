import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserI } from 'src/app/modeles/id-i';
import { PagesService } from 'src/app/services/pages.service';
import { UService } from 'src/app/services/u.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user:UserI=<UserI>{};
  constructor(public pp:PagesService,public auth:Auth,private us:UService) { }
  getUser():void {
    this.us.getFireUser(this.auth.currentUser?.uid as string).then(d=>this.user=d); 
  }
  /** Mettre à jour notre avion */
  updateUser() {
    this.us.updateFireUser(this.auth.currentUser?.uid as string,this.user);
    console.log("l'avion va être mis a jour ici");
  } 
  ngOnInit(): void {
    this.getUser()
    console.log(this.pp.profil)
  }

}
