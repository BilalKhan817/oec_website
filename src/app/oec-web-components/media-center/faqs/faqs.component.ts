import { Component, OnInit } from '@angular/core';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface FAQCategory {
  id: number;
  name: string;
  icon: string;
  faqs: FAQ[];
}

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  
  faqCategories: CategoryItem[] = [];
  faqData: FAQCategory[] = [];
  
  totalFaqs: number = 0;
  totalCategories: number = 0;
  generalFaqs: number = 0;
  applicationFaqs: number = 0;

  ngOnInit() {
    this.initializeFaqCategories();
    this.initializeFaqData();
  }

  initializeFaqCategories() {
    this.faqCategories = [
      {
        id: 1,
        title: 'General Information',
        description: 'Basic questions about OEC and its services',
        icon: '🏢'
      },
      {
        id: 2,
        title: 'Application & Registration',
        description: 'How to apply and register for overseas jobs',
        icon: '📝'
      },
      {
        id: 3,
        title: 'EPS Korea',
        description: 'Specific questions about EPS Korea program',
        icon: '🇰🇷'
      },
      {
        id: 4,
        title: 'Medical & Visa Process',
        description: 'Medical requirements and visa procedures',
        icon: '🏥'
      },
      {
        id: 5,
        title: 'Post-Selection Support',
        description: 'Support after job selection',
        icon: '🤝'
      },
      {
        id: 6,
        title: 'Employers & MoUs',
        description: 'Information about employers and agreements',
        icon: '📋'
      },
      {
        id: 7,
        title: 'Payments & Fees',
        description: 'Fee structure and payment methods',
        icon: '💰'
      }
    ];
  }

  initializeFaqData() {
    this.faqData = [
      {
        id: 1,
        name: 'General',
        icon: '🏢',
        faqs: [
          {
            id: 1,
            question: 'What is OEC and what does it do?',
            answer: 'OEC (Overseas Employment Corporation) is a public sector organization under the Government of Pakistan that facilitates legal and ethical overseas employment opportunities for Pakistani citizens.',
            isExpanded: false
          },
          {
            id: 2,
            question: 'Is OEC the only government body for overseas jobs?',
            answer: 'Yes, OEC is the only official government-owned corporation for manpower export under the Ministry of Overseas Pakistanis & HRD.',
            isExpanded: false
          }
        ]
      },
      {
        id: 2,
        name: 'Application & Registration',
        icon: '📝',
        faqs: [
          {
            id: 3,
            question: 'How can I apply for a foreign job through OEC?',
            answer: 'Visit www.oec.gov.pk, register on the portal, and apply to the active job advertisements after submitting the required fee.',
            isExpanded: false
          },
          {
            id: 4,
            question: 'What documents are required?',
            answer: 'CNIC, Passport, Educational Certificates, Experience Letters, and Fee Challan.',
            isExpanded: false
          }
        ]
      },
      {
        id: 3,
        name: 'EPS Korea',
        icon: '🇰🇷',
        faqs: [
          {
            id: 5,
            question: 'How to register for EPS Korea?',
            answer: 'Follow the specific advertisement for EPS Korea and register through OEC Portal within the timeline. Training and CBT test info will also be provided.',
            isExpanded: false
          },
          {
            id: 6,
            question: 'Is Korean language necessary?',
            answer: 'Yes. You must pass the CBT (EPS-TOPIK) exam, which tests basic Korean language and workplace terms.',
            isExpanded: false
          }
        ]
      },
      {
        id: 4,
        name: 'Visa & Medical',
        icon: '🏥',
        faqs: [
          {
            id: 7,
            question: 'Who arranges medical and protector after selection?',
            answer: 'OEC guides the candidate in selecting approved centers. Applicants bear the cost as per the notification.',
            isExpanded: false
          },
          {
            id: 8,
            question: 'Is visa guaranteed after selection?',
            answer: 'Visa is subject to employer and embassy approval. OEC facilitates but does not guarantee visa issuance.',
            isExpanded: false
          }
        ]
      },
      {
        id: 5,
        name: 'Fees',
        icon: '💰',
        faqs: [
          {
            id: 9,
            question: 'How much does it cost to apply through OEC?',
            answer: 'It varies per demand, country, and job type — and is always mentioned in each job advertisement. No agent or unauthorized fee is allowed.',
            isExpanded: false
          },
          {
            id: 10,
            question: 'Can I pay online?',
            answer: 'Yes. OEC allows online fee submission via challan, bank deposit, or mobile banking (coming soon).',
            isExpanded: false
          }
        ]
      }
    ];
  }

  toggleFaq(faq: FAQ) {
    faq.isExpanded = !faq.isExpanded;
  }
}
