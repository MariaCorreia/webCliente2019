import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeralComponent } from './geral/geral.component';
import { CadastroAmbienteComponent } from './cadastro-ambiente/cadastro-ambiente.component';
import { CadastroReservaComponent } from './cadastro-reserva/cadastro-reserva.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { EditarAmbienteComponent } from './editar-ambiente/editar-ambiente.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AdministracaoComponent } from './administracao/administracao.component';


const routes: Routes = [
  { path: '', component: GeralComponent },
  { path: 'cadastro_ambiente', component: CadastroAmbienteComponent },
  { path: 'cadastro_reserva', component: CadastroReservaComponent},
  { path: 'cadastro_usuario', component: CadastroUsuarioComponent},
  { path: 'editar_ambiente/:id', component: EditarAmbienteComponent},
  { path: 'editar_reserva/:id', component: EditarReservaComponent},
  { path: 'editar_usuario/:id', component: EditarUsuarioComponent},
  { path: 'admin', component: AdministracaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
