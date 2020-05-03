import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesSelectorComponent } from './species-selector.component';

describe('SpeciesSelectorComponent', () => {
  let component: SpeciesSelectorComponent;
  let fixture: ComponentFixture<SpeciesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
