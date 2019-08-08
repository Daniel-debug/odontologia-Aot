import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import Swal from "sweetalert2";
import { Hospital } from '../models/hospital.model';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number = 0;
  constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }
  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
   //  url += 'token';
   debugger
    return this.http.get(url).pipe(map((resp: any) => {
      debugger
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }
  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
   // url += 'token';
    return this.http.get(url).pipe(map( (res: any ) => res.hospital));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(map(resp => {
      Swal.fire('Hospital Borrado', 'Eliminado correctamente', 'success');
    }));
  }
  crearHospital(nombre: string) {
  let url = URL_SERVICIOS + '/hospital';
  url += '?token=' + this._usuarioService.token;
  return this.http.post(url, {'nombre': nombre } ).pipe(map((resp: any) =>{
     // tslint:disable-next-line: no-unused-expression
    return  resp.hospital;
  }));
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url).pipe(map((resp: any) =>{
      return resp.hospitales;
    }));
  }
  actualizarHospital(hospital: Hospital) {
  let url = URL_SERVICIOS +'/hospital/' + hospital._id;
  url += '?token='+ this._usuarioService.token;
  return this.http.put(url, hospital).pipe(map((resp: any) => {
    Swal.fire('Hospital Actualizado', hospital.nombre, 'success');
    // tslint:disable-next-line: no-unused-expression
    resp.hospital;
  }));
  }
}
