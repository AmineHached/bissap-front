import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { UsersListComponent } from './components/users-list-component/users-list-component';
import { UserFormComponent } from './components/user-form-component/user-form-component';
import { DepartmentsListComponent } from './components/departments-list-component/departments-list-component';
import { DepartmentFormComponent } from './components/department-form-component/department-form-component';
import { SubDepartmentListComponent } from './components/sub-department-list-component/sub-department-list-component';
import { SubDepartmentFormComponent } from './components/sub-department-form-component/sub-department-form-component';
import { ChainBlockComponent } from './components/chain-block-component/chain-block-component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'users/list', component: UsersListComponent},
    {path: 'users/create', component: UserFormComponent},
    {path: 'users/:id/edit', component: UserFormComponent},
    {path: 'users/:id', component: UserFormComponent},

    {path: 'departments/list', component: DepartmentsListComponent},
    {path: 'departments/create', component: DepartmentFormComponent},
    {path: 'departments/:id/edit', component: DepartmentFormComponent},

    {path: 'sub-departments/list', component: SubDepartmentListComponent},
    {path: 'sub-departments/create', component: SubDepartmentFormComponent},
    {path: 'sub-departments/:id/edit', component: SubDepartmentFormComponent},

    {path: 'chain', component: ChainBlockComponent},

    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home'}
];