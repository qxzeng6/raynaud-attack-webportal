import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { subDays, startOfDay, isSameDay } from 'date-fns'; 


@Component({
  selector: 'app-partient-detail',
  templateUrl: './partient-detail.component.html',
  styleUrl: './partient-detail.component.css'
})
export class PartientDetailComponent {
  userName: string = "";
  patientRecords: any[]= []; 
  colorScheme: any;
  chartData: any;
  currentPage = 1;
  totalPages = 5; 
  oriPageRecords: any[]= [];
  constructor(private route: ActivatedRoute,private patientService: PatientService) {}
  
  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName')!;
    console.log("userName: ", this.userName);
    this.patientService.getPartient(this.userName).subscribe(data => {
      // this.partientList = data; // Assuming the data is in the format you expect
      console.log("data: ",data);
      if(data.length%10 == 0){
        this.totalPages = 1;}
      else{
        this.totalPages = Math.ceil(data.length/10);
      }
      this.patientRecords = data;
      this.oriPageRecords = data;
      this.chartData = data;
      this.prepareChartData();
      console.log("patientRecords: ",this.patientRecords);
      
    });
    
  }
  goBack(): void{
    window.history.back();
  }

  changePage(currentPage: number):void {
    console.log("currentPage: ",currentPage);
    this.currentPage = currentPage;
    if (this.currentPage< this.totalPages) {
      this.patientRecords = this.oriPageRecords.slice((this.currentPage - 1) * 10, (this.currentPage - 1) * 10 + 10);
    }else{
      console.log("this.patientRecords.length: ",this.patientRecords);
      this.patientRecords =this.oriPageRecords.slice((this.currentPage - 1) * 10, this.oriPageRecords.length);
    }

    // Logic to fetch data for the current page
    // e.g., this.fetchDataForPage(this.currentPage);
  }
  prepareChartData(): void{
    this.colorScheme = {
      domain: ['#5AA454', '#E44D25', '#7aa3e5', '#a8385d', '#aae3f5']
    };
    const today = new Date();
    today.setDate(today.getDate());
    const counts = new Map();

    for (let days = 0; days < 7; days++) {
      const date = subDays(today, days);
      counts.set(date.toISOString().split('T')[0], 0); // Initialize counts
    }
    // console.log("counts: ",counts);

    this.patientRecords.forEach(record => {
      const recordDate = new Date(record.attackDate);
      if (isSameDay(recordDate, today) || recordDate > subDays(today, 7)) {
        const dateKey = recordDate.toISOString().split('T')[0];
        counts.set(dateKey, (counts.get(dateKey) || 0) + 1);
      }
    });
    console.log("counts: ",counts);
    this.chartData = Array.from(counts, ([name, value]) => ({ name, value })).reverse();
    console.log("chartData: ",this.chartData);
  }
}
