import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-editar-ambiente',
  templateUrl: './editar-ambiente.component.html',
  styleUrls: ['./editar-ambiente.component.css']
})
export class EditarAmbienteComponent implements OnInit {

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
    this.getAmbiente();
  }

  getAmbiente(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.api.getAmbiente(id).then(r=>{
      this.form = r;
    });
  }

  onSubmit(){
    this.api.updateAmbiente(this.form).then(r=>{
      this.route.navigate(["/"]);
    });
  }

  goBack(): void {
    this.location.back();
  }

}




