import { Component , OnInit } from '@angular/core';
import { FeedsService } from '../services/feeds.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  constructor(private feed: FeedsService){}

  async ngOnInit() {
     this.feed.requestDataByUrl(this.feed.url[0])
}


}
