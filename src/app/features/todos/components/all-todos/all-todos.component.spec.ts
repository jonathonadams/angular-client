import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AllTodosComponent } from './all-todos.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AllTodosComponent', () => {
  let component: AllTodosComponent;
  let fixture: ComponentFixture<AllTodosComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AllTodosComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTodosComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
