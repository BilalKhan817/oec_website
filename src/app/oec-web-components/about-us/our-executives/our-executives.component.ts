import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-our-executives',
  templateUrl: './our-executives.component.html',
  styleUrls: ['./our-executives.component.css']
})
export class OurExecutivesComponent {

  executives!: any[];
  
  constructor(private apiService: ApiService) {
    this.getExecutives();
  }

  getExecutives() {
    this.apiService.getExecutives().subscribe((data: any) => {
      this.executives = data.data;
    });
  }
  getExecutiveImageUrl(executive: any): string {
    if (executive.image_url) {
      return this.apiService.getImageUrl(executive.image_url);
    }
    return 'https://via.placeholder.com/300x200?text=No+Image';
  }
}
