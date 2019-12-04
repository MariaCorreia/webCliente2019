import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})

export class EditarReservaComponent implements OnInit {
  cfg = new Config();
  id : any;
  form : any;

  erro = false;
  erroSource : any;
  erroAmbiente: any;
  erroUsuario: any;

  constructor(
    private actRoute: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    public route: Router,
    public api: ApiService) { }

  ngOnInit() {
    this.getReserva();
  }

  getReserva(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.api.getReserva(id).then((r:any) => {
      r.usuario = r.usuario.id;
      r.ambiente = r.ambiente.id;
      this.form = r;
      console.log(r);
    });
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
        this.route.navigate(["/admin"]);
      })
    }
  }

  timeCollision(start, end, target){
    return start.getTime() < target.getTime() && target.getTime() < end.getTime();
  }

  goBack(): void {
    this.location.back();
  }

  hideError(){
    this.erro = false;
  }

}
