import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficermainPage } from './officermain.page';

describe('OfficermainPage', () => {
  let component: OfficermainPage;
  let fixture: ComponentFixture<OfficermainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficermainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficermainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
