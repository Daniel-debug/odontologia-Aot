import { Injectable } from "@angular/core";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  //menu: any[] = [];
  menu: any = [
    {
      titulo: "principal",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Dashboard", url: "/dashboard" },
        { titulo: "ProgressBar", url: "/progress" },
        { titulo: "Graficas", url: "/graficas1" },
        { titulo: "promesas", url: "/promesas" },
        { titulo: "observable", url: "/rxjs" },
      ],
    },
    {
      titulo: "Mantenimientos",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        { titulo: "Usuarios", url: "/usuarios" },
        { titulo: "Hospitales", url: "/hospitales" },
        { titulo: "Médicos", url: "/medicos" },
      ],
    },
  ];
  constructor(public _usuarioService: UsuarioService) {
    //this.menu = this._usuarioService.menu;
  }
  cargarMenu() {
    return this.menu; //= this._usuarioService.menu;
  }
}
