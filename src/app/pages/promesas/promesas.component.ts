import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres().then(mensaje => console.log("Termino", mensaje))
      .catch(error => console.log("Error", error));
  }

  ngOnInit() {}
  contarTres(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          // resolve("OK!"); significa resuelta
          reject(true); // el reject manda directo al catch significa rechazada 
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
