import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RickAndMortyServico } from '../rick-and-morty.servico';
import { ListaBloqueadosComponent } from './lista-bloqueados.component';

describe('ListaBloqueadosComponent', () => {
  let component: ListaBloqueadosComponent;
  let fixture: ComponentFixture<ListaBloqueadosComponent>;
  let servico: RickAndMortyServico;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ListaBloqueadosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBloqueadosComponent);
    component = fixture.componentInstance;
    servico = TestBed.inject(RickAndMortyServico);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display bloqueados', () => {
    servico.bloqueados.set([{ id: 1, name: 'Rick', status: '', species: 'Human', image: '', bloqueado: true }]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Rick');
  });
});
