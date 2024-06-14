import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-absolute-overlay',
  standalone: true,
  templateUrl: './absolute-overlay.component.html',
  styleUrls: ['./absolute-overlay.component.css'] // Исправлено имя свойства
})
export class AbsoluteOverlayComponent implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {

  }
}
