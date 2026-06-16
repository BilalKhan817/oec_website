import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

interface FooterLink {
  label: string;
  route?: string; // internal SPA route
  url?: string;   // external URL
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  // Defaults; overwritten by the admin-managed footer settings.
  settings: any = {
    office_name: 'OEC Headquarters Islamabad',
    address: '6th Floor of the EOBI Tower Building, G-10/4, Islamabad',
    tel: '+051-9108401-12',
    fax: '+92-51-9253244',
    email: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  };

  columns: { title: string; links: FooterLink[] }[] = [
    {
      title: 'About',
      links: [
        { label: 'Home', route: '/home' },
        { label: 'About OEC', route: '/about-us' },
        { label: 'OEC at a Glance', route: '/oec-at-glance' },
        { label: 'Our Functions', route: '/our-functions' },
        { label: 'Why Choose OEC', route: '/why-choose-oec' },
        { label: 'Governing Law', route: '/governing-law' },
        { label: 'Leadership', route: '/our-executives' },
        { label: 'Board of Directors', route: '/board-of-directors' },
        { label: 'Contact Us', route: '/contact-us' }
      ]
    },
    {
      title: 'Media Center',
      links: [
        { label: 'Announcements', route: '/latest-announcements' },
        { label: 'News Highlights', route: '/news-highlights' },
        { label: 'Press Releases', route: '/press-release' },
        { label: 'Gallery', route: '/gallery' },
        { label: 'Careers / Internal Jobs', route: '/careers' },
        { label: 'FAQs', route: '/faqs' },
        { label: 'Useful Links', route: '/useful-links' },
        { label: 'Document Downloads', route: '/document-downloads' }
      ]
    },
    {
      title: 'Emigrants',
      links: [
        { label: 'EPS Korea', route: '/eps' },
        { label: 'Protector Process Guide', route: '/protector-process-guide' },
        { label: 'Foreign Service Agreements', route: '/foreign-service-agreements' },
        { label: 'Industries We Serve', route: '/industries' },
        { label: 'Pre-Departure Training', route: '/pre-departure-training' },
        { label: 'Service Timelines', route: '/service-timelines' },
        { label: 'Fee Structure', route: '/fees-structure' }
      ]
    },
    {
      title: 'Development Hub',
      links: [
        { label: 'Future Plans', route: '/future-plans' },
        { label: 'Signed MoUs', route: '/mous' },
        { label: 'Projects', route: '/projects' },
        { label: 'Success Stories', route: '/success-stories' },
        { label: 'Key Achievements', route: '/key-achievements' }
      ]
    },
    {
      title: 'Job Portal',
      links: [
        { label: 'Login', url: 'https://jobs.oec.gov.pk/login' },
        { label: 'Register', url: 'https://jobs.oec.gov.pk/register' },
        { label: 'OEP Portal', route: '/oep' },
        { label: 'Foreign Employers', route: '/foreign-employer' }
      ]
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFooterSettings().subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          this.settings = Object.assign({}, this.settings, response.data);
        }
      },
      error: (error: any) => console.error('Error loading footer settings:', error)
    });
  }

  get hasSocial(): boolean {
    return !!(this.settings.facebook || this.settings.twitter || this.settings.linkedin ||
      this.settings.instagram || this.settings.youtube);
  }
}
