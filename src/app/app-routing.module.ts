import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./views/tasks/tasks.module').then(m => m.TasksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
