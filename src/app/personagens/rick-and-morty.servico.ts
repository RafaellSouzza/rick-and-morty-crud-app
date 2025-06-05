import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  buscarPersonagens(nome: string) {
    const params = new HttpParams({ fromObject: { name: nome } });
    this.http
      .get<{ results: Personagem[] }>(`${this.baseUrl}/character`, { params })
      .subscribe(({ results }) => this.personagens.set(results));
  }
}
