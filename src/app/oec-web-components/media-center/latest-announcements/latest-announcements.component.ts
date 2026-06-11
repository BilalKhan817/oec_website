import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface Announcement {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  country: string;
  link: string;
  is_urgent: boolean;
}

@Component({
  selector: 'app-latest-announcements',
  templateUrl: './latest-announcements.component.html',
  styleUrls: ['./latest-announcements.component.css']
})
export class LatestAnnouncementsComponent implements OnInit {

  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  isLoading = true;

  selectedCountry: string = '';
  selectedCategory: string = '';

  totalAnnouncements: number = 0;
  urgentAnnouncements: number = 0;
  activeCountries: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.apiService.getLatestAnnouncementsPage().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.announcements = response.data;
          this.calculateStats();
          this.filterAnnouncements();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterAnnouncements(): void {
    this.filteredAnnouncements = this.announcements.filter(announcement => {
      let matchesCountry = true;
      let matchesCategory = true;

      if (this.selectedCountry && announcement.country !== 'All') {
        matchesCountry = announcement.country === this.selectedCountry;
      }

      if (this.selectedCategory) {
        matchesCategory = announcement.category === this.selectedCategory;
      }

      return matchesCountry && matchesCategory;
    });
  }

  calculateStats() {
    this.totalAnnouncements = this.announcements.length;
    this.urgentAnnouncements = this.announcements.filter(a => a.is_urgent).length;
    const uniqueCountries = new Set(this.announcements.map(a => a.country).filter(c => c));
    this.activeCountries = uniqueCountries.size;
  }

  getUniqueCountries(): string[] {
    return [...new Set(this.announcements.map(a => a.country).filter(c => c && c !== 'All'))];
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.announcements.map(a => a.category).filter(c => c))];
  }
}
