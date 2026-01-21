import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-governing-law',
  templateUrl: './governing-law.component.html',
  styleUrls: ['./governing-law.component.css']
})
export class GoverningLawComponent implements OnInit {
  content: any = null;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadGoverningLawContent();
  }

  loadGoverningLawContent(): void {
    this.apiService.getGoverningLawContent().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.content = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading governing law content:', error);
        this.isLoading = false;
      }
    });
  }
}
