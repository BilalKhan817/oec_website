import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-oec-at-glance',
  templateUrl: './oec-at-glance.component.html',
  styleUrls: ['./oec-at-glance.component.css']
})
export class OecAtGlanceComponent implements OnInit {
  content: any = null;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOecAtGlanceContent();
  }

  loadOecAtGlanceContent(): void {
    this.apiService.getOecAtGlance().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.content = response.data;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading OEC at Glance content:', error);
        this.isLoading = false;
      }
    });
  }
}
