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
  });

  it('should load personagens', () => {
    const mockPersonagens: Personagem[] = [
      { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
    ];

    service.carregarPersonagens();

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    req.flush({ results: mockPersonagens });

    expect(service.personagens()).toEqual(mockPersonagens);
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
});
