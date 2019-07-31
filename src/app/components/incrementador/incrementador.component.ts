import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda: string = 'Leyenda';
  @Input()  progreso: number = 50;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtprogress', {static: false} ) txtProgress: ElementRef; // agarra el elemento de un elemento como objecto
  constructor() { 
    console.log('leyenda', this.leyenda);
    console.log('progreso', this.progreso);
  }

  ngOnInit() {
  }

  cambiarValor(valor ) {
    if ( this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 ) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

  onchanges(newValue: number){
    // let elemHTML: any = document.getElementsByName('progreso')[0]; //agarra el elemento del dom como tal


    if( newValue >= 100){
      this.progreso = 100;
    } else if (newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }
}
