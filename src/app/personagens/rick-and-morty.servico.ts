import { Injectable, computed, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Personagem } from './personagem.model';

@Injectable({ providedIn: 'root' })
export class RickAndMortyServico {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  private readonly localUrl = '/api/personagens';
  personagens = signal<Personagem[]>([]);
  locais = signal<Personagem[]>([]);
  filtro = signal('');
  total = signal(0);

  todos = computed(() => {
    const filtro = this.filtro().toLowerCase();
    const locais = this.locais()
      .filter((p) => p.name.toLowerCase().includes(filtro));
    return [...locais, ...this.personagens()];
  });

  constructor(private http: HttpClient) {
    this.carregarLocais();
  }

  private carregarLocais() {
    this.http.get<Personagem[]>(this.localUrl).subscribe((res) => {
      this.locais.set(res);
      this.total.set(this.personagens().length + res.length);
    });
  }

  carregarPersonagens(pagina = 1) {
    this.filtro.set('');
    this.http
      .get<{ info: { count: number }; results: Personagem[] }>(
        `${this.baseUrl}/character/?page=${pagina}`
      )
      .subscribe(({ info, results }) => {
        this.total.set(info.count + this.locais().length);
        this.personagens.set(results);
      });
  }

  totalCount() {
    return this.total();
  }

  buscarPersonagens(nome: string) {
    this.filtro.set(nome);
    const params = new HttpParams({ fromObject: { name: nome } });
    this.http
      .get<{ results: Personagem[] }>(`${this.baseUrl}/character`, { params })
      .subscribe(({ results }) => {
        this.personagens.set(results);
        const locaisFiltrados = this.locais().filter((p) =>
          p.name.toLowerCase().includes(nome.toLowerCase())
        );
        this.total.set(results.length + locaisFiltrados.length);
      });
  }

  adicionarPersonagem(personagem: Personagem) {
    this.http
      .post<Personagem>(this.localUrl, personagem)
      .subscribe((novo) => {
        this.locais.update((list) => [...list, novo]);
        this.total.set(this.total() + 1);
      });
  }

  localPersonagemById(id: number) {
    return this.locais().find((p) => p.id === id);
  }

  atualizarPersonagem(personagem: Personagem) {
    this.http
      .put<Personagem>(`${this.localUrl}/${personagem.id}`, personagem)
      .subscribe((atualizado) => {
        this.locais.update((list) =>
          list.map((p) => (p.id === atualizado.id ? atualizado : p))
        );
      });
  }

  removerPersonagem(id: number) {
    this.http.delete(`${this.localUrl}/${id}`).subscribe(() => {
      this.locais.update((list) => list.filter((p) => p.id !== id));
      this.total.set(this.total() - 1);
    });
  }
}
