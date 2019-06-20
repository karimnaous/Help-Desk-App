import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewPage } from './modal-view.page';

describe('ModalViewPage', () => {
  let component: ModalViewPage;
  let fixture: ComponentFixture<ModalViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
