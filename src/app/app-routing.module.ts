import { Routes } from '@angular/router';
import { ListaPersonagensComponent } from './personagens/lista-personagens.component';
import { DetalhePersonagemComponent } from './personagens/detalhe-personagem.component';
import { FormPersonagemComponent } from './personagens/form-personagem.component';


export const routes: Routes = [
  { path: '', component: ListaPersonagensComponent },
  { path: 'personagem/:id', component: DetalhePersonagemComponent },
  { path: 'novo', component: FormPersonagemComponent },
  { path: 'editar/:id', component: FormPersonagemComponent },
];
