import { Routes } from '@angular/router';
import { UsersListComponent } from '../components/users-list-component/users-list-component';
import { HomeComponent } from '../components/home-component/home-component';


export const routes: Routes = [
    // Route to display the list of users
    { path: 'users/list', component: UsersListComponent },
    { path: 'home', component: HomeComponent },

];
