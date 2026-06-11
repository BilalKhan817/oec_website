import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface NewsItem {
  _id: string;
  headline: string;
  summary: string;
  date: string;
  project: string;
  media_type: string;
  read_link: string;
  video_link: string;
}

@Component({
  selector: 'app-news-highlights',
  templateUrl: './news-highlights.component.html',
  styleUrls: ['./news-highlights.component.css']
})
export class NewsHighlightsComponent implements OnInit {

  newsItems: NewsItem[] = [];
  filteredNews: NewsItem[] = [];
  isLoading = true;

  selectedProject: string = '';
  selectedMedia: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(): void {
    this.apiService.getNewsHighlightsPage().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.newsItems = response.data;
          this.filterNews();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterNews(): void {
    this.filteredNews = this.newsItems.filter(news => {
      let matchesProject = true;
      let matchesMedia = true;

      if (this.selectedProject) {
        matchesProject = news.project === this.selectedProject;
      }

      if (this.selectedMedia) {
        matchesMedia = news.media_type === this.selectedMedia;
      }

      return matchesProject && matchesMedia;
    });
  }

  getUniqueProjects(): string[] {
    return [...new Set(this.newsItems.map(n => n.project).filter(p => p))];
  }

  getUniqueMediaTypes(): string[] {
    return [...new Set(this.newsItems.map(n => n.media_type).filter(m => m))];
  }
}
