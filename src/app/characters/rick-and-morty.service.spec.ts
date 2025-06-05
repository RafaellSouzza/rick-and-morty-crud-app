import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RickAndMortyService } from './rick-and-morty.service';
import { Character } from './character.model';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickAndMortyService],
    });
    service = TestBed.inject(RickAndMortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load characters', () => {
    const mockCharacters: Character[] = [
      { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
    ];

    service.loadCharacters();

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    req.flush({ results: mockCharacters });

    expect(service.characters()).toEqual(mockCharacters);
  });
});
