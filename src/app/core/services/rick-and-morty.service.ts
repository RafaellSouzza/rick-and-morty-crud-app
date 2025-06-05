import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  characters = signal<Character[]>([]);

  constructor(private http: HttpClient) {}

  loadCharacters() {
    this.http
      .get<{ results: Character[] }>(`${this.baseUrl}/character`)
      .subscribe(({ results }) => this.characters.set(results));
  }
}
