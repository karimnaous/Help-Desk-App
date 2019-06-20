import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'officermain', loadChildren: './officermain/officermain.module#OfficermainPageModule' },
  //{ path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  //{ path: 'view-tasks', loadChildren: './officermain/view-tasks/view-tasks.module#ViewTasksPageModule' },
  //{ path: 'list-of-tasks', loadChildren: './officermain/list-of-tasks/list-of-tasks.module#ListOfTasksPageModule' },

 //{ path: 'edit-task', loadChildren: './officermain/edit-task/edit-task.module#EditTaskPageModule' },

  //{ path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' }

  { path: 'secretary', loadChildren: './secretary/secretary.module#SecretaryPageModule' },
  { path: 'assign-modal', loadChildren: './secretary/assign-modal/assign-modal.module#AssignModalPageModule' },
  { path: 'view-modal', loadChildren: './secretary/view-modal/view-modal.module#ViewModalPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
