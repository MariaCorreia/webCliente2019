import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrar-usuario',
  templateUrl: './administrar-usuario.component.html',
  styleUrls: ['./administrar-usuario.component.css']
})
export class AdministrarUsuarioComponent implements OnInit {
  cfg = new Config();
  usuarios:any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(this.cfg.api+"/usuarios").toPromise().then(r =>{
      // console.log(r);
      this.usuarios = r;
    });
  }

}
