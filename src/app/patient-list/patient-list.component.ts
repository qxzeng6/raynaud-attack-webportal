import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  partientList: any[]=[];

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.patientService.getPatientList().subscribe(data => {
      this.partientList = data; 
      console.log("data: ",this.partientList);
    });
  }
  shouldShowAlert(lastReportTime: string): boolean {
    
    if(lastReportTime == null){
      return false;
    }
    var today = new Date();
    today.setDate (today.getDate() - 2);
    console.log("today: ",today);
    var lastReport = new Date(lastReportTime);
    if (lastReport < today){
      return true;

    }
    else{
      return false;
    }
  }
  onUsernameClick(userName: string): void{
          this.router.navigate(['/partient-list/', userName]);
            
  }
  onLogout(): void{
    console.log("onLogout");
    this.router.navigate(['/hello']);
  }

}
