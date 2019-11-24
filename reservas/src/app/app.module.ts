import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministracaoComponent } from './administracao/administracao.component';
import { CadastroAmbienteComponent } from './cadastro-ambiente/cadastro-ambiente.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroReservaComponent } from './cadastro-reserva/cadastro-reserva.component';
import { GeralComponent } from './geral/geral.component';
import { EditarAmbienteComponent } from './editar-ambiente/editar-ambiente.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AdministrarAmbienteComponent } from './administrar-ambiente/administrar-ambiente.component';
import { AdministrarReservaComponent } from './administrar-reserva/administrar-reserva.component';
import { AdministrarUsuarioComponent } from './administrar-usuario/administrar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministracaoComponent,
    CadastroAmbienteComponent,
    CadastroUsuarioComponent,
    CadastroReservaComponent,
    GeralComponent,
    EditarAmbienteComponent,
    EditarReservaComponent,
    EditarUsuarioComponent,
    AdministrarAmbienteComponent,
    AdministrarReservaComponent,
    AdministrarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
