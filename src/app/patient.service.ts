import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }

  getPatientList(): Observable<any> {
    return this.http.get('http://143.198.9.41:8080/clinicians/listAll');

  }
  getPartient(userName: string): Observable<any> {  
    return this.http.get('http://143.198.9.41:8080/clinicians/'+userName);
  }
}
