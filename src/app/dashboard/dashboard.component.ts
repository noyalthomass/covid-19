import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  covidData:any={
    report:{}
  }

  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.service.getCovidData().subscribe((datas)=>{
      this.covidData.report=datas 
    })
  }




}
