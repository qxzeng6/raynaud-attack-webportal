import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartientDetailComponent } from './partient-detail.component';

describe('PartientDetailComponent', () => {
  let component: PartientDetailComponent;
  let fixture: ComponentFixture<PartientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartientDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
