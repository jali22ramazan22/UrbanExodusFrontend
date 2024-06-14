import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MapComponent} from "./map/map.component";
import {PlaceholderDirective} from "../../shared/directives/placeholder.directive";
import {navbarModel} from "../../shared/models/UIModels/navbarModel";
import {ConsoleComponent} from "./console/console.component";
import {SettingsComponent} from "./settings/settings.component";
import {WikiComponent} from "./wiki/wiki.component";
import {FadeInWrapperComponent} from "../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-extra-content-window',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MapComponent,
    PlaceholderDirective,
    FadeInWrapperComponent
  ],
  templateUrl: './extra-content-window.component.html',
  styleUrl: './extra-content-window.component.css',
})
export class ExtraContentWindowComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() componentName!: navbarModel;
  @ViewChild('containerRef', { read: ViewContainerRef, static: true }) contentHost: ViewContainerRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if(this.componentName.type === 'map'){
      this.contentHost.createComponent(MapComponent)
    } else if(this.componentName.type === 'console'){
      this.contentHost.createComponent(ConsoleComponent)
    } else if(this.componentName.type === 'settings'){
      this.contentHost.createComponent(SettingsComponent)
    } else if(this.componentName.type  === 'wiki'){
      this.contentHost.createComponent(WikiComponent)
    } else {
      return;
    }
  }

  ngOnDestroy(){
    this.contentHost.clear();
  }


}
