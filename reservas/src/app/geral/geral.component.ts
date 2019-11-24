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

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(this.cfg.api+"/usuarios").toPromise().then(r =>{
      // console.log(r);
      this.usuarios = r;
    });
  }

}
