import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RickAndMortyServico } from '../rick-and-morty.servico';
import { DetalhePersonagemComponent } from './detalhe-personagem.component';

describe('DetalhePersonagemComponent', () => {
  let component: DetalhePersonagemComponent;
  let fixture: ComponentFixture<DetalhePersonagemComponent>;
  let servico: RickAndMortyServico;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, DetalhePersonagemComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePersonagemComponent);
    component = fixture.componentInstance;
    servico = TestBed.inject(RickAndMortyServico);
    servico.locais.set([{ id: 10000, name: 'Morty', status: '', species: 'Human', image: '' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display personagem details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Morty');
  });
});
