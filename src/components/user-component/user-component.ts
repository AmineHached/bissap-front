import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-component.html',
  styleUrls: ['./user-component.css'],
})
export class UserComponent {

  @Input() task: string = '';
  @Output() taskRemoved = new EventEmitter<string>();

  public removeTask() {
    this.taskRemoved.emit(this.task);
  }


}
