import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CountriesTableComponent } from './countries-table/countries-table.component';
import { CountriesComponent } from './countries/countries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'countries',component:CountriesComponent,canActivate: [AuthGuard]},
  {path:'edit-country/:id',component:EditCountryComponent,canActivate: [AuthGuard]},
  {path:'list-countries',component:CountriesTableComponent,canActivate:[AuthGuard]},
  {path:'404',  component:PageNotFoundComponent},
  {path:'500',component:InternalErrorComponent},
  {path:'**',  component:PageNotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
