import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { RickAndMortyServico } from '../rick-and-morty.servico';
import { MatButtonModule } from '@angular/material/button';
import { Personagem } from '../personagem.model';

@Component({
  selector: 'app-form-personagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule],
  templateUrl: './form-personagem.component.html',
  styleUrls: ['./form-personagem.component.scss'],
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
    private route: ActivatedRoute,
    @Optional() private dialogRef?: MatDialogRef<FormPersonagemComponent>
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
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/personagens']);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.controls.image.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
