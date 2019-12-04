import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-reserva',
  templateUrl: './administrar-reserva.component.html',
  styleUrls: ['./administrar-reserva.component.css']
})
export class AdministrarReservaComponent implements OnInit {
  cfg = new Config();

  constructor(private http: HttpClient,public api: ApiService, public router: Router) { }

  ngOnInit() {
    this.api.getReservas();
  }
  deletar(reserva){
    this.api.deletarReserva(reserva).then(r => {
      this.router.navigate(["/admin"]);
    });
  }

}
