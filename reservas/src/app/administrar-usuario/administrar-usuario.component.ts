import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-usuario',
  templateUrl: './administrar-usuario.component.html',
  styleUrls: ['./administrar-usuario.component.css']
})
export class AdministrarUsuarioComponent implements OnInit {
  cfg = new Config();
  usuarios:any;

  constructor(private http:HttpClient,public api:ApiService,private router: Router) { }

  ngOnInit() {
    this.api.getUsuarios();
  }
  deletar(usuario){
    this.api.deletaUsuario(usuario).then(r => {
      this.router.navigate(["/admin"]);
      // console.log(r);
    });
  }
}
