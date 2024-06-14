import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {computeImagePath} from "../../../../shared/functions/ImgPath";

@Component({
  selector: 'app-map-graph',
  standalone: true,
  imports: [],
  templateUrl: './map-graph.component.html',
  styleUrl: './map-graph.component.css'
})
export class MapGraphComponent {
  @ViewChild('image', {static: true}) elementRef: ElementRef;
  scale = 2;

  protected readonly computeImagePath = computeImagePath;

  constructor(private renderer: Renderer2) {
  }

  onScale() {
    if(this.scale == 3){
      this.scale = 1;
    } else{
      this.scale = 3;
    }
    this.renderer.setStyle(this.elementRef.nativeElement, 'scale', `calc(${this.scale})`);
  }
}
