import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common'; // se encarga del ng uf etc ng for
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  imports: [
    //CommonModule
  ],
  declarations: [ImagenPipe],
 
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
