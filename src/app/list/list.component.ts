import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import { ListStructure } from '../liststructure';
import { TaskList } from '../tasklist';
import { FormGroup,FormControl,Validators ,FormArray,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list!: ListStructure;
  @Input() taskList!: TaskList;
  @Output() deleteListValue= new EventEmitter<string>();
  @Output() editCard= new EventEmitter<string>();
  @Output() editListValue= new EventEmitter<string[]>();

  listedit: boolean = false;

  listform: FormGroup;
  submitted=false;
  editlistform: FormGroup;
  submittedlist=false;
  displayAddCard = false;
  constructor(private fb: FormBuilder) {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit() {
    this.listform = this.fb.group({
        
      cardname: ['', Validators.required],

  });
  this.editlistform=this.fb.group({
    listedit:['', Validators.required]
  })
  }
  get f() { return this.listform.controls; }
  get g() { return this.editlistform.controls; }

  allowDrop($event:any) {
    $event.preventDefault();
  }
  drop($event:any) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
    let target = $event.target;
    const targetClassName = target.className;
    debugger
    while (target.className !== "list") {
      target = target.parentNode;
    }
    target = target.querySelector(".cards");
    if (targetClassName === "card") {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
     
    } else if (targetClassName.includes("list__title")) {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
      debugger
    } else {
      target.appendChild(document.getElementById(data));
      var targetlist=$event.target.parentNode.querySelector(".list__title strong").innerText
      var targetlistitems=JSON.parse(localStorage.getItem(targetlist))
      targetlistitems.push(data)
      localStorage.setItem(targetlist,JSON.stringify(targetlistitems))
    }
  }
  onEnter(value: string) {
    this.submitted=true
    if (this.listform.invalid) {
      this.displayAddCard=true
      return;
   }
   else{
    const cardId = this.taskList.newCard(value);
    this.list.listitems.push(cardId);
    //store in db
    this.displayAddCard=!this.displayAddCard
    localStorage.setItem(this.list.listname,JSON.stringify(this.list.listitems))
    localStorage.setItem("All Tasks",JSON.stringify(this.taskList))
   }

  }
  delete (deleteCard: string) {
   
   const index=this.list.listitems.indexOf(deleteCard)
   this.list.listitems.splice(index,1)
   
   localStorage.setItem(this.list.listname,JSON.stringify(this.list.listitems))
   localStorage.setItem("All Tasks",JSON.stringify(this.taskList))
  };
  edit(changes_arr){
   
   this.taskList.cards=this.taskList.replaceCard(changes_arr[0],changes_arr[1])
   localStorage.setItem("All Tasks",JSON.stringify(this.taskList))


  }
  changeValue(name){
    this.editlistform.setValue({
      listedit:[name]  
    });
    this.listedit= !this.listedit
  }
  deleteList(name){
    this.deleteListValue.emit(name)
  }
  
  editList(previous_value: string, new_value: string){
    this.submittedlist=true
      if (this.editlistform.invalid) {
         return;
      }
      else{
      var change_value=[previous_value,new_value]
      this.listedit = false;

      this.editListValue.emit(change_value)
      }
  }
  savelist(){
    localStorage.setItem(this.list.listname,JSON.stringify(this.list.listitems))
    localStorage.setItem("All Tasks",JSON.stringify(this.taskList))
  }
 

}
