import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RickAndMortyServico } from './rick-and-morty.servico';
import { ListaPersonagensComponent } from './lista-personagens.component';
import { of } from 'rxjs';

describe('ListaPersonagensComponent', () => {
  let component: ListaPersonagensComponent;
  let fixture: ComponentFixture<ListaPersonagensComponent>;
  let servico: RickAndMortyServico;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ListaPersonagensComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPersonagensComponent);
    component = fixture.componentInstance;
    servico = TestBed.inject(RickAndMortyServico);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display personagens', () => {
    servico.personagens.set([{ id: 1, name: 'Morty', status: '', species: 'Human', image: '' }]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Morty');
  });
});
