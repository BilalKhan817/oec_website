import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  content: any = null;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAboutUsContent();
  }

  loadAboutUsContent(): void {
    this.apiService.getAboutUsContent().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.content = response.data;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading About Us content:', error);
        this.isLoading = false;
      }
    });
  }
}
