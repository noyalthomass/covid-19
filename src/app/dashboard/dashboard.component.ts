import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectLanguage:string=''
  covidData:any={
    report:{}
  }

  constructor(private service:DataService,public translate:TranslateService,private spinner: NgxSpinnerService) {
    translate.addLangs(['English','French','Arab']);
    translate.setDefaultLang('English');
    this.selectLanguage = localStorage.getItem("lang")||"English"
    translate.use(this.selectLanguage)
   }

  ngOnInit(): void {
    this.spinner.show()

    setTimeout(()=>{
      this.spinner.hide()
    },700)
    this.service.getCovidData().subscribe((datas)=>{
      this.covidData.report=datas 
      
    })
    
  }
  changeLang(lang:any){
    localStorage.setItem("lang",lang)
    this.selectLanguage=localStorage.getItem("lang")||'English'
    this.translate.use(this.selectLanguage)
  }



}
