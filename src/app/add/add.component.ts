import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  listForm: FormGroup;
  submitted = false;
  @Input() create: Function;
  @Input() name: string;
  @Input() id: string;
  show = true;
  title: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.listForm = this.formBuilder.group({
      listName: ['', Validators.required],
  
  })
}
get f() { return this.listForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.listForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.listForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.listForm.reset();
}
  add (title: string) {
    
    this.title = '';
    this.toggle();
  };

  toggle = () => {
    this.show = !this.show;
  };
}
