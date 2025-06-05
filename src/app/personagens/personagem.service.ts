import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {
  private apiUrl = '/api/personagens';

  constructor(private http: HttpClient) {}

  getPersonagens() {
    return this.http.get(this.apiUrl);
  }

  addPersonagem(personagem: any) {
    return this.http.post(this.apiUrl, personagem);
  }

  updatePersonagem(id: number, personagem: any) {
    return this.http.put(`${this.apiUrl}/${id}`, personagem);
  }

  deletePersonagem(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
