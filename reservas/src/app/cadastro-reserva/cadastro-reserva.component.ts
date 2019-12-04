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
  form = {id:null, usuario: null, ambiente: null, inicio:0,final:0};
  
  id : any;
  // form : any;

  erro = false;
  erroSource : any;
  erroAmbiente: any;
  erroUsuario: any;
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
    this.erro = false;
    
    for(const res of this.api.reservas){
      if(this.form.id == res.id){continue;}
      
      let erroInicio = new Date(res.inicio);
      let erroFim = new Date(res.final);
      let atualInicio = new Date(this.form.inicio);
      let atualFim = new Date(this.form.final);
      
      if(res.usuario.id == this.form.usuario){
        if(this.timeCollision(atualInicio, atualFim, erroInicio) ||
          this.timeCollision(atualInicio, atualFim, erroFim) ||
          this.timeCollision(erroInicio, erroFim, atualInicio) ||
          this.timeCollision(erroInicio, erroFim, atualFim)){
          this.erro = true;
          this.erroAmbiente = null;
          this.erroUsuario = true;
          this.erroSource = res;
          break;
        }
      }
      if(res.ambiente.id == this.form.ambiente){
        if(this.timeCollision(atualInicio, atualFim, erroInicio) ||
        this.timeCollision(atualInicio, atualFim, erroFim) ||
        this.timeCollision(erroInicio, erroFim, atualInicio) ||
        this.timeCollision(erroInicio, erroFim, atualInicio)){
          this.erro = true;
          this.erroAmbiente = true;
          this.erroUsuario = false;
          this.erroSource = res;
          break;
        }
      }
    };

    if(!this.erro){
      this.api.updateReserva(this.form).then(r => {
        this.route.navigate(["/"]);
      })
    }
  }

  timeCollision(start, end, target){
    return start.getTime() < target.getTime() && target.getTime() < end.getTime();
  }

  hideError(){
    this.erro = false;
  }
}
