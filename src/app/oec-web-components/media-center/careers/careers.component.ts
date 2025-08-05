import { Component, OnInit } from '@angular/core';

interface JobPosting {
  id: number;
  title: string;
  grade: string;
  location: string;
  deadline: string;
  icon: string;
  applyLink: string;
  actionIcon: string;
  actionText: string;
}

interface DownloadableForm {
  id: number;
  title: string;
  description: string;
  icon: string;
  downloadLink: string;
}

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  
  jobPostings: JobPosting[] = [];
  downloadableForms: DownloadableForm[] = [];
  
  totalPositions: number = 0;
  internshipSlots: number = 0;
  consultantRoles: number = 0;
  applicationForms: number = 0;

  ngOnInit() {
    this.initializeJobPostings();
    this.initializeDownloadableForms();
    this.calculateStats();
  }

  initializeJobPostings() {
    this.jobPostings = [
      {
        id: 1,
        title: 'Assistant Director (IT)',
        grade: 'BPS-17',
        location: 'Islamabad',
        deadline: 'March 15, 2025',
        icon: '💻',
        applyLink: '#',
        actionIcon: '📝',
        actionText: 'Apply Now'
      },
      {
        id: 2,
        title: 'HR Intern (Paid)',
        grade: '3 Months',
        location: 'Lahore Office',
        deadline: 'March 30, 2025',
        icon: '👥',
        applyLink: '#',
        actionIcon: '📝',
        actionText: 'Apply Now'
      },
      {
        id: 3,
        title: 'Legal Advisor (Consultant)',
        grade: 'Short-Term',
        location: 'Remote/Islamabad',
        deadline: 'April 10, 2025',
        icon: '⚖️',
        applyLink: '#',
        actionIcon: '👁️',
        actionText: 'View Details'
      },
      {
        id: 4,
        title: 'Marketing Officer',
        grade: 'BPS-16',
        location: 'Karachi',
        deadline: 'March 25, 2025',
        icon: '📢',
        applyLink: '#',
        actionIcon: '📝',
        actionText: 'Apply Now'
      },
      {
        id: 5,
        title: 'International Relations Specialist',
        grade: 'BPS-18',
        location: 'Islamabad',
        deadline: 'April 5, 2025',
        icon: '🌍',
        applyLink: '#',
        actionIcon: '📝',
        actionText: 'Apply Now'
      },
      {
        id: 6,
        title: 'Software Developer (Contract)',
        grade: '6 Months',
        location: 'Lahore',
        deadline: 'March 20, 2025',
        icon: '🔧',
        applyLink: '#',
        actionIcon: '📝',
        actionText: 'Apply Now'
      }
    ];
  }

  initializeDownloadableForms() {
    this.downloadableForms = [
      {
        id: 1,
        title: 'Employment Application Form (BPS)',
        description: 'Standard application form for BPS positions with all required fields and instructions.',
        icon: '📝',
        downloadLink: '#'
      },
      {
        id: 2,
        title: 'Consultant Registration Form',
        description: 'Application form for consultant positions with detailed requirements and terms.',
        icon: '📄',
        downloadLink: '#'
      },
      {
        id: 3,
        title: 'Internship Application Template',
        description: 'Template for internship applications with guidelines and requirements.',
        icon: '📋',
        downloadLink: '#'
      },
      {
        id: 4,
        title: 'Hiring SOP (Updated 2025)',
        description: 'Standard Operating Procedures for hiring and recruitment processes.',
        icon: '🗂️',
        downloadLink: '#'
      }
    ];
  }

  calculateStats() {
    this.totalPositions = this.jobPostings.length;
    this.internshipSlots = 15; // Fixed number for internship slots
    this.consultantRoles = this.jobPostings.filter(job => job.grade.toLowerCase().includes('consultant') || job.grade.toLowerCase().includes('short-term')).length;
    this.applicationForms = this.downloadableForms.length;
  }
}
