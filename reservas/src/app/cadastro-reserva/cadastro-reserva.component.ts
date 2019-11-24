import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-reserva',
  templateUrl: './cadastro-reserva.component.html',
  styleUrls: ['./cadastro-reserva.component.css']
})
export class CadastroReservaComponent implements OnInit {
  cfg = new Config();
  form = {inicio:0,final:0};
  usuarios:any;
  ambientes:any;
  constructor(private http:HttpClient,private route: Router) { }

  ngOnInit() {
    let pms = [];
    pms.push(this.http.get(this.cfg.api+"/usuarios").toPromise().then(r => {
      this.usuarios = r;
    }));
    pms.push(this.http.get(this.cfg.api+"/ambientes").toPromise().then(r => {
      this.ambientes = r;
    }));
    Promise.all(pms).then(r => {
      console.log(r);
    });
  }
  
  onSubmit(){
    //checar se já existe o código
    //se não existir cadastrar novo usuário
    console.log(this.cfg);
    this.http.post(this.cfg.api+"/reservas",this.form).toPromise().then(r => {
      // console.log(r);
      this.route.navigate(["/"]);
    });
    console.log(this.form);
  }
}
