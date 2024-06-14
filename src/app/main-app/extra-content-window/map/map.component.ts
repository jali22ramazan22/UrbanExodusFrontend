import {Component, HostListener, OnInit} from '@angular/core';
import {computeImagePath} from "../../../shared/functions/ImgPath";
import {MapGraphComponent} from "./map-graph/map-graph.component";


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MapGraphComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent{
  protected readonly computeImagePath = computeImagePath;
}
