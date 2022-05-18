/* Aastha Neupane
Achint Jain
Kaustubh Karanjkar
Niyanta Lad */
    


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  survey:any = null
  isDataAvailable = false
  constructor(private http: HttpClient) { }

  likes = [
    { name: "Students", selected: false },
    { name: "Location", selected: false },
    { name: "Campus", selected: false },
    { name: "Atmosphere", selected: false },
    { name: "Dormrooms", selected: false },
    { name: "Sports", selected: false }
  ]

  ratings = [
    {name: "Very Likely" ,value: "verylikely"},
    {name: "Likely", value:"likely"},
    {name: "Unlikely", value:'unlikely'}
  ]
  ngOnInit(): void {
    this.fetchStudent()
  }
//Below function is used to extract fname from the url and then use http get call to fetch information from the database
// of the corresponding fname
  fetchStudent() {
    const queryString = window.location.search;
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);
    const fname = urlParams.get('fname')
    console.log(fname)
    const url = "http://localhost:8080/survey/"
    let obs = this.http.get(url + fname);    
    obs.subscribe((response) => this.loadStudent(response),
    (error) => {
      console.log('oops, error occurred.', console.log(error.status))
      if(error.status==404){
      alert("Student data does not exists");
      }
    })
  }
//below function is used to load data from database
  loadStudent(studentData: any){
    console.log(studentData.liked)
    let likeArray = studentData.liked.split(',')
    console.log(likeArray)

    this.likes.forEach(individualLike => {
      if(likeArray.includes(individualLike.name)){
        individualLike.selected = true
      }
    });
    this.survey = studentData
    console.log(this.survey)
    this.isDataAvailable = true

    let dateArray = studentData.date.split('T')
    dateArray[0]= dateArray[0].replaceAll('-','/')
    studentData.date= dateArray[0]
  }
  return(){
    window.history.back();
  }

}
