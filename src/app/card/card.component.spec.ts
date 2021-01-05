import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const fb: FormBuilder = new FormBuilder();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
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
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.editcardform = fb.group({
      editcard: null
      });
    

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should change value to entered value',() => {
    component.changeValue("New card value")
    expect(component.editcardform.controls.cardedit.value).toEqual("New card value");
  });
  it('Entered value should reflect in card',async() => {
      component.editCard("old card value","new card value")
      spyOn(component.editCardValue, 'emit');
      component.editcardform.controls["cardedit"].setValue("new value")
      component.editCard("old card value","new card value");
      
      expect(component.editCardValue.emit).toHaveBeenCalledWith(['old card value', 'new card value']);
    
    });

    // it('Send delete emitter on confirm true',async() => {
    //   component.deleteCardValue("process")

    //   spyOn(window, 'confirm').and.returnValue(true);
    //   let spy = spyOn(component, 'deleteCardValue')
    //   expect(spy).toHaveBeenCalled();
    
    // });
  it('Don\'t delete card item from the list on cancle',()=>{

    spyOn(window, 'confirm').and.returnValue(false);

    let spy = spyOn(component, 'deleteCardValue')
 
    expect(spy).not.toHaveBeenCalled();
  })
  it('hide card', () => {
    component.close()
    expect(component.isDeletd).toBeFalsy();
  });

});
