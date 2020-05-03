import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersViewComponent } from './characters-view.component';

describe('CharactersViewComponent', () => {
  let component: CharactersViewComponent;
  let fixture: ComponentFixture<CharactersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
