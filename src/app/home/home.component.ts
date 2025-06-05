import { Component } from '@angular/core';
import { ListaPersonagensComponent } from '../personagens/lista-personagens/lista-personagens.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListaPersonagensComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
