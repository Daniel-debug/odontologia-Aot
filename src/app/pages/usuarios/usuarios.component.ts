import { Component, OnInit } from "@angular/core";
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from "src/app/services/services.index";
import Swal from "sweetalert2";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuario();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuario());
  }

  mostrarModal(id : string) {
    this._modalUploadService.mostrarModal( 'usuarios', id);
  } 
  cargarUsuario() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.cargando = false;
      this.refrescarPaginador();
    });
  }

   refrescarPaginador(){
    if(this.usuarios.length <= 0 && this.desde > 0 ){
      this.desde += -5;
      this.cargarUsuario();
    }
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuario();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuario();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: any) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire(
        "No se pudo borrar el usuario",
        "No se puede borrar a si mismo",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Estas seguro?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then(result => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(resp => {
          this.cargarUsuario();
        });
      }
    });
  }


  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
