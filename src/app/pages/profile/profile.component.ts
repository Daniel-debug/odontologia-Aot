import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from "sweetalert2";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
usuario: Usuario;
imagenSubir: File;
imagenTemp: string;
  constructor(
    public _UsuarioService: UsuarioService
  ) {
    this.usuario = this._UsuarioService.usuario;
   }

  ngOnInit() {
  }
  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this._UsuarioService.actualizarUsuario(this.usuario).subscribe(res => {
        // tu codigo aqui
    });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    debugger
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    // en esta seccion del codigo obtiene el base 64 para mostrarlo en el front end
    reader.onloadend = () => {
    this.imagenTemp =  reader.result.toString();
    console.log(reader.result.toString())
    };
  }

  cambiarImagen() {
    this._UsuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
