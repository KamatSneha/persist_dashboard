import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { CardStructure } from "../cardstructure";
import { FormGroup,FormControl,Validators ,FormArray,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: CardStructure;
  @Output() deleteCard= new EventEmitter<string>();
  @Output() editCardValue= new EventEmitter<string[]>();
  isDeletd: boolean = true ; 
  tasks:any;
  edit: boolean = false;
  editcardform: FormGroup;
  submitted=false;
  constructor(private fb: FormBuilder) {
  }
  deleteCardValue(value:string){
    if(confirm("Are you sure you wish to delete this card?")){
    this.deleteCard.emit(value)
    }
  }
  ngOnInit() {
    this.editcardform = this.fb.group({
        
      cardedit: ['', Validators.required],
      
  });
  }
  // check_duplicate(control:FormControl){
  //   var store_array=JSON.parse(localStorage.getItem("All Tasks"))
  //   debugger

  // }
  // checkDuplicate(control:FormControl){
  // localStorage.getItem("All Tasks")
  // if (control.value) {
  //   return { urlValid: true };
  // }
  // return null;
  // }
  get f() { return this.editcardform.controls; }

  dragStart(ev:any) {
    ev.dataTransfer.setData("text", ev.target.id);
    
    var targetlist=ev.target.parentNode.parentNode.parentNode.querySelector(".list__title strong").innerText
    var targetlistitems=JSON.parse(localStorage.getItem(targetlist))
    const index=targetlistitems.indexOf(ev.target.id)
    targetlistitems.splice(index,1)

    localStorage.setItem(targetlist,JSON.stringify(targetlistitems))

  }
 editCard (previous_value: string, new_value: string) {
  this.submitted=true

    // this.listService.update(id, { name }).subscribe((data: any) => {
      if (this.editcardform.invalid) {
         return;
      }
      else{  
     
      var change_value=[previous_value,new_value]
      this.edit = false;

      this.editCardValue.emit(change_value)
      
      }
    // });
  };
  changeValue(name){
    this.editcardform.setValue({
      cardedit:name  
    });
    this.edit= !this.edit
  }
  close(){
    this.isDeletd = ! this.isDeletd;
    
    // this.tasks=JSON.parse(localStorage["All Tasks"])
    

    // var cards_array=Object.keys(this.tasks.cards).map(key=>({id:key, cardname:this.tasks.cards[key]}))
    
    // for(var i=0;i<(cards_array.length);i++){
    //   if(cards_array[i].id==this.card.id) cards_array.splice(i,1)
    // }
    
    // localStorage.setItem("All Tasks",JSON.stringify(cards_array))
  }
}
