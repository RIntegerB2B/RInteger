import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioTourComponent } from './studio-tour.component';

describe('StudioTourComponent', () => {
  let component: StudioTourComponent;
  let fixture: ComponentFixture<StudioTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
