import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RickAndMortyService } from '../../../../core/services/rick-and-morty.service';
import { ListaPersonagensComponent } from './lista-personagens.component';
import { of } from 'rxjs';

describe('ListaPersonagensComponent', () => {
  let component: ListaPersonagensComponent;
  let fixture: ComponentFixture<ListaPersonagensComponent>;
  let service: RickAndMortyService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ListaPersonagensComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPersonagensComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RickAndMortyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display characters', () => {
    service.characters.set([{ id: 1, name: 'Morty', status: '', species: 'Human', image: '' }]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Morty');
  });
});
