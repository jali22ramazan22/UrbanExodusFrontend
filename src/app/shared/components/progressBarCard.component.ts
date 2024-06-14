import {Component, ElementRef, Input, OnChanges, Renderer2, ViewChild} from '@angular/core';
import {ProgressBarDirective} from "../directives/progress-bar.directive";

@Component({
  selector: 'app-progress-bar-card',
  standalone: true,
  template: `
    <div class="progress-bar-graph" #mainContainer>
      <div class="done-progress-graph" progressBar [progressData]="progress" [color]="color"></div>
    </div>`,
  imports: [
    ProgressBarDirective
  ],
  styles: `
    .progress-bar-graph {
      flex-grow: 1;
      background-color: #c7c7c7;
      height: 2vh;
      border-radius: 1vw;
      margin: 0.5vh 0;
      display: flex;
      transition: 1s;
    }

    .done-progress-graph {
      background-color: #2f2f2f;
      height: 100%;
      width: 1vw;
      border-radius: 1vw 0 0 1vw;
    }

    .progress-bar-graph:active{
      transform: scale(0.4);
      transition: 1s;
    }
  `
})
export class ProgressBarCardComponent implements OnChanges{
  @Input('progress') progress!: {progress: number, overall: number}
  @Input('height') height?: number;
  @Input('color') color?: string;
  @ViewChild('mainContainer', {static: true}) mainContainer: ElementRef;


  constructor(private renderer: Renderer2) {
  }


  ngOnChanges() {
    if(this.height){
      this.renderer.setStyle(this.mainContainer.nativeElement, 'height', `${this.height}vh`);
    }
  }


}
