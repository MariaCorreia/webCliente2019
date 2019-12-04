import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("navAdmin").classList.add("active");
    document.getElementById("navPrincipal").classList.remove("active");
  }

}
