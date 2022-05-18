/* Aastha Neupane
Achint Jain
Kaustubh Karanjkar
Niyanta Lad */
    

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-all-surveys',
  templateUrl: './list-all-surveys.component.html',
  styleUrls: ['./list-all-surveys.component.css']
})
export class ListAllSurveysComponent implements OnInit {

  nameSurvey:any = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  } 
//below function is used to fetch all the data from the database
  getData() {
    let obs = this.http.get("http://localhost:8080/survey");
    obs.subscribe((response) => this.viewData(response))
  }

//Below function is used to fetch all the names from the database
  viewData(survey:any) {
    try {
      for(var i=0;i<survey.length;i++){
        this.nameSurvey[i]= survey[i].fname
      }
      console.log(this.nameSurvey)
    } catch (error) {
      console.log(error)
    }
  }

}
