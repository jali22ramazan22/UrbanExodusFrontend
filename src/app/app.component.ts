import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainAppComponent} from "./main-app/main-app.component";
import {LoadingScreenComponent} from "./shared/components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainAppComponent, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
