import { Component } from '@angular/core';
import {fadeInOut} from "../../animations/fadeInOut";


// the component is needed to ease the code and follow the dry principle to apply the same style
@Component({
  selector: 'app-fade-in-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './fade-in-wrapper.component.html',
  styleUrl: './fade-in-wrapper.component.css',
  animations: [fadeInOut]
})
export class FadeInWrapperComponent {

}
