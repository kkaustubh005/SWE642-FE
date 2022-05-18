/* Aastha Neupane
Achint Jain
Kaustubh Karanjkar
Niyanta Lad */
    

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {

  likes = [
    { name: "Students", selected: false },
    { name: "Location", selected: false },
    { name: "Campus", selected: false },
    { name: "Atmosphere", selected: false },
    { name: "Dorm rooms", selected: false },
    { name: "Sports", selected: false }
  ]

  ratings = [
    {name: "Very Likely" ,value: "verylikely"},
    {name: "Likely", value:"likely"},
    {name: "Unlikely", value:'unlikely'}
  ]

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {   
  }

  ngOnInit(): void {
  }

  submitSurvey(values: any) {

    var processedlike = this.likes
    .filter(opt => opt.selected)
    .map(opt => opt.name);
//created an array list name body to store all the data.
    var body = {
      "fname": values.fname,
      "lname": values.lname,
      "address" : values.address,
      "city" : values.city,
      "state" : values.state,
      "zip" : values.zip,
      "tel" : values.tel,
      "email" : values.email,
      "date" : values.date,
      "choose" : values.choose,
      "comments" : values.comments,
      "rating" :values.rating,
      "liked": processedlike.join()
  }
  console.log(values.submitted)
  console.log(body)
  console.log(body.rating)

  let httpHeaders = new HttpHeaders({
		'Content-Type' : 'application/json',
		'Cache-Control': 'no-cache'
	});

//Content from the body array has been sent through the http post method
  let obs = this.http.post("http://localhost:8080/addSurvey", body, { headers: httpHeaders })

    obs.subscribe((response) => {
      console.log(response)
      this.pageReload()
    }, 
	(error) => {
		alert(error.status)
	}
	)

  }
  clearSurvey() {
    window.location.reload();
    }
  
    pageReload() {
      alert("The form has been successfully submitted!")
      this.router.navigate([''])
    }

    // errorAlert() {
    //   alert("Invalid data entry: Check the highlighted message on the form and submit the form after correction.")
    // }

}
