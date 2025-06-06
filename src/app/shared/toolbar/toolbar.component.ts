import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormPersonagemComponent } from '../../personagens/form-personagem/form-personagem.component';
import { RickAndMortyServico } from '../../personagens/rick-and-morty.servico';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  busca = new FormControl('');

  constructor(
    public servico: RickAndMortyServico,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.busca.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((valor) => {
        if (valor) {
          this.servico.buscarPersonagens(valor);
        } else {
          this.servico.carregarPersonagens();
        }
      });
  }

  abrirNovo() {
    this.dialog.open(FormPersonagemComponent, { width: '400px' });
  }
}
