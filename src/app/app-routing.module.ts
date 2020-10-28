import { HeroesRoutingModule } from './heroes/heroes-routing.module';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// Angular applies routes in order and uses the first match it finds.  ** needs to be at the end!
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'crisis-center', component: CrisisListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, 
      { enableTracing: true } // <-- debugging purposes only)],
    )
  ],
  exports: [RouterModule, HeroesRoutingModule]
})
export class AppRoutingModule { }
