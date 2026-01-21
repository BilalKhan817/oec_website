import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-our-functions',
  templateUrl: './our-functions.component.html',
  styleUrls: ['./our-functions.component.css']
})
export class OurFunctionsComponent implements OnInit {
  content: any = null;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOurFunctionsContent();
  }

  loadOurFunctionsContent(): void {
    this.apiService.getOurFunctions().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.content = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading our functions content:', error);
        this.isLoading = false;
      }
    });
  }
}
