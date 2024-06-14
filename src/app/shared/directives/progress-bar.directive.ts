import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from "@angular/core";

@Directive({
  standalone: true,
  selector: '[progressBar]'
})
export class ProgressBarDirective implements OnChanges{
  @Input('progressData') progressData: {progress: number, overall: number};
  @Input('color') color?: string;

  constructor(private renderer: Renderer2,private elementRef: ElementRef) {}

  ngOnChanges() {
    const percentage = (this.progressData.progress / this.progressData.overall) * 100;
    const setColor = this.color ? this.color : 'rgb(37,37,37)';
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${percentage}%`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', setColor);
  }

}
