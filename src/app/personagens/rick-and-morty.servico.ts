import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personagem } from './personagem.model';

@Injectable({ providedIn: 'root' })
export class RickAndMortyServico {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  personagens = signal<Personagem[]>([]);

  constructor(private http: HttpClient) {}

  carregarPersonagens() {
    this.http
      .get<{ results: Personagem[] }>(`${this.baseUrl}/character`)
      .subscribe(({ results }) => this.personagens.set(results));
  }
}
