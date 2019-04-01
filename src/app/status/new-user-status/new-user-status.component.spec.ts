import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserStatusComponent } from './new-user-status.component';

describe('NewUserStatusComponent', () => {
  let component: NewUserStatusComponent;
  let fixture: ComponentFixture<NewUserStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
