import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTasksPage } from './list-of-tasks.page';

describe('ListOfTasksPage', () => {
  let component: ListOfTasksPage;
  let fixture: ComponentFixture<ListOfTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfTasksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
