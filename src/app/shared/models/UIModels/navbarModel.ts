import {computeImagePath} from "../../functions/ImgPath";


export class navbarModel {
  constructor(
    public imgPath: string,
    public routerLinkParams: any[],
    public value?: any,
    public type?: any,
    public extraParam1?: any,
    public extraParam2?: any
  ) {
    this.imgPath = imgPath;
    this.routerLinkParams = routerLinkParams;
    this.value = value;
    this.type = type;

  }
}


export class NavbarModelBuilder {
  private imgPath: string = '';
  private routerLinkParams: any[] = [];
  private value?: any;
  private type?: any;
  private extraParam1?: any;
  private extraParam2?: any;

  setImagePath(imagePath: string, fullPath?: string) {
    this.imgPath = computeImagePath(imagePath, fullPath);
    return this;
  }

  setRouterLinkParams(routerLinkParams: any[]) {
    this.routerLinkParams = routerLinkParams;
    return this;
  }

  setValue(value: any) {
    this.value = value;
    return this;
  }

  setType(type: any) {
    this.type = type;
    return this;
  }

  setExtraParam1(extraParam1: any) {
    this.extraParam1 = extraParam1;
    return this;
  }

  setExtraParam2(extraParam2: any) {
    this.extraParam2 = extraParam2;
    return this;
  }

  build(): navbarModel {
    return new navbarModel(
      this.imgPath,
      this.routerLinkParams,
      this.value,
      this.type,
      this.extraParam1,
      this.extraParam2
    );
  }
}
