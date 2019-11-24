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
    this.api.updateReserva(this.form).then(r => {
      this.route.navigate(["/"]);
    })
  }

  goBack(): void {
    this.location.back();
  }

}
