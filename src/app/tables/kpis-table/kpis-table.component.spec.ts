/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KpisTableComponent } from './kpis-table.component';

describe('KpisTableComponent', () => {
  let component: KpisTableComponent;
  let fixture: ComponentFixture<KpisTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpisTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
