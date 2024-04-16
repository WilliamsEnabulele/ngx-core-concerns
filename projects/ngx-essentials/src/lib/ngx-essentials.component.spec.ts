import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEssentialsComponent } from './ngx-essentials.component';

describe('NgxEssentialsComponent', () => {
  let component: NgxEssentialsComponent;
  let fixture: ComponentFixture<NgxEssentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxEssentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxEssentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
