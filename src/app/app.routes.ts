import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { AreaDetailComponent } from './pages/area-detail/area-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'task/:id', component: TaskDetailComponent },
    { path: 'area/:id', component: AreaDetailComponent },
  ];