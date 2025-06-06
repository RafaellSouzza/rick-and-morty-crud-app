import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RickAndMortyServico } from '../rick-and-morty.servico';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Personagem } from '../personagem.model';

@Component({
  selector: 'app-form-personagem',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
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
    imageType: FormControl<'url' | 'file'>;
  }>;

  editMode = false;

  onImageTypeChange() {
    this.form.controls.image.setValue('');
  }

  constructor(
    private fb: FormBuilder,
    private servico: RickAndMortyServico,
    private router: Router,
    private route: ActivatedRoute,
    @Optional() private dialogRef?: MatDialogRef<FormPersonagemComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: Personagem
  ) {
    this.form = this.fb.nonNullable.group({
      id: 0,
      name: ['', Validators.required],
      status: '',
      species: '',
      gender: '',
      origin: '',
      image: '',
      imageType: 'url' as 'url' | 'file',
    });
  }

  ngOnInit() {
    let personagem: Personagem | undefined = this.data;
    if (!personagem) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        personagem = this.servico.localPersonagemById(+id);
      }
    }
    if (personagem) {
      this.editMode = true;
      this.form.patchValue({
        ...personagem,
        origin: personagem.origin?.name ?? '',
      });
      if (personagem.image?.startsWith('data:')) {
        this.form.controls.imageType.setValue('file');
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
      this.form.controls.imageType.setValue('file');
    }
  }
}
