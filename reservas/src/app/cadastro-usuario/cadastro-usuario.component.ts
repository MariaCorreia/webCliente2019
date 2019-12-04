import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  form = {nome:"teste",codigo:"666"};
  cfg = new Config();
  constructor(private http:HttpClient,public route: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    //checar se já existe o código
    //se não existir cadastrar novo usuário
    console.log(this.cfg);
    this.http.post(this.cfg.api+"/usuarios",this.form).toPromise().then(r => {
      // console.log(r);
      this.route.navigate(["/admin"]);
    });
    console.log(this.form);
  }

}
