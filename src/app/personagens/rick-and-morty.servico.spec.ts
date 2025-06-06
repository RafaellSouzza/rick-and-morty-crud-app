import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RickAndMortyServico } from './rick-and-morty.servico';
import { Personagem } from './personagem.model';

describe('RickAndMortyServico', () => {
  let service: RickAndMortyServico;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickAndMortyServico],
    });
    service = TestBed.inject(RickAndMortyServico);
    httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('/api/personagens').flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load personagens', () => {
    const mockPersonagens: Personagem[] = [
      { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
    ];

    service.carregarPersonagens(1);

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character/?page=1');
    req.flush({ info: { count: 1 }, results: mockPersonagens });

    expect(service.personagens()).toEqual(mockPersonagens);
    expect(service.totalCount()).toBe(1);
  });

  it('should search personagens by name', () => {
    const mockPersonagens: Personagem[] = [
      { id: 2, name: 'Morty', status: 'Alive', species: 'Human', image: '' },
    ];

    service.buscarPersonagens('Morty');

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?name=Morty');
    req.flush({ results: mockPersonagens });

    expect(service.personagens()).toEqual(mockPersonagens);
  });

  it('should manage local personagens', () => {
    service.adicionarPersonagem({
      id: 0,
      name: 'Local',
      status: 'Alive',
      species: 'Human',
      image: ''
    });

    const addReq = httpMock.expectOne('/api/personagens');
    addReq.flush({ id: 1, name: 'Local', status: 'Alive', species: 'Human', image: '' });

    expect(service.todos().length).toBe(1);

    const added = service.todos()[0];
    service.atualizarPersonagem({ ...added, name: 'Editado' });

    const updateReq = httpMock.expectOne(`/api/personagens/${added.id}`);
    updateReq.flush({ ...added, name: 'Editado' });

    expect(service.todos()[0].name).toBe('Editado');

    service.removerPersonagem(added.id);
    const deleteReq = httpMock.expectOne(`/api/personagens/${added.id}`);
    deleteReq.flush({});

    expect(service.todos().length).toBe(0);
  });

  it('should block and unblock personagens', () => {
    const personagem: Personagem = {
      id: 3,
      name: 'Jerry',
      status: 'Alive',
      species: 'Human',
      image: ''
    };

    service.bloquearPersonagem(personagem);
    const blockReq = httpMock.expectOne('/api/bloqueados');
    blockReq.flush({ ...personagem, bloqueado: true });

    expect(service.bloqueados().length).toBe(1);

    service.desbloquearPersonagem(personagem.id);
    const unblockReq = httpMock.expectOne(`/api/bloqueados/${personagem.id}`);
    unblockReq.flush({});

    expect(service.bloqueados().length).toBe(0);
  });
});
