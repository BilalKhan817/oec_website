import { Component, OnInit } from '@angular/core';

interface ExternalLink {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  type: string;
}

interface LinkCategory {
  id: number;
  name: string;
  icon: string;
  links: ExternalLink[];
}

interface QuickAccessLink {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-useful-links',
  templateUrl: './useful-links.component.html',
  styleUrls: ['./useful-links.component.css']
})
export class UsefulLinksComponent implements OnInit {
  
  linkCategories: LinkCategory[] = [];
  quickAccessLinks: QuickAccessLink[] = [];

  ngOnInit() {
    this.initializeLinkCategories();
    this.initializeQuickAccessLinks();
  }

  initializeLinkCategories() {
    this.linkCategories = [
      {
        id: 1,
        name: 'Government of Pakistan',
        icon: '🇰',
        links: [
          {
            id: 1,
            name: 'Ministry of Overseas Pakistanis & HRD',
            description: 'Official ministry website for overseas employment policies and regulations',
            url: 'https://www.mophrd.gov.pk',
            icon: '🏛️',
            type: 'Government'
          },
          {
            id: 2,
            name: 'Bureau of Emigration & Overseas Employment (BEOE)',
            description: 'Regulatory body for overseas employment and emigration services',
            url: 'https://beoe.gov.pk',
            icon: '📋',
            type: 'Government'
          },
          {
            id: 3,
            name: 'Ministry of Foreign Affairs',
            description: 'Official foreign affairs and diplomatic relations portal',
            url: 'https://mofa.gov.pk',
            icon: '🌍',
            type: 'Government'
          },
          {
            id: 4,
            name: 'Public Procurement Regulatory Authority (PPRA)',
            description: 'Government procurement and regulatory authority',
            url: 'https://ppra.org.pk',
            icon: '⚖️',
            type: 'Government'
          }
        ]
      },
      {
        id: 2,
        name: 'Skill Training & Verification Bodies',
        icon: '🎓',
        links: [
          {
            id: 5,
            name: 'NAVTTC – National Vocational & Technical Training Commission',
            description: 'National authority for vocational and technical training programs',
            url: 'https://navttc.gov.pk',
            icon: '🔧',
            type: 'Training'
          },
          {
            id: 6,
            name: 'Higher Education Commission (HEC)',
            description: 'Higher education regulatory and accreditation body',
            url: 'https://www.hec.gov.pk',
            icon: '🎓',
            type: 'Training'
          },
          {
            id: 7,
            name: 'Pakistan Medical Commission (PMC)',
            description: 'Medical education and healthcare professional regulation',
            url: 'https://pmc.gov.pk',
            icon: '🏥',
            type: 'Training'
          },
          {
            id: 8,
            name: 'DataFlow – Degree Verification',
            description: 'International credential verification and background screening',
            url: 'https://www.dataflowgroup.com',
            icon: '🔍',
            type: 'Training'
          }
        ]
      },
      {
        id: 3,
        name: 'International Employment Partners',
        icon: '🤝',
        links: [
          {
            id: 9,
            name: 'HRD Korea – EPS Program',
            description: 'Korean Human Resources Development Service for EPS program',
            url: 'https://www.hrdkorea.or.kr',
            icon: '🇰🇷',
            type: 'International'
          },
          {
            id: 10,
            name: 'EPS-TOPIK CBT Registration',
            description: 'Computer-based test registration for Korean language proficiency',
            url: 'https://eps.hrdkorea.or.kr',
            icon: '💻',
            type: 'International'
          },
          {
            id: 11,
            name: 'Ministry of Health – Saudi Arabia',
            description: 'Saudi Arabian Ministry of Health for healthcare professionals',
            url: 'https://www.moh.gov.sa',
            icon: '🇸🇦',
            type: 'International'
          }
        ]
      },
      {
        id: 4,
        name: 'Visa & Immigration',
        icon: '🛂',
        links: [
          {
            id: 12,
            name: 'Pakistan Directorate of Immigration',
            description: 'Official immigration and passport services portal',
            url: 'https://dgip.gov.pk',
            icon: '📄',
            type: 'Visa'
          },
          {
            id: 13,
            name: 'IOM Pakistan – Safe Migration Support',
            description: 'International Organization for Migration support services',
            url: 'https://pakistan.iom.int',
            icon: '✈️',
            type: 'Visa'
          },
          {
            id: 14,
            name: 'Protectorate of Emigrants',
            description: 'Emigration protection and regulatory services',
            url: 'https://beoe.gov.pk/peoffices',
            icon: '🛡️',
            type: 'Visa'
          }
        ]
      },
      {
        id: 5,
        name: 'OEC Digital Services',
        icon: '💻',
        links: [
          {
            id: 15,
            name: 'OEC Portal Login',
            description: 'Official OEC job portal for applications and registrations',
            url: 'https://jobs.oec.gov.pk',
            icon: '🔐',
            type: 'Digital'
          },
          {
            id: 16,
            name: 'EPS Korea Registration Portal',
            description: 'Dedicated portal for EPS Korea program registrations',
            url: 'https://eps.oec.gov.pk',
            icon: '🇰🇷',
            type: 'Digital'
          },
          {
            id: 17,
            name: 'OEC YouTube Channel',
            description: 'Official YouTube channel for orientation videos and updates',
            url: 'https://www.youtube.com/@OECpakistan',
            icon: '📺',
            type: 'Digital'
          }
        ]
      }
    ];
  }

  initializeQuickAccessLinks() {
    this.quickAccessLinks = [
      {
        id: 1,
        title: 'OEC Job Portal',
        description: 'Access the main OEC job portal for current opportunities',
        url: 'https://jobs.oec.gov.pk',
        icon: '💼'
      },
      {
        id: 2,
        title: 'EPS Korea Registration',
        description: 'Register for EPS Korea program and CBT tests',
        url: 'https://eps.oec.gov.pk',
        icon: '🇰🇷'
      },
      {
        id: 3,
        title: 'Document Verification',
        description: 'Verify your educational credentials and certificates',
        url: 'https://www.dataflowgroup.com',
        icon: '🔍'
      },
      {
        id: 4,
        title: 'Training Programs',
        description: 'Access NAVTTC training programs and certifications',
        url: 'https://navttc.gov.pk',
        icon: '🎓'
      }
    ];
  }
}
