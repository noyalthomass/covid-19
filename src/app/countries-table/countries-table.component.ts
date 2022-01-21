import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Countries } from '../models/index';
import { DataService } from '../services/data.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss'],
})
export class CountriesTableComponent implements OnInit, AfterViewInit {
  
  constructor() {}

  ngOnInit(): void {
    
  }
 
}