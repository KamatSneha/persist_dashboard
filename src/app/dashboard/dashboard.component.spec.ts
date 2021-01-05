import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { FormBuilder,ReactiveFormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        ReactiveFormsModule,
    ],
    providers: [
        { provide: FormBuilder, useValue: fb }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  
    component.taskform = fb.group({
        listname: '',
    });
    fixture.detectChanges();
  });

  it('hide and show list', () => {
    component.toggleDisplayAddList()
    expect(component.displayAddList).toBeTruthy();
  });
  it('should create a new structure', () => {
    
    component.create()
    expect(component.listStructure.length).toEqual(1);
  });
  
});
