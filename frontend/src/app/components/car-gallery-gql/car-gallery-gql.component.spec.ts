import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarGalleryGqlComponent } from './car-gallery-gql.component';

describe('CarGalleryGqlComponent', () => {
  let component: CarGalleryGqlComponent;
  let fixture: ComponentFixture<CarGalleryGqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarGalleryGqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarGalleryGqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
