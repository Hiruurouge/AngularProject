import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UService } from '../services/u.service';
import {Auth} from "@angular/fire/auth"
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private u:UService, private auth:Auth){

  }
  // Activer une route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser ? true:false;
  }
  //Activer le chargement de fichier
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser ? true:false;;
    ;
  }
}
