import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-ambiente',
  templateUrl: './administrar-ambiente.component.html',
  styleUrls: ['./administrar-ambiente.component.css']
})
export class AdministrarAmbienteComponent implements OnInit {
  cfg = new Config();
  ambientes:any;
  constructor(private http:HttpClient,public api:ApiService,private router: Router) { }

  ngOnInit() {
    this.api.getAmbientes();
  }

  deletar(ambiente){
    this.api.deletaAmbiente(ambiente).then(r => {
      this.router.navigate(["/admin"]);
    });
  }
}
