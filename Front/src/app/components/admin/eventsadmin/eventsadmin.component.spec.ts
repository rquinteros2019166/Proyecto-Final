import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsadminComponent } from './eventsadmin.component';

describe('EventsadminComponent', () => {
  let component: EventsadminComponent;
  let fixture: ComponentFixture<EventsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
