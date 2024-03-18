import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  developerInfo: any = {
    developerName: 'Kartik Chhabra',
    developerProfile:
      'https://in.linkedin.com/in/kartik-chhabra-65a2b822b?trk=people-guest_people_search-card',
  };
  currentYear: any = new Date().getFullYear();
}
