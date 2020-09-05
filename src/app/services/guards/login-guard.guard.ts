import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service"; // no usar el de index da error ciclico

@Injectable({
  providedIn: "root",
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}
  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log("paso por el login gard");
      return true;
    } else {
      console.log("bloqueado por el gard");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
