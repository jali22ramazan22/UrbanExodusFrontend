//we're having the item collecting quests and event-driven quests
// thus, if we're talking about item collecting items, we're displaying the amount of collected and needed items
// while in event-driven we're just storing the event lists that will trigger the ending of quest


// Realized it's not only for items but for killing players suitable
export class ObjectCountProgress {
  constructor(public collectedItems: number, public totalItems: number, public itemTitle: string) {}

  changeCollectedItems(newAmount: number){
    this.collectedItems = newAmount;
  }

}

export class EventProgress {
  constructor(public events: string[]) {}
}

export class ProgressFactory {
  static createItemCollectingProgress(collectedItems: number, totalItems: number, itemTitle: string): ObjectCountProgress {
    return new ObjectCountProgress(collectedItems, totalItems, itemTitle);
  }

  static createEventProgress(events: string[]): EventProgress {
    return new EventProgress(events);
  }
}

export const questProgress = new Map<string, (...args: any[]) => any>([
  ['countType', ProgressFactory.createItemCollectingProgress],
  ['eventType', ProgressFactory.createEventProgress],
])
