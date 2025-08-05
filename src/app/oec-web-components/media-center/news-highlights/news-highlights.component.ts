import { Component, OnInit } from '@angular/core';

interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  date: string;
  project: string;
  mediaType: string;
  mediaLogo: string;
  thumbnailIcon: string;
  readLink: string;
  videoLink?: string;
}

interface MediaPartner {
  id: number;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-news-highlights',
  templateUrl: './news-highlights.component.html',
  styleUrls: ['./news-highlights.component.css']
})
export class NewsHighlightsComponent implements OnInit {
  
  newsItems: NewsItem[] = [];
  filteredNews: NewsItem[] = [];
  mediaPartners: MediaPartner[] = [];
  
  selectedYear: string = '';
  selectedProject: string = '';
  selectedMedia: string = '';
  
  totalNewsItems: number = 0;
  tvCoverage: number = 0;
  digitalCoverage: number = 0;
  internationalCoverage: number = 0;

  ngOnInit() {
    this.initializeNewsItems();
    this.initializeMediaPartners();
    this.filterNews();
  }

  initializeNewsItems() {
    this.newsItems = [
      {
        id: 1,
        headline: 'OEC Launches AI-Based Job Matching Portal for Overseas Employers',
        summary: 'The newly introduced AI-driven recruitment tool will help reduce human bias and improve match accuracy for job seekers.',
        date: 'Feb 12, 2025',
        project: 'AI Portal',
        mediaType: 'Digital',
        mediaLogo: '📱',
        thumbnailIcon: '🤖',
        readLink: '#',
        videoLink: '#'
      },
      {
        id: 2,
        headline: 'Pakistan Deploys 200 Female Nurses to Italy Through OEC',
        summary: 'Coverage by PTV News, ARY, and Dawn. Recognized as a major breakthrough in female overseas employment.',
        date: 'March 5, 2025',
        project: 'Italy Nurses',
        mediaType: 'TV',
        mediaLogo: '📺',
        thumbnailIcon: '👩‍⚕️',
        readLink: '#',
        videoLink: '#'
      },
      {
        id: 3,
        headline: 'OEC Signs MoU with GIZ for Vocational Mobility to Germany',
        summary: 'The agreement aims to open up new job categories in Europe for certified Pakistani workers.',
        date: 'April 10, 2025',
        project: 'Germany GIZ',
        mediaType: 'International',
        mediaLogo: '🌍',
        thumbnailIcon: '🤝',
        readLink: '#'
      },
      {
        id: 4,
        headline: 'EPS Korea 2025 Registrations Surpass 25,000 Applicants',
        summary: 'A record-breaking registration cycle shows high public trust in G2G programs.',
        date: 'May 3, 2025',
        project: 'EPS Korea',
        mediaType: 'Print',
        mediaLogo: '📰',
        thumbnailIcon: '🇰🇷',
        readLink: '#'
      },
      {
        id: 5,
        headline: 'OEC Introduces Digital Payment System for Overseas Employment',
        summary: 'New online payment gateway streamlines fee collection and reduces processing time for applicants.',
        date: 'January 15, 2025',
        project: 'AI Portal',
        mediaType: 'Digital',
        mediaLogo: '💳',
        thumbnailIcon: '💻',
        readLink: '#'
      },
      {
        id: 6,
        headline: 'OEC Partners with Leading European Healthcare Institutions',
        summary: 'Strategic partnerships established with hospitals in Germany, Italy, and Netherlands for healthcare worker deployment.',
        date: 'December 20, 2024',
        project: 'Italy Nurses',
        mediaType: 'International',
        mediaLogo: '🏥',
        thumbnailIcon: '🌍',
        readLink: '#'
      }
    ];
  }

  initializeMediaPartners() {
    this.mediaPartners = [
      { id: 1, name: 'Dawn News', logo: '📰' },
      { id: 2, name: 'Geo News', logo: '📺' },
      { id: 3, name: 'ARY News', logo: '📺' },
      { id: 4, name: 'Express Tribune', logo: '📰' },
      { id: 5, name: 'PTV News', logo: '📺' },
      { id: 6, name: 'Dunya News', logo: '📺' },
      { id: 7, name: 'BBC Urdu', logo: '🌍' },
      { id: 8, name: 'Reuters', logo: '🌍' }
    ];
  }

  filterNews(): void {
    this.filteredNews = this.newsItems.filter(news => {
      let matchesYear = true;
      let matchesProject = true;
      let matchesMedia = true;

      // Year filter
      if (this.selectedYear) {
        const newsYear = new Date(news.date).getFullYear().toString();
        matchesYear = newsYear === this.selectedYear;
      }

      // Project filter
      if (this.selectedProject) {
        matchesProject = news.project === this.selectedProject;
      }

      // Media type filter
      if (this.selectedMedia) {
        matchesMedia = news.mediaType === this.selectedMedia;
      }

      return matchesYear && matchesProject && matchesMedia;
    });
  }
}
