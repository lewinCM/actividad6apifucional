import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { UserViewComponent } from './components/home/user-view/user-view.component';
import { FormComponent } from './components/form/form.component';

import { NofoundComponent } from './shared/nofound/nofound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'usuario/:userid', component: UserViewComponent },
  { path: "new", component: FormComponent },
  { path: "update/:userid", component: FormComponent },
  { path: '**', component: NofoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
