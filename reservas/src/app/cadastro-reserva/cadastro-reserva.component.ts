import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cadastro-reserva',
  templateUrl: './cadastro-reserva.component.html',
  styleUrls: ['./cadastro-reserva.component.css']
})
export class CadastroReservaComponent implements OnInit {
  cfg = new Config();
  form = {inicio:0,final:0};
  constructor(private http:HttpClient,private route: Router, public api: ApiService) { }

  ngOnInit() {
    this.api.getUsuarios();
    this.api.getAmbientes();
    // let pms = [];
    // pms.push(this.http.get(this.cfg.api+"/usuarios").toPromise().then(r => {
    //   this.usuarios = r;
    // }));
    // pms.push(this.http.get(this.cfg.api+"/ambientes").toPromise().then(r => {
    //   this.ambientes = r;
    // }));
    // Promise.all(pms).then(r => {
    //   console.log(r);
    // });
  }
  
  onSubmit(){
    console.log(this.cfg);
    this.api.saveReserva(this.form).then(r=>{
      this.route.navigate(["/"]);
    });
  }
}
