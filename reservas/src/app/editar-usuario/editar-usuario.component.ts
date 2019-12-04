import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {

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
    this.getUsuario();
  }

  getUsuario(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.api.getUsuario(id).then(r=>{
      this.form = r;
    });
  }

  onSubmit(){

    this.api.updateUsuario(this.form).then(r=>{
      this.route.navigate(["/admin"]);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
