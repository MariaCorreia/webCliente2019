import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrar-ambiente',
  templateUrl: './administrar-ambiente.component.html',
  styleUrls: ['./administrar-ambiente.component.css']
})
export class AdministrarAmbienteComponent implements OnInit {
  cfg = new Config();
  ambientes:any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(this.cfg.api+"/ambientes").toPromise().then(r =>{
      // console.log(r);
      this.ambientes = r;
    });
  }

}
