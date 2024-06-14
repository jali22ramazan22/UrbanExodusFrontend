export abstract class News {
  constructor(
    public newsTitle: string,
    public type: string,
    public newsDescription: string,
    public published: Date,
    public actualInfo?: any[],
  ) {}

  abstract howOldNews(): number;
}



export class HottestNews extends News {
  constructor(
    newsTitle: string,
    type: string,
    newsDescription: string,
    published: Date,
    actualInfo?: any[],
    public imgPath?: string,
    public newsAuthor?: string,
  ) {
    super(newsTitle, type, newsDescription, published, actualInfo);
  }

  howOldNews(): number {
    const currentDate = new Date();
    const elapsedTimeInMillis = currentDate.getTime() - this.published.getTime();
    return Math.round(elapsedTimeInMillis / (1000 * 3600));
  }
}

export class LocalNews extends News {
  constructor(
    newsTitle: string,
    type: string,
    newsDescription: string,
    published: Date,
    actualInfo?: any[],
    public imgPath?: string
  ) {
    super(newsTitle, type, newsDescription, published, actualInfo);
  }
  howOldNews(): number {
    const currentDate = new Date();
    const elapsedTimeInMillis = currentDate.getTime() - this.published.getTime();
    return Math.round(elapsedTimeInMillis / (1000 * 3600));
  }
}
export const newsTypes = new Map<string, new (...args: any[]) => News>([
  ['hottest', HottestNews],
  ['local', LocalNews]
])

export class NewsCreator {
  public static createNews(
    newsTitle: string,
    type: string,
    newsDescription: string,
    published: Date,

    actualInfo?: any[],
    imagePath?: string,
    author?: string
  ): News {
    const NewsClass = newsTypes.get(type);
    if(!NewsClass){
      throw new Error("'News type' does not exist");
    }
    return new NewsClass(newsTitle, type, newsDescription, published, actualInfo, imagePath, author);
  }
}
