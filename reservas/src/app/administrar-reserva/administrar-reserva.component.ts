import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Component({
  selector: 'app-administrar-reserva',
  templateUrl: './administrar-reserva.component.html',
  styleUrls: ['./administrar-reserva.component.css']
})
export class AdministrarReservaComponent implements OnInit {
  cfg = new Config();
  reservas:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.cfg.api+"/reservas").toPromise().then(r => {
      console.table(r);
      this.reservas = r;
    });
  }

}
