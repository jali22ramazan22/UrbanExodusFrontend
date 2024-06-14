export abstract class Quest {
  protected constructor(
    public title: string,
    public description: string,
    public imgPath: string,
    public questType: string,
    public progressType: string,
    public progressArgs: any[],
    public timeLeft?: Date,
    public additionalInfo?: any[],
    public executionType?: string,
    public isFinished = false,
  ) {}
}

export class PlotQuest extends Quest {
  constructor(title: string, description: string, imgPath: string,
              progressType: string, progressArgs: any[]) {
    super(title, description, imgPath, 'plot', progressType, progressArgs);
  }
}

export class GlobalQuest extends Quest {
  constructor(title: string, description: string, imgPath: string,
              progressType: string, progressArgs: any[]) {
    super(title, description, imgPath, 'global', progressType, progressArgs);
  }
}

export class DailyQuest extends Quest {
  constructor(title: string, description: string, imgPath: string,
              progressType: string, progressArgs: any[], timeLeft: Date) {
    super(title, description, imgPath, 'daily', progressType, progressArgs, timeLeft);
  }

  leftTime(): number | null {
    if (!(this.timeLeft instanceof Date)) {
      return null;
    }
    const currentDate = Date.now();
    return this.timeLeft.getTime() - currentDate; // milliseconds
  }
}

// The map of implementing Quest abstract class for effective Factory creation
export const questTypes = new Map<string, new (...args: any[]) => Quest>([
  ['plot', PlotQuest],
  ['global', GlobalQuest],
  ['daily', DailyQuest],
]);

export class QuestFactory {
  public static createQuest(
    type: string,
    title: string,
    description: string,
    imgPath: string,
    progressType: string,
    progressArgs: any[],
    timeLeft?: Date,
    additionalInfo?: any,
  ): Quest {

    const QuestConstructor = questTypes.get(type);

    if (!QuestConstructor) {
      throw new Error("'Quest Type' does not exist");
    }
    return new QuestConstructor(title, description, imgPath, progressType, progressArgs, timeLeft, additionalInfo);
  }
}
