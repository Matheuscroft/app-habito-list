import { Component } from '@angular/core';
import { FormAddItemComponent } from '../../components/form-add-item/form-add-item.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';

@Component({
  selector: 'app-home',
  imports: [MenuTitleComponent, FormAddItemComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
