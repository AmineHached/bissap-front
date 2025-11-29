import { CommonModule, PercentPipe } from '@angular/common';
import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { UserComponent } from '../user-component/user-component';
import { UserFormComponent } from '../user-form-component/user-form-component';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS, UserComponent, UserFormComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit, 
                                      OnDestroy, 
                                      DoCheck {
  @Input() title: string = 'Initial Title';
  changedValue : string = 'changed value';
  oldCountValue = 0;


  ngDoCheck(): void {
    console.log('🕵️ ngDoCheck : Angular vérifie le composant (détection manuelle)');

    if (this.count !== this.oldCountValue) {
      console.log(`👉 count a changé : ${this.oldCountValue} → ${this.count}`);
      this.oldCountValue = this.count;
    }
  }

  ngOnDestroy(): void {
    console.log('❌ ngOnDestroy : composant détruit');
    this._users = [];
  }
  // Interpolation {{}}
  x: number = 2;
  _age: number = 27;
  _status: string = 'pending';
  note: number = 15;
  _color: string = 'purple';

  ///////////////////////////
  _user: string = 'student';
  _users: any[] = [];

  ///////////////////////////

  _changeColor() {
    if (this.note < 10) {
      this._color = 'red';
    } else if (this.note > 13) {
      this._color = 'yellow';
    } else {
      this._color = 'purple';
    }
  }

  ngOnInit(): void {
    // this._changeColor();
    this._users = ['Value 1', 12, true, 'Value 2', 12.25, false, 'Value 3'];

    //alert("Read component while the page is loaded directly")
  }

  // End Interpolation
  count: number = 0;
  name: string = '';
  isVisible: boolean = true;
  /////////////////////////////////////////////////////////////
  isHighlighted: boolean = false;

  fontSize: string = '40px';
  color: string = 'red';
  /////////////////////////////////////////////////////////////

  task: string = '';
  tasks: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  // créer une variable status [ default  value = pending ]
  status: string = '';
  ///////////////////////////////////
  _date = new Date();
  _title: string = 'Angular Demo';
  _price: number = 199.9;
  _category: any = {
    title: 'category 1',
    description: 'category description 1 ',
  };
  ////////////////////////////////////
  public changeStatus(s: string) {
    this.status = s;
    //Event Binding (change)
  }

  // list
  items: any[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 234, true];
  // Event binding  function
  public increment() {
    this.count++;
  }
  public decrement() {
    this.count--;
  }

  public changeColor(color: string) {
    // if (color === 'darkblue') {
    //   document.body.style.color = '#fff';
    //   document.body.style.backgroundColor = color;
    // } else {
    document.body.style.backgroundColor = color;
    // document.body.style.color = '#000';
    // }
  }

  public toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  // Property binding   []
  img: string = 'https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg';
  // Two Way Data Binding   Forms
  public validateName() {
    if (this.name === 'test') {
      alert('Erreur');
    }
    return;
  }

  // Interpollation + Event Binding + Property Binding
  message: string = '';
  wasClicked: boolean = false;
  // déclaration d'une nouvelle variable
  // de type string

  // déclaration d'une nouvelle fonction pour
  // afficher le message dés le click sur le bouton
  public onButtonClickEvent() {
    this.message = 'Button was clicked'; //interpollation
    // this.wasClicked = true; // property
  }

  // déclaration d'une nouvelle fonction pour vider
  // le contenu du message
  public onClearContentMessageEvent() {
    this.message = '';
    // this.wasClicked = false;
  }

  onTaskRemoved(task: string): void {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
}
