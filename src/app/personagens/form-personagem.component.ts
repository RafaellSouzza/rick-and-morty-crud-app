import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { RickAndMortyServico } from './rick-and-morty.servico';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-personagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule],
  template: `
    <h2 *ngIf="!editMode">Novo Personagem</h2>
    <h2 *ngIf="editMode">Editar Personagem</h2>
    <form [formGroup]="form" (ngSubmit)="salvar()">
      <label>
        Nome:
        <input formControlName="name" />
      </label>
      <label>
        Status:
        <input formControlName="status" />
      </label>
      <label>
        Espécie:
        <input formControlName="species" />
      </label>
      <label>
        Gênero:
        <input formControlName="gender" />
      </label>
      <label>
        Origem:
        <input formControlName="origin" />
      </label>
      <label>
        Imagem URL:
        <input formControlName="image" />
      </label>
      <button mat-button type="submit">Salvar</button>
      <a routerLink="/">Voltar</a>
    </form>
  `,
})
export class FormPersonagemComponent implements OnInit {
  form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    status: [''],
    species: [''],
    gender: [''],
    origin: [''],
    image: [''],
  });

  editMode = false;

  constructor(
    private fb: FormBuilder,
    private servico: RickAndMortyServico,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const personagem = this.servico.localPersonagemById(+id);
      if (personagem) {
        this.form.patchValue(personagem);
      }
    }
  }

  salvar() {
    const personagem = this.form.getRawValue();
    if (this.editMode) {
      this.servico.atualizarPersonagem(personagem);
    } else {
      this.servico.adicionarPersonagem(personagem);
    }
    this.router.navigate(['/']);
  }
}
