import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-component',
  imports: [FormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent implements OnChanges {
  @Input() task: string = '';
  @Input() title: string = 'Initial User Value';
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('🔄 ngOnChanges : changement détecté sur un @Input()');
    console.log(changes);

    if (changes['title']) {
      this.changeLog.push(
        `title changé : ${changes['title'].previousValue} → ${changes['title'].currentValue}`
      );
    }
  }

  // @Output() taskRemoved = new EventEmitter<string>();

  // removeTask(){
  //   this.taskRemoved.emit(this.task);
  // }
}
