import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { UsersListComponent } from './components/users-list-component/users-list-component';
import { UserFormComponent } from './components/user-form-component/user-form-component';
import { DepartmentsListComponent } from './components/departments-list-component/departments-list-component';
import { DepartmentFormComponent } from './components/department-form-component/department-form-component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'users/list', component: UsersListComponent},
    {path: 'users/create', component: UserFormComponent},
    {path: 'departments/list', component: DepartmentsListComponent},
    {path: 'departments/create', component: DepartmentFormComponent},
    {path: 'departments/:id/edit', component: DepartmentFormComponent}
];