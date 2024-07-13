import { Component, OnInit } from '@angular/core';
import { LightComponent } from '../../light/light.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [LightComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
