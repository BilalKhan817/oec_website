import { Component, OnInit } from '@angular/core';

interface PressRelease {
  id: number;
  headline: string;
  summary: string;
  date: string;
  category: string;
  pdfLink: string;
  readLink: string;
  actionText: string;
  isUrgent: boolean;
}

@Component({
  selector: 'app-press-release',
  templateUrl: './press-release.component.html',
  styleUrls: ['./press-release.component.css']
})
export class PressReleaseComponent implements OnInit {
  
  pressReleases: PressRelease[] = [];
  
  totalPressReleases: number = 0;
  thisYearReleases: number = 0;
  urgentReleases: number = 0;
  categoriesCount: number = 0;

  ngOnInit() {
    this.initializePressReleases();
  }

  initializePressReleases() {
    this.pressReleases = [
      {
        id: 1,
        headline: 'OEC Signs Strategic MoU with Italian Health Ministry',
        summary: 'OEC has formalized an agreement to deploy qualified female nurses to public sector hospitals in Italy.',
        date: 'April 22, 2025',
        category: 'Agreement',
        pdfLink: '#',
        readLink: '#',
        actionText: 'Read Full',
        isUrgent: true
      },
      {
        id: 2,
        headline: 'Important Public Advisory: Beware of Fake Agents & Payment Fraud',
        summary: 'OEC warns applicants against unauthorized recruiters and clarifies that all payments must be made via government challans only.',
        date: 'March 3, 2025',
        category: 'Advisory',
        pdfLink: '#',
        readLink: '#',
        actionText: 'Download PDF',
        isUrgent: true
      },
      {
        id: 3,
        headline: 'OEC to Launch AI-Based Recruitment Portal by Q3 2025',
        summary: 'The move aims to reduce delays and improve transparency in the overseas manpower selection process.',
        date: 'February 15, 2025',
        category: 'Innovation',
        pdfLink: '#',
        readLink: '#',
        actionText: 'View Press Statement',
        isUrgent: false
      },
      {
        id: 4,
        headline: 'New Partnership Agreement with Saudi Ministry of Health',
        summary: 'OEC announces expanded healthcare worker deployment program to Saudi Arabia under new bilateral agreement.',
        date: 'January 28, 2025',
        category: 'Agreement',
        pdfLink: '#',
        readLink: '#',
        actionText: 'Read Full',
        isUrgent: false
      },
      {
        id: 5,
        headline: 'Updated Fee Structure for Overseas Employment Services',
        summary: 'OEC announces revised fee structure effective from next month. All applicants must follow new payment procedures.',
        date: 'January 15, 2025',
        category: 'Advisory',
        pdfLink: '#',
        readLink: '#',
        actionText: 'Download PDF',
        isUrgent: false
      },
      {
        id: 6,
        headline: 'Digital Transformation Initiative: Online Application Portal Launch',
        summary: 'OEC launches comprehensive digital platform to streamline overseas employment application process.',
        date: 'December 10, 2024',
        category: 'Innovation',
        pdfLink: '#',
        readLink: '#',
        actionText: 'View Press Statement',
        isUrgent: false
      }
    ];
  }
}
