import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {navbarModel} from "../shared/models/UIModels/navbarModel";
import {NavbarLoaderService} from "../shared/services/navbar-loader.service";
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {CdkPortal, PortalModule} from "@angular/cdk/portal";
import {ExtraContentWindowComponent} from "./extra-content-window/extra-content-window.component";

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    PortalModule,
    ExtraContentWindowComponent
  ],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MainAppComponent implements OnInit{
  @ViewChild(CdkPortal) portal!: PortalModule;
  walletInfoItems: navbarModel[];
  sideBarItems: navbarModel[];
  navLinkItems: navbarModel[];
  extraWindowComponentName: navbarModel = null;

  constructor(
    private navbarLoaderService: NavbarLoaderService,
    private overlay: Overlay) {

  }

  //using cdk open the absolute overlay over the whole app
  openExtraWindow(componentName: navbarModel){
    this.extraWindowComponentName = componentName;
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      minWidth: '50%',
      hasBackdrop: true,
    })

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach()
      this.extraWindowComponentName = null;
    });


  }


  ngOnInit(){
    this.navbarLoaderService.buildNavbarArray('main', 'navLinkItems')
      .subscribe(navbar => this.navLinkItems = navbar);
    this.navbarLoaderService.buildNavbarArray('main', 'sideBarItems')
      .subscribe(navbar => this.sideBarItems = navbar);
    this.navbarLoaderService.buildNavbarArray('main', 'walletInfoItems')
      .subscribe(navbar => this.walletInfoItems= navbar);
  }
}
