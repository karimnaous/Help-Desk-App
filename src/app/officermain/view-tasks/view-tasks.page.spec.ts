import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTasksPage } from './view-tasks.page';

describe('ViewTasksPage', () => {
  let component: ViewTasksPage;
  let fixture: ComponentFixture<ViewTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTasksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
