import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountriesComponent } from './countries/countries.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTableModule} from '@angular/material/table';
import { CountriesTableComponent } from './countries-table/countries-table.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';

export function httpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http)
} 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    CountriesComponent,
    EditCountryComponent,
    CountriesTableComponent,
    PageNotFoundComponent,
    InternalErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatChipsModule,
    NgxSpinnerModule,
    MatTableModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
