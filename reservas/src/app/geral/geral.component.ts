import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css']
})
export class GeralComponent implements OnInit {
  cfg = new Config();
  usuarios:any;
  ambientes:any;
  reservas:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    let pms = [];
    pms.push(this.http.get(this.cfg.api+"/usuarios").toPromise().then(r =>{
      this.usuarios = r;
    }));
    pms.push(this.http.get(this.cfg.api+"/ambientes").toPromise().then(r => {
      this.ambientes = r;
    }));
    Promise.all(pms).then(r => {
      this.http.get(this.cfg.api+"/reservas").toPromise().then(r => {
        console.table(r);
        r
        this.reservas = r;
      });
    });
  }

}
