import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceholder]',
  standalone: true
}) export class PlaceholderDirective {
  constructor(private viewContainerRef: ViewContainerRef) {}
}
