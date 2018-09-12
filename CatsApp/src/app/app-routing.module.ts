import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
//import { DashboardComponent }   from './dashboard/dashboard.component';
import { CatsComponent }      from './cats/cats.component';
import { CatDetailComponent }  from './cat-detail/cat-detail.component';
 
const routes: Routes = [
 { path: '', redirectTo: '/cats', pathMatch: 'full' },
 // { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CatDetailComponent },
  { path: 'cats', component: CatsComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}