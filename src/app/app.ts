import { Component, signal, OnInit, OnChanges, DoCheck, OnDestroy, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../components/user-component/user-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit, OnChanges, DoCheck, OnDestroy {
  protected readonly title = signal('bissap-front');

  //interpolation {{ title() }}
  x : number = 2;
  count : number = 0;
  isHighlighted: boolean = true;
  fontSize: string = '42px';
  color : string = 'yellow';

  parenttask: string = 'Parent Task/';
  tasks: any[] = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];





  //Event binding example
  public incrementCount() {
    this.count++;
  }
  public decrementCount() {
    this.count--;
  }
  //property binding example
  img = 'https://angular.io/assets/images/logos/angular/angular.png';

  public changeColor(color: string) {
    if (color === 'lightblue') {
      document.body.style.backgroundColor = color;
    }
    if (color === 'lightgreen') {
      document.body.style.backgroundColor = color;
    }
    if (color === 'lightcoral') {
      document.body.style.backgroundColor = color;
    }
    if (color === 'white') {
      document.body.style.backgroundColor = 'white';
    }
  }

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  status : string = '';

  public changeStatus(newStatus: string) {
    this.status = newStatus;
  }

  // Lifecycle hooks
  ngOnInit(): void {
    console.log('On Init component ...');
    // Method intentionally left as a stub.
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('On changes component :: ', changes);
    // Method intentionally left as a stub.
  }

  ngDoCheck(): void {
    console.log('On Check component .');
    // Method intentionally left as a stub.
  }

  ngOnDestroy(): void {
    console.log('On Destroy component');
    // Method intentionally left as a stub.
  }


  onTaskRemoved(task : string):void{

    this.tasks = this.tasks.filter(t => t !== task);

  }

  data : any = [ 
    { title: 'item 1' , date: new Date("2024-01-01"), price : 10 , currency:"TND"},
    { title: 'item 2' , date: new Date("2024-02-15"), price : 20 , currency:"USD"},
    { title: 'item 3' , date: new Date("2024-03-10"), price : 15 , currency:"EUR"},
    { title: 'item 4' , date: new Date("2024-04-05"), price : 25 , currency:"GBP"},
    { title: 'item 5' , date: new Date("2024-05-20"), price : 30 , currency:"JPY"}
  ];







}
