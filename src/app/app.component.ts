/* Aastha Neupane
Achint Jain
Kaustubh Karanjkar
Niyanta Lad */
    

import { HttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
//import { TestService } from './test.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment3';

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    let obs = this.http.get('https://api.github.com/users/kkaustubh005');
    obs.subscribe((response)=> console.log(response));
  }

  onClickSubmit(data: { emailid: string; }) {
    alert("Entered email ID: " + data.emailid);
  }
}