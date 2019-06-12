import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRolePage } from './assign-role.page';

describe('AssignRolePage', () => {
  let component: AssignRolePage;
  let fixture: ComponentFixture<AssignRolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRolePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
