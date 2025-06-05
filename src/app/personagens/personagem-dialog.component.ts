import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Personagem } from './personagem.model';

@Component({
  selector: 'app-personagem-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './personagem-dialog.component.html',
  styleUrls: ['./personagem-dialog.component.scss'],
})
export class PersonagemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personagem
  ) {}
}
