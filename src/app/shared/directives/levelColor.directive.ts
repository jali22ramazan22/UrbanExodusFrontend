import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2} from "@angular/core";

//the directive for displaying the varying colors according the level
@Directive({
  selector: '[appLevelColor]',
  standalone: true,
})
export class LevelColorDirective implements OnChanges{
  @Input('inputLevel') inputLevel: number;

  private color: string

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges() {
    this.setColor();
    this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
  }

  setColor(): void{
    if(this.inputLevel == 1){
      this.color = 'rgb(255,51,51)';
    } else if(1 < this.inputLevel && this.inputLevel < 3){
      this.color = 'rgb(255,88,51)';
    } else if(3 <= this.inputLevel && this.inputLevel < 5){
      this.color = 'rgb(255,233,51)';
    } else if(5 <= this.inputLevel && this.inputLevel < 7){
      this.color = 'rgb(227,255,51)';
    } else if(7 <= this.inputLevel && this.inputLevel < 10){
      this.color = 'rgb(156,255,51)';
    }
  }
}
