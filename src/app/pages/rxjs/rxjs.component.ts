import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";
@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
 susbcription: Subscription;
  constructor() {
    // this.regresaObservable().pipe(retry(2));
    this.susbcription = this.regresaObservable().subscribe(
      (numero: number) => console.log('sub', numero), // asi se le hace para retornar 2 variables espisificar
      error => console.error('error en el obs', error),
      () => console.log('el observador termino!')
    );
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }
  regresaObservable(): Observable <any> {
    // tslint:disable-next-line: no-unused-expression
    return  new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };



        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map(resp => //{
        resp.valor
       // return resp.valor;
      //}
      ), filter( (valor: any, index) => {
        // console.log('Filter', valor, index);
        if ((valor % 2  ) === 1) {
          // impar
          return true;
        } else{
          // par
          return false;
        }
      }));
  }
}
