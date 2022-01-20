import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReplaySubject, takeUntil } from 'rxjs';
import {Countries} from '../models/index'
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";


const ELEMENT_DATA: Countries[] = [];
@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})



export class CountriesTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'flag', 'cases', 'deaths','recovered','tests','population'];
  dataSource:any

  destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);


  @ViewChild(MatPaginator) paginator: MatPaginator;

 
  constructor(private service:DataService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData()
  
  }

  loadData(){
    this.spinner.show()
    this.service.getCountriesData().pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res:any)=>{
      res.forEach((country:any)=>{
        ELEMENT_DATA.push({
          cases:country.cases,
          title:country.country,
          flag:country.countryInfo.flag,
          deaths:country.deaths,
          recovered:country.recovered,
          tests:country.tests,
          population:country.population,
          updated:country.updated,
        })
      })
      this.dataSource= new MatTableDataSource<Countries>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide()
    })

  }
}
