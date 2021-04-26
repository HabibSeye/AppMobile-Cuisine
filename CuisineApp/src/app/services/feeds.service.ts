import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as converter from 'xml-js';
import { ArticleFeed } from '../interfaces/article-feed';


@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  url: string[] = [
    'https://cuisine-facile.com/rss-blog.xml',
    // 'https://www.lemonde.fr/basket/rss_full.xml'
]

  constructor(private http: HttpClient) { }

getDataByUrl(){

  return new Promise((resolve, rejects) => {
// for(let i= 0; i < this.url.length; i++)

  });
}



requestDataByUrl(url: string){

  return new Promise((resolve, rejects) => {
    this.http.request('GET', url, { responseType: 'text' }).subscribe((data) => {
      const articles: ArticleFeed[] = [];

      const object = JSON.parse(converter.xml2json(data, { compact: true, spaces: 2 }));
      const items = object.rss.channel.item;
      console.log(items);
      for (const item of items) {
        articles.push({
          description:  item.description._cdata,
          title: item.title._text,
          subtitle: '',
          pubDate: item.pubDate._text,
          guid: item.guid._text,
          link: item.link._text,


        });
    }
      console.dir(articles);


  });
  });
}
}
