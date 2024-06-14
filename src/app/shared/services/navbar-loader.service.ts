import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, of } from 'rxjs';
import { navbarModel, NavbarModelBuilder } from '../models/UIModels/navbarModel';

@Injectable({
  providedIn: 'root'
})
export class NavbarLoaderService {
  private exportedData: any = null;

  constructor(private http: HttpClient) {}

  public getJSON(name: string): Observable<any> {
    return this.http.get(`./assets/navbars/${name}.json`);
  }

  public loadJSONData(name: string): Observable<any> {
    return this.getJSON(name).pipe(take(1));
  }

  buildNavbarItem(model: any): navbarModel {
    const builder = new NavbarModelBuilder();
    if (model.imagePath) {
      builder.setImagePath(model.imagePath);
    }
    if (model.routerLinkParams) {
      builder.setRouterLinkParams(model.routerLinkParams);
    }
    if (model.value) {
      builder.setValue(model.value);
    }
    if (model.type) {
      builder.setType(model.type);
    }
    if (model.extraParam1) {
      builder.setExtraParam1(model.extraParam1);
    }
    if (model.extraParam2) {
      builder.setExtraParam2(model.extraParam2);
    }
    return builder.build();
  }

  buildNavbarArray(fileName: string, navbarName?: string): Observable<navbarModel[]> {
    if (!fileName) {
      console.error('File name is required to load JSON data.');
      return of([]);
    }
    return new Observable<navbarModel[]>((observer) => {
      this.loadJSONData(fileName).subscribe({
        next: (data: any) => {
          data = navbarName ? data[navbarName] : data;
          if (!data || data.length === 0) {
            console.error('No data found in the loaded JSON.');
            observer.next([]);
            observer.complete();
            return;
          }
          const navbarItems: navbarModel[] = data.map((item: any) => this.buildNavbarItem(item));
          observer.next(navbarItems);
          observer.complete();
        },
        error: (error: any) => {
          console.error('Failed to load JSON data:', error);
          observer.error(error);
        }
      });
    });
  }
}
