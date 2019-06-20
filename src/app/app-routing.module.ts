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
  { path: 'officermain', loadChildren: './officermain/officermain.module#OfficermainPageModule' },
  { path: 'secretary', loadChildren: './secretary/secretary.module#SecretaryPageModule' },
  { path: 'assign-modal', loadChildren: './secretary/assign-modal/assign-modal.module#AssignModalPageModule' },
  { path: 'view-modal', loadChildren: './secretary/view-modal/view-modal.module#ViewModalPageModule' },
  { 
    path: 'admin', 
    loadChildren: './admin/admin.module#AdminPageModule' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
