import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Perk} from "../../../../../../shared/models/skillModels/skill.model";

@Component({
  selector: 'app-perk-block',
  standalone: true,
  imports: [],
  templateUrl: './perk-block.component.html',
  styleUrl: './perk-block.component.css'
})
export class PerkBlockComponent implements OnInit, OnChanges{
  @Input() perk!: Perk;


  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

    ngOnInit(){

    }

    ngOnChanges(changes: SimpleChanges){
      if(changes['perk']){
        this.perk = changes['perk'].currentValue;
      }
      if(!this.perk.taken){
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#2b2b2b');
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#404040');
      } else {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#232323');
      }
    }


}
