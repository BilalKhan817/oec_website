import { Component, OnInit } from '@angular/core';

interface Announcement {
  id: number;
  title: string;
  description: string;
  postedDate: string;
  category: string;
  country: string;
  countryFlag: string;
  icon: string;
  actionText: string;
  actionIcon: string;
  link: string;
  isUrgent: boolean;
}

@Component({
  selector: 'app-latest-announcements',
  templateUrl: './latest-announcements.component.html',
  styleUrls: ['./latest-announcements.component.css']
})
export class LatestAnnouncementsComponent implements OnInit {
  
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  
  selectedCountry: string = '';
  selectedCategory: string = '';
  selectedDateRange: string = '';
  
  totalAnnouncements: number = 0;
  urgentAnnouncements: number = 0;
  thisWeekAnnouncements: number = 0;
  activeCountries: number = 0;

  ngOnInit() {
    this.initializeAnnouncements();
    this.calculateStats();
    this.filterAnnouncements();
  }

  initializeAnnouncements() {
    this.announcements = [
      {
        id: 1,
        title: 'EPS-TOPIK 2025 CBT Exam Schedule Released',
        description: 'Important notice for all EPS Korea applicants. The Computer-Based Test (CBT) schedule for 2025 has been officially released. All registered candidates must check their exam dates and venues.',
        postedDate: 'March 10, 2025',
        category: 'EPS',
        country: 'Korea',
        countryFlag: '🇰🇷',
        icon: '📋',
        actionText: 'View PDF',
        actionIcon: '📄',
        link: '#',
        isUrgent: true
      },
      {
        id: 2,
        title: 'New Job Demand – Nurses for KSA (MNGHA Project)',
        description: 'Excellent opportunity for qualified nurses. The Ministry of National Guard Health Affairs (MNGHA) is seeking experienced healthcare professionals for various departments.',
        postedDate: 'April 2, 2025',
        category: 'Job Demand',
        country: 'KSA',
        countryFlag: '🇸🇦',
        icon: '🏥',
        actionText: 'Apply Now',
        actionIcon: '📝',
        link: '#',
        isUrgent: true
      },
      {
        id: 3,
        title: 'Deadline Extended: Interview Registration for Italy Nurses',
        description: 'Due to high demand, the registration deadline for Italy Nurses Project interviews has been extended. Qualified candidates are encouraged to apply before the new deadline.',
        postedDate: 'May 15, 2025',
        category: 'Interviews',
        country: 'Italy',
        countryFlag: '🇮🇹',
        icon: '👩‍⚕️',
        actionText: 'Read More',
        actionIcon: '📖',
        link: '#',
        isUrgent: false
      },
      {
        id: 4,
        title: 'Important Notice: Only Official Challan Payments Accepted',
        description: 'All applicants must use official OEC challan forms for fee payments. Any other payment methods will not be accepted. Please ensure you follow the correct payment procedure.',
        postedDate: 'Ongoing',
        category: 'Fee Notice',
        country: 'All',
        countryFlag: '🌍',
        icon: '💰',
        actionText: 'Fee Policy',
        actionIcon: '📋',
        link: '#',
        isUrgent: true
      },
      {
        id: 5,
        title: 'Pre-Departure Orientation Schedule for Japan TITP',
        description: 'Mandatory orientation sessions for Technical Intern Training Program (TITP) participants heading to Japan. Attendance is compulsory for all selected candidates.',
        postedDate: 'June 1, 2025',
        category: 'Orientation',
        country: 'Japan',
        countryFlag: '🇯🇵',
        icon: '🎓',
        actionText: 'View Schedule',
        actionIcon: '📅',
        link: '#',
        isUrgent: false
      },
      {
        id: 6,
        title: 'UAE Construction Workers Registration Open',
        description: 'New recruitment drive for skilled construction workers for major projects in UAE. Positions available for electricians, masons, and general laborers.',
        postedDate: 'May 20, 2025',
        category: 'Job Demand',
        country: 'UAE',
        countryFlag: '🇦🇪',
        icon: '🏗️',
        actionText: 'Apply Now',
        actionIcon: '📝',
        link: '#',
        isUrgent: false
      }
    ];
  }

  filterAnnouncements(): void {
    this.filteredAnnouncements = this.announcements.filter(announcement => {
      let matchesCountry = true;
      let matchesCategory = true;
      let matchesDate = true;

      // Country filter
      if (this.selectedCountry && announcement.country !== 'All') {
        matchesCountry = announcement.country === this.selectedCountry;
      }

      // Category filter
      if (this.selectedCategory) {
        matchesCategory = announcement.category === this.selectedCategory;
      }

      // Date filter
      if (this.selectedDateRange) {
        const announcementDate = new Date(announcement.postedDate);
        const today = new Date();
        
        switch (this.selectedDateRange) {
          case 'today':
            matchesDate = announcementDate.toDateString() === today.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = announcementDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = announcementDate >= monthAgo;
            break;
          case 'quarter':
            const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesDate = announcementDate >= quarterAgo;
            break;
        }
      }

      return matchesCountry && matchesCategory && matchesDate;
    });
  }

  calculateStats() {
    this.totalAnnouncements = this.announcements.length;
    this.urgentAnnouncements = this.announcements.filter(a => a.isUrgent).length;
    
    // Calculate this week's announcements
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.thisWeekAnnouncements = this.announcements.filter(a => {
      const announcementDate = new Date(a.postedDate);
      return announcementDate >= weekAgo;
    }).length;
    
    // Calculate active countries
    const uniqueCountries = new Set(this.announcements.map(a => a.country));
    this.activeCountries = uniqueCountries.size;
  }
}
