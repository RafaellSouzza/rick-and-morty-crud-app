import { Routes } from '@angular/router';
import { ListaPersonagensComponent } from './personagens/lista-personagens/lista-personagens.component';
import { DetalhePersonagemComponent } from './personagens/detalhe-personagem/detalhe-personagem.component';
import { FormPersonagemComponent } from './personagens/form-personagem/form-personagem.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personagens', component: ListaPersonagensComponent },
  { path: 'personagem/:id', component: DetalhePersonagemComponent },
  { path: 'novo', component: FormPersonagemComponent },
  { path: 'editar/:id', component: FormPersonagemComponent },
];
