export class Item{
  constructor(
    public itemTitle: string,
    public itemDescription: string,
    public itemCategory: string,
    public itemLevel: number,
    public isQuest: boolean,
    public owner: string,
    public price: number,
    public imagePath: string,
    public uniqueId?: string
  ){}
}

//implement a fabric maybe???
// because I do not know what types of items will be in the app.
// TODO: write the builder or fabric to encapsulate the item creation
