import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public _usuariosService: UsuarioService, public route: Router) {
  }
  canActivate() {
   if (this._usuariosService.usuario.role === 'ADMIN_ROLE') {
     return true;
   } else {
     console.log('Bloqueado por el Admin Guard');
     this.route.navigate(['/login']);
     this._usuariosService.logout();
     return false;
   }
  }
}
