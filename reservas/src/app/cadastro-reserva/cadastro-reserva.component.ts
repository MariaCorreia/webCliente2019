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
  form = {nome:"ambiente",descricao:"desc",lotacao:666};

  constructor(private http:HttpClient,private route: Router) { }

  ngOnInit() {
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
