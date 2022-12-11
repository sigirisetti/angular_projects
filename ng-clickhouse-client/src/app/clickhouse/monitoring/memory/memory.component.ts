import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ch-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent {

  profileForm = new FormGroup({
    system: new FormControl(true),
    pae: new FormControl(true),
  });


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);

  }

  updateName() {
    console.log("Button clicked")
  }
}
