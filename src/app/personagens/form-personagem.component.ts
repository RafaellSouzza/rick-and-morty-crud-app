import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
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
  form: FormGroup<{
    id: FormControl<number>;
    name: FormControl<string>;
    status: FormControl<string>;
    species: FormControl<string>;
    gender: FormControl<string>;
    origin: FormControl<string>;
    image: FormControl<string>;
  }>;

  editMode = false;

  constructor(
    private fb: FormBuilder,
    private servico: RickAndMortyServico,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.nonNullable.group({
      id: 0,
      name: ['', Validators.required],
      status: '',
      species: '',
      gender: '',
      origin: '',
      image: '',
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const personagem = this.servico.localPersonagemById(+id);
      if (personagem) {
        this.form.patchValue({
          ...personagem,
          origin: personagem.origin?.name ?? '',
        });
      }
    }
  }

  salvar() {
    const valor = this.form.getRawValue();
    const personagem: Personagem = {
      id: valor.id,
      name: valor.name,
      status: valor.status,
      species: valor.species,
      gender: valor.gender,
      origin: valor.origin ? { name: valor.origin, url: '' } : undefined,
      image: valor.image,
    };
    if (this.editMode) {
      this.servico.atualizarPersonagem(personagem);
    } else {
      this.servico.adicionarPersonagem(personagem);
    }
    this.router.navigate(['/']);
  }
}
