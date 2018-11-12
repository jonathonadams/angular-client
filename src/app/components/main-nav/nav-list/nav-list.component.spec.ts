import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListComponent } from '@app/components/main-nav/nav-list/nav-list.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
