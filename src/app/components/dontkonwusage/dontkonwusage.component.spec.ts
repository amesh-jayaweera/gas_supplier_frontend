import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DontkonwusageComponent } from './dontkonwusage.component';

describe('DontkonwusageComponent', () => {
  let component: DontkonwusageComponent;
  let fixture: ComponentFixture<DontkonwusageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DontkonwusageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DontkonwusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
