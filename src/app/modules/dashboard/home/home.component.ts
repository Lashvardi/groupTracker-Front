import { GetDashboardInfoService } from './../extensions/get-dashboard-info.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quotes: string[] = [
    "Organization isn't about perfection; it's about efficiency, reducing stress & clutter, and elevating the quality of life. - Christina Scalise",
    'Simplicity is the ultimate sophistication. - Leonardo da Vinci',
    'For every minute spent organizing, an hour is earned. - Benjamin Franklin',
    'The best way to predict the future is to invent it. - Alan Kay',
    'The only way to do great work is to love what you do. - Steve Jobs',
    'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
  ];

  currentQuote!: string;

  constructor(private _dashboardService: GetDashboardInfoService) {
    this.generateQuotes();

    console.log(this._dashboardService.getDashboardInfo());
  }

  generateQuotes() {
    this.currentQuote =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }
}
