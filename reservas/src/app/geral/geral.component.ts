import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css']
})
export class GeralComponent implements OnInit {
  cfg = new Config();
  usuarios: any;
  ambientes: any;
  reservas: any;
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getReservas().then(r => {
      this.usuarios = this.api.usuarios;
      this.ambientes = this.api.ambientes;
      this.reservas = this.api.reservas;
    });

    document.getElementById("navPrincipal").classList.add("active");
    document.getElementById("navAdmin").classList.remove("active");
  }
}
