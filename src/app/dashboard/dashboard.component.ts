import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators ,FormArray,FormBuilder} from '@angular/forms';
import { DraganddropService } from '../draganddrop.service';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


//new
import { TaskList } from '../tasklist';
import { ListStructure } from '../liststructure';
import { of } from 'rxjs/internal/observable/of';
import { forkJoin, merge, observable, Observable,pipe } from 'rxjs';
import {concatMap, mergeMap} from 'rxjs/operators';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:  [ DraganddropService ]

})
export class DashboardComponent implements OnInit {
  controls= FormArray;
  taskList!: TaskList;
  tasks:any;
  listnames:any
  listStructure!: ListStructure[];
  displayAddList=false
  
  taskform: FormGroup;
  submitted=false;
  showTaskButton=true;
  showTaskForm=false;
  //for drag and drop
  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }
  constructor(public draganddrop: DraganddropService,private fb: FormBuilder) { 
    // this.taskList = new  TaskList();
    // const listStructure:  ListStructure[]=[
    //   {listname:"To Do",listitems:["Download and install git", "Implement theming", "Do DOcumentation"]},
    //   {listname:"In Progress",listitems:["Angular code", "Designing and implementation"]},
    //   {listname:"Complete",listitems:["Nodejs Installation", "Visual Studio Code Installation", "Angular cli installation"]},
  // !
    // ]
    // this.listStructure=listStructure
  }
  toggleDisplayAddList() {
    this.displayAddList = !this.displayAddList;
  }
  create  (name: string) {
      let x=this.listStructure.push({listname:'',listitems:[]})
      console.log('New board generated!');
    
  };
  setData(): void {
    this.taskList = new TaskList();
  
    
    var listStructure: ListStructure[]=[
      // {listname:"To Do",listitems:[]},
      // {listname:"In Progress",listitems:[]},
      // {listname:"Complete",listitems:[]}, 
  
    ]

    this.tasks=JSON.parse(localStorage.getItem("All Tasks"))

    this.listnames=JSON.parse(localStorage.getItem("listStructure"))

    if(this.tasks!=undefined)
    {
      // debugger
      this.listnames.forEach((element)=>{
        // debugger
        var listarray=JSON.parse(localStorage.getItem(element));
        if(listarray!=null) listStructure.push({listname:element,listitems:listarray})
      })
      this.taskList.cards=this.tasks.cards
      this.taskList.lastid=this.tasks.lastid
      
      // JSON.parse(localStorage.getItem(listStructure[i])
      // this.listStructure
    }
    this.listStructure=listStructure
     
    

  }
  delete(value){
   const index= this.listStructure.findIndex(x=>x.listname===value)
   this.listStructure.splice(index,1)
       localStorage.removeItem(value)

       var listnames=this.listStructure.map(list=>list.listname)
       localStorage.setItem("listStructure",JSON.stringify(listnames))

  }
  edit(value){
    const listindex= this.listStructure.findIndex(x=>x.listname===value[0])
    const listcard=this.listStructure[listindex]
    this.listStructure[listindex]={listname:value[1],listitems:listcard.listitems}
    var listnames=this.listStructure.map(list=>list.listname)
    localStorage.setItem("listStructure",JSON.stringify(listnames))
    localStorage.setItem(value[1],JSON.stringify(listcard.listitems))
    localStorage.removeItem(listcard.listname)
   }
  ngOnInit() {
    this.setData();
    this.taskform = this.fb.group({
        
      listname: ['', Validators.required],
      
  });
  }
  get f() { return this.taskform.controls; }

  onEnter(value: string) {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.taskform.invalid) {
      
        this.displayAddList = true;
        return;
    }
    else{
      this.listStructure.push({listname:value,listitems:[]})

      var listnames=this.listStructure.map(list=>list.listname)
      localStorage.setItem(value,JSON.stringify([]))
      localStorage.setItem("listStructure",JSON.stringify(listnames))
    }
    
   

  }
  drop(event: CdkDragDrop<string[]>) {
    
    moveItemInArray(this.listStructure, event.previousIndex, event.currentIndex);
    var listnames=this.listStructure.map(list=>list.listname)
    localStorage.setItem("listStructure",JSON.stringify(listnames))

  }
  // ngOnInit(): void {
  //   // localStorage.setItem("TaskList",JSON.stringify(this.TaskList))
  // }
}
