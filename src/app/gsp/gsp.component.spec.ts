import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GspComponent } from './gsp.component';

describe('GspComponent', () => {
  let component: GspComponent;
  let fixture: ComponentFixture<GspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
