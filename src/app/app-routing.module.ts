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
  { path: 'employee', loadChildren: './employee/employee.module#EmployeePageModule' },
  { path: 'view', loadChildren: './view/view.module#ViewPageModule' },
  { path: 'view', loadChildren: './employe/view/view.module#ViewPageModule' },
  { path: 'view', loadChildren: './employee/view/view.module#ViewPageModule' },
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
  { path: 'employee', loadChildren: './edit/employee/employee.module#EmployeePageModule' },
  { path: 'edit', loadChildren: './employee/edit/edit.module#EditPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
