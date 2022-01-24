import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  Subject, takeUntil } from 'rxjs';
import { Countries } from '../models/index';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

const ELEMENT_DATA: Countries[] = [];
@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss'],
})
export class CountriesTableComponent implements OnInit ,OnDestroy{
  displayedColumns: string[] = [
    'title',
    'flag',
    'cases',
    'deaths',
    'recovered',
    'tests',
    'population',
  ];
  dataSource: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: DataService,
    private spinner: NgxSpinnerService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.service
      .getCountriesData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        res.forEach((country: any) => {
          ELEMENT_DATA.push({
            cases: country.cases,
            title: country.country,
            flag: country.countryInfo.flag,
            deaths: country.deaths,
            recovered: country.recovered,
            tests: country.tests,
            population: country.population,
            updated: country.updated,
          });
        });
        this.dataSource = new MatTableDataSource<Countries>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue:string){
    let value = parseInt(filterValue)
    console.log(value);
    
   if(!value){
    this.filterByName(filterValue)
   }else if(value){
     console.log("number"); 
   }
    

  }
  filterByName(filterName:string){

    
    if(filterName== ''|| NaN ||null || undefined  ){
      this.dataSource = new MatTableDataSource<Countries>(ELEMENT_DATA);
     }else{
      let searchText = filterName.toLowerCase()
      
      this.dataSource = ELEMENT_DATA.find((country:any)=>{
        country.title===searchText
      })
     }
   
  }
  

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
