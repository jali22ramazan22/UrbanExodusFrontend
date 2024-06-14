import {Injectable} from "@angular/core";
import {NetworkService} from "../network.service";
import {HottestNews, LocalNews, NewsCreator} from "../../../../shared/models/networkModels/news.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NewsService {

  hottestNewsSubject: BehaviorSubject<HottestNews[]> = new BehaviorSubject<HottestNews[]>(this.fetchHottestNews());
  localNewsSubject: BehaviorSubject<LocalNews[]> = new BehaviorSubject<LocalNews[]>(this.fetchLocalNews());

  constructor(private networkService: NetworkService) {}



  fetchHottestNews(): HottestNews[]{
    return [
      NewsCreator.createNews(
        'Падение цен на нефть приведет к новому кризису',
        'hottest',
        'Текущий рынок не был эталоном стабильности, а цены на полезные ископаемые не славились' +
        'потенциалом для вложений. Однаком, сегодняшние тенденции по обвалу цен на нефть превзошли даже самые' +
        'пессимистичные прогнозы',
        new Date(2024, 5, 12, 14, 5),
        null,
        'https://s0.rbk.ru/v6_top_pics/media/img/2/60/756785224969602.jpg',
        'PROEXCHANGE',
      ) as HottestNews,

      NewsCreator.createNews(
        'Важные изменения в налоговом законодательстве',
        'local',
        'Последние изменения в налоговом законодательстве предусматривают ужесточение' +
        'штрафов для налоговых нарушителей и сокращение налоговых льгот для отдельных категорий' +
        'предпринимателей. Эти изменения вступают в силу с 1 июля текущего года',
        new Date(2024, 5, 11, 10, 30),
        null,
        'https://ff-65a4.kxcdn.com/assets/uploads/OriginalDocs_old/511/albelda-codex-facsimile-edition-01.jpg'
      ) as LocalNews,

      NewsCreator.createNews(
        'Новый рекорд продаж технологических гигантов',
        'hottest',
        'Вчерашний день ознаменовался новым рекордом продаж акций ведущих' +
        'технологических компаний. Эксперты отмечают, что рост цен на технологические активы' +
        'продолжается уже не первый месяц, что свидетельствует о стабильности рынка',
        new Date(2024, 5, 10, 8, 0),
        null,
        'https://imageio.forbes.com/specials-images/imageserve/61f030570018a072dc46d1ec/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds'
      ) as HottestNews
    ];
  }

  fetchLocalNews(): LocalNews[] {
    return [
      NewsCreator.createNews(
        'Новый магазин откроется на главной улице',
        'local',
        'В этот пятничный вечер открытие нового магазина соберет много посетителей. ' +
        'Будет представлен широкий ассортимент товаров и интересные акции для покупателей.',
        new Date(2024, 5, 12, 10, 0),
        null, // actualInfo
        'https://live-production.wcms.abc-cdn.net.au/552bf112df877824c11fc8b857242f1e?impolicy=wcms_crop_resize&cropH=2080&cropW=3697&xPos=172&yPos=935&width=862&height=485'
      ),

      NewsCreator.createNews(
        'Парк открывает новые детские площадки',
        'local',
        'В субботу местный парк откроет новые детские площадки. Родители и дети ' +
        'смогут насладиться новыми игровыми элементами и современными развлечениями.',
        new Date(2024, 5, 11, 14, 30),
        null,
        'https://example.com/local-news-image-2.jpg'
      ),


    ];
  }

}
