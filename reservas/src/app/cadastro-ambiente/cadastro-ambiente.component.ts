import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-ambiente',
  templateUrl: './cadastro-ambiente.component.html',
  styleUrls: ['./cadastro-ambiente.component.css']
})
export class CadastroAmbienteComponent implements OnInit {
  cfg = new Config();
  form = {nome:"ambiente",descricao:"desc",lotacao:666};

  constructor(private http:HttpClient,private route: Router) { }

  ngOnInit() {
  }
  
  onSubmit(){
    //checar se já existe o código
    //se não existir cadastrar novo usuário
    console.log(this.cfg);
    this.http.post(this.cfg.api+"/ambientes",this.form).toPromise().then(r => {
      // console.log(r);
      this.route.navigate(["/admin"]);
    });
    console.log(this.form);
  }

}
