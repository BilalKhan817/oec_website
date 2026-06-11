import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface PressRelease {
  _id: string;
  headline: string;
  summary: string;
  date: string;
  category: string;
  pdf_link: string;
  read_link: string;
  is_urgent: boolean;
}

@Component({
  selector: 'app-press-release',
  templateUrl: './press-release.component.html',
  styleUrls: ['./press-release.component.css']
})
export class PressReleaseComponent implements OnInit {

  pressReleases: PressRelease[] = [];
  isLoading = true;

  totalPressReleases: number = 0;
  urgentReleases: number = 0;
  categoriesCount: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPressReleases();
  }

  loadPressReleases(): void {
    this.apiService.getPressReleasesPage().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.pressReleases = response.data;
          this.calculateStats();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  calculateStats(): void {
    this.totalPressReleases = this.pressReleases.length;
    this.urgentReleases = this.pressReleases.filter(p => p.is_urgent).length;
    const uniqueCategories = new Set(this.pressReleases.map(p => p.category).filter(c => c));
    this.categoriesCount = uniqueCategories.size;
  }
}
