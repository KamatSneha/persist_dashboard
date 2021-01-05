import { ComponentFixture, TestBed } from '@angular/core/testing';
import { on } from 'process';

import { ListComponent } from './list.component';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { ListStructure } from '../liststructure';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.listform = fb.group({
      cardname: '',
  });
  component.editlistform = fb.group({
    listedit: '',
});
    fixture.detectChanges();
  });
  it('on enter Submitted should be truthy', () => {
    component.onEnter("new value")
    expect(component.submitted).toBeTruthy();
  });
  it('invalid form card', () => {
 
    expect(component.listform.invalid).toBeTruthy();
  });
  it('valid form card', () => {
    component.listform.controls["cardname"].setValue("new value")
    expect(component.listform.valid).toBeTruthy();
  });
  // it('delete list @output', () => {
  //   let spy = spyOn(component, 'deleteList')
  //   component.delete("list name")
  //   expect(component.deleteListValue.emit).toHaveBeenCalledWith("list name");
  // });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
