export class Skill{
  constructor(
    public skillTitle: string,
    public perks: Perk[]){
  }
}

export class Perk{
  constructor(
    public perkTitle: string,
    public taken: boolean,
    public bonuses: string[],
    public id: number,
    public parent_id: number | number[]){
  }

}

//it's really hard and annoying to create an instances of classes by hand.
// so I think it is a good place to apply the pattern to encapsulate that
//TODO: write a builder or fabric pattern to encapsulate the creating Skill
