import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignModalPage } from './assign-modal.page';

describe('AssignModalPage', () => {
  let component: AssignModalPage;
  let fixture: ComponentFixture<AssignModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
