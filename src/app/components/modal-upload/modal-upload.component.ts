import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
   imagenSubir: File;
   imagenTemp: string;
  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService :ModalUploadService) {
    console.log('modal listo');
   }

  ngOnInit() {
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
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
    console.log(reader.result.toString());
    };
  }
  subirImagen(){
  this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
  .then(resp => {
    this._modalUploadService.notificacion.emit(resp);
    this.cerrarModal();
  }).catch( err =>{
  console.log('Error en la carga....');
  });
  }

}
