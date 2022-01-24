import { Component, OnInit ,OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';


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
  destroy$:Subject<boolean> = new Subject<boolean>();

  constructor(private service:DataService,public translate:TranslateService,private spinner: NgxSpinnerService) {
    translate.addLangs(['English','French','Arab']);
    translate.setDefaultLang('English');
    this.selectLanguage = localStorage.getItem("lang")||"English"
    translate.use(this.selectLanguage)
   }

  ngOnInit(): void {
    this.spinner.show()
  
    this.service.getCovidData().subscribe((datas)=>{
      this.covidData.report=datas 
      this.spinner.hide()  
    }) 
  }
  
  changeLang(lang:any){
    localStorage.setItem("lang",lang)
    this.selectLanguage=localStorage.getItem("lang")||'English'
    this.translate.use(this.selectLanguage)
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
