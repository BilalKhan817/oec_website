import { Component, OnInit } from '@angular/core';

interface DocumentCategory {
  id: number;
  name: string;
  icon: string;
  documentTypes: string;
}

interface SampleDocument {
  id: number;
  name: string;
  format: string;
  size: string;
  description: string;
  languages: string[];
  downloadLink: string;
  downloadCount?: number;
  icon: string;
}

interface FilterTag {
  id: number;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-document-downloads',
  templateUrl: './document-downloads.component.html',
  styleUrls: ['./document-downloads.component.css']
})
export class DocumentDownloadsComponent implements OnInit {
  
  documentCategories: DocumentCategory[] = [];
  sampleDocuments: SampleDocument[] = [];
  filterTags: FilterTag[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.initializeDocumentCategories();
    this.initializeSampleDocuments();
    this.initializeFilterTags();
  }

  initializeDocumentCategories() {
    this.documentCategories = [
      {
        id: 1,
        name: 'Forms & Templates',
        icon: '📝',
        documentTypes: 'Application Form, Challan Form, Validator Form'
      },
      {
        id: 2,
        name: 'Guides & Manuals',
        icon: '📚',
        documentTypes: 'EPS Korea Handbook, Orientation Guidelines, CBT Sample Guide'
      },
      {
        id: 3,
        name: 'Policies & Notifications',
        icon: '📋',
        documentTypes: 'Service Fee Notifications, Employment Rules, MoU Announcements'
      },
      {
        id: 4,
        name: 'Checklists',
        icon: '✅',
        documentTypes: 'Pre-Departure Checklist, Visa Process Checklist'
      },
      {
        id: 5,
        name: 'Training Material',
        icon: '🎓',
        documentTypes: 'Language Practice Sheets, Interview Tips, Sector-Based Brochures'
      }
    ];
  }

  initializeSampleDocuments() {
    this.sampleDocuments = [
      {
        id: 1,
        name: 'EPS Registration Form (2025)',
        format: 'PDF',
        size: '500 KB',
        description: 'Official registration form for EPS Korea program with all required fields and instructions.',
        languages: ['🇬🇧 English', '🇰🇷 Korean'],
        downloadLink: '#',
        downloadCount: 1250,
        icon: '📝'
      },
      {
        id: 2,
        name: 'OEC Service Fee Notification – All Sectors',
        format: 'PDF',
        size: '300 KB',
        description: 'Complete fee structure and payment guidelines for all employment sectors.',
        languages: ['🇬🇧 English', '🇵🇰 Urdu'],
        downloadLink: '#',
        downloadCount: 890,
        icon: '💰'
      },
      {
        id: 3,
        name: 'CBT Practice Test – Korean',
        format: 'PDF',
        size: '1.2 MB',
        description: 'Sample computer-based test questions for Korean language proficiency.',
        languages: ['🇬🇧 English', '🇰🇷 Korean'],
        downloadLink: '#',
        downloadCount: 2100,
        icon: '🧠'
      },
      {
        id: 4,
        name: 'MoU Summary – Italy Nurses Deployment',
        format: 'PDF',
        size: '600 KB',
        description: 'Memorandum of Understanding details for nursing professionals to Italy.',
        languages: ['🇬🇧 English', '🇮🇹 Italian'],
        downloadLink: '#',
        downloadCount: 450,
        icon: '🤝'
      },
      {
        id: 5,
        name: 'Employer Demand Submission Template',
        format: 'DOCX',
        size: '150 KB',
        description: 'Template for employers to submit job demand requirements to OEC.',
        languages: ['🇬🇧 English'],
        downloadLink: '#',
        downloadCount: 320,
        icon: '📋'
      },
      {
        id: 6,
        name: 'Pre-Departure Orientation Booklet',
        format: 'PDF',
        size: '850 KB',
        description: 'Comprehensive guide for workers preparing for overseas employment.',
        languages: ['🇬🇧 English', '🇵🇰 Urdu'],
        downloadLink: '#',
        downloadCount: 1800,
        icon: '✈️'
      }
    ];
  }

  initializeFilterTags() {
    this.filterTags = [
      { id: 1, name: 'All Documents', active: true },
      { id: 2, name: 'Forms', active: false },
      { id: 3, name: 'Guides', active: false },
      { id: 4, name: 'Policies', active: false },
      { id: 5, name: 'Training', active: false },
      { id: 6, name: 'PDF', active: false },
      { id: 7, name: 'DOCX', active: false }
    ];
  }

  filterDocuments() {
    // Implementation for filtering documents based on search term
    console.log('Filtering documents with term:', this.searchTerm);
  }

  toggleFilter(tag: FilterTag) {
    // Deactivate all tags
    this.filterTags.forEach(t => t.active = false);
    // Activate clicked tag
    tag.active = true;
    
    // Implementation for filtering documents based on selected tag
    console.log('Filtering by tag:', tag.name);
  }
}
