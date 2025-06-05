import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RickAndMortyService } from './rick-and-morty.service';
import { CharacterListComponent } from './character-list.component';
import { of } from 'rxjs';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let service: RickAndMortyService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CharacterListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
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
