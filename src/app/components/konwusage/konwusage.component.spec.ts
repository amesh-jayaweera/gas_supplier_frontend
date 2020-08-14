import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonwusageComponent } from './konwusage.component';

describe('KonwusageComponent', () => {
  let component: KonwusageComponent;
  let fixture: ComponentFixture<KonwusageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonwusageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonwusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
