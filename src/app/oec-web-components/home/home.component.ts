// components/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, Banner, Announcement } from './../..//api.service';
import { DomSanitizer, SafeHtml,SafeResourceUrl  } from '@angular/platform-browser';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttons: {
    primary: { text: string; icon: string };
    secondary: { text: string; icon: string };
  };
}
interface Attachment {
  _id: string;
  file_title: string;
  icon: 'advertisement' | 'announcement' | string;
  attachment_type: 'attachment_file' | 'link';
  file_path?: string;
  file_url?: string;
  link_url?: string;
  original_name?: string;
  file_size?: number;
  mime_type?: string;
}
interface Executive {
  id: number;
  name: string;
  position: string;
  image: string;
  profileUrl: string;
  badge: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  icon: string;
  color: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  delay: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  isModalVisible = false;
  announcements: Announcement[] = [];
  activeBanners: any[] = [];
processedBanners: any[] = [];
  aboutOecData : any;
  executives : any;
  servicesData: any;
  statisticsData: any;
processedVideoUrl: any = null;
processedIndustryData: any[] = [];
baseUrl:any
cardStates: { [industryName: string]: boolean } = {};
  // Add these new properties for collapse functionality
  industryCollapseOpen = true;
  degreeCollapseOpen = false;
  
  constructor(private apiService: ApiService,
  private sanitizer: DomSanitizer) {}
  expandedCards: Set<string> = new Set();
  
  slides: Slide[] = [
    {
      id: 1,
      title: 'Best Career',
      subtitle: 'Opportunities',
      description: 'Making your overseas journey easier and comfortable with comprehensive support services.',
      backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      buttons: {
        primary: { text: 'Job Seeker Registration', icon: 'fas fa-user-plus' },
        secondary: { text: 'Job Seeker Login', icon: 'fas fa-sign-in-alt' }
      }
    },
    {
      id: 2,
      title: 'Manpower',
      subtitle: 'Recruitment Services',
      description: 'Connect with thousands of job seekers for overseas employment opportunities.',
      backgroundImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      buttons: {
        primary: { text: 'OEP Registration', icon: 'fas fa-building' },
        secondary: { text: 'OEP Login', icon: 'fas fa-sign-in-alt' }
      }
    },
    {
      id: 3,
      title: 'Choose the Right Person',
      subtitle: 'for the Right Job',
      description: 'Find your next hire from our growing database of skilled professionals.',
      backgroundImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      buttons: {
        primary: { text: 'Post a Job', icon: 'fas fa-plus-circle' },
        secondary: { text: 'Search CVs', icon: 'fas fa-search' }
      }
    },
    {
      id: 4,
      title: 'Build Your Career',
      subtitle: 'with OEC',
      description: 'Official gateway for overseas employment to South Korea through EPS Program.',
      backgroundImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      buttons: {
        primary: { text: 'Apply for EPS', icon: 'fas fa-flag' },
        secondary: { text: 'Language Preparation', icon: 'fas fa-language' }
      }
    }
  ];

  // executives: Executive[] = [
  //   {
  //     id: 1,
  //     name: 'Mr. Mian Shahbaz Sharif',
  //     position: 'Prime Minister of Pakistan',
  //     image: 'https://jobs.oec.gov.pk/uploads/executive/Executive-1710441012205.jpeg',
  //     profileUrl: 'https://establishment.gov.pk/ProfileDetail/ZDliMDY3MTktZDM1OS00M2Y0LTlmMWItNWU0MWUzYTg4MWIz',
  //     badge: 'PRIME MINISTER'
  //   },
  //   {
  //     id: 2,
  //     name: 'Mr. Chaudhry Salik Hussain',
  //     position: 'Federal Minister',
  //     image: 'https://jobs.oec.gov.pk/uploads/executive/Executive-1710441192949.jpeg',
  //     profileUrl: 'https://ophrd.gov.pk/ProfileDetail/ZTRiMTFkZDUtMjQwZi00NzMzLWE3NWItOGVhM2MwOGRlYzBj',
  //     badge: 'FEDERAL MINISTER'
  //   },
  //   {
  //     id: 3,
  //     name: 'Mr. Ch Ehsan-ul-Haq Bajwa',
  //     position: 'Parliamentary Secretary',
  //     image: 'https://jobs.oec.gov.pk/uploads/executive/Executive-1710441551850.jpeg',
  //     profileUrl: 'https://ophrd.gov.pk/ProfileDetail/MWVjZTY5NDEtMjZmNy00MzM0LTlhYTktYzE1ZmFhYjgwMjMx',
  //     badge: 'PARLIAMENTARY SECRETARY'
  //   },
  //   {
  //     id: 4,
  //     name: 'Nadeem Aslam Chaudhary',
  //     position: 'Federal Secretary',
  //     image: 'https://jobs.oec.gov.pk/uploads/executive/Executive-1748245849238.jpeg',
  //     profileUrl: 'https://ophrd.gov.pk/ProfileDetail/NTBiMmQ4YjAtMzFiNC00MTYxLWIwNDYtOTU0YzdiM2QxM2Nj',
  //     badge: 'FEDERAL SECRETARY'
  //   },
  //   {
  //     id: 5,
  //     name: 'Mr. Naseer Khan Kashani',
  //     position: 'Managing Director',
  //     image: 'https://jobs.oec.gov.pk/uploads/executive/Executive-1748246014178.jpeg',
  //     profileUrl: 'https://oec.gov.pk/details',
  //     badge: 'MANAGING DIRECTOR'
  //   }
  // ];

  services: Service[] = [
    {
      id: 1,
      title: 'Training & Development',
      description: 'Equip job seekers with global employability skills through certified training programs and professional development courses.',
      icon: 'fas fa-graduation-cap',
      delay: 100
    },
    {
      id: 2,
      title: 'Candidate Sourcing',
      description: 'Connect with a vast database of screened Pakistani talent across various trades and skill levels for perfect job matching.',
      icon: 'fas fa-search',
      delay: 200
    },
    {
      id: 3,
      title: 'Screening & Shortlisting',
      description: 'AI-assisted filtering and transparent evaluation of candidate profiles ensuring quality and reliability for employers.',
      icon: 'fas fa-check-circle',
      delay: 300
    },
    {
      id: 4,
      title: 'International Recruitment',
      description: 'Overseas job facilitation and managed recruitment pipelines for global employers seeking Pakistani workforce.',
      icon: 'fas fa-globe-americas',
      delay: 400
    },
    {
      id: 5,
      title: 'EPS Korea Facilitation',
      description: 'End-to-end guidance for candidates applying under the Employment Permit System (EPS) for South Korea opportunities.',
      icon: 'fas fa-flag',
      delay: 500
    },
    {
      id: 6,
      title: 'Korean Language Courses',
      description: 'Structured TOPIK preparation and Korean language training at OEC centers with certified instructors and materials.',
      icon: 'fas fa-language',
      delay: 600
    }
  ];

  newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'EPS Korea 2025 Batch Registration Now Open',
      date: 'July 10, 2025 • Applications open until August 15th',
      category: 'Hot',
      icon: 'fas fa-bullhorn',
      color: 'red'
    },
    {
      id: 2,
      title: 'OEC Announces New Training Centres in Lahore',
      date: 'July 8, 2025 • Expanding skills development infrastructure',
      category: 'New',
      icon: 'fas fa-building',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Public Procurement Notice for IT Services',
      date: 'July 5, 2025 • Deadline: July 20, 2025',
      category: 'Notice',
      icon: 'fas fa-file-contract',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Internal Job Openings - Multiple Positions',
      date: 'July 3, 2025 • Deadline: July 20, 2025',
      category: 'Jobs',
      icon: 'fas fa-briefcase',
      color: 'orange'
    },
    {
      id: 5,
      title: 'New Korean Language Course Batch Starting',
      date: 'June 28, 2025 • Registration opens July 15th',
      category: 'Courses',
      icon: 'fas fa-language',
      color: 'teal'
    },
    {
      id: 6,
      title: 'OEC Achieves Excellence Award 2025',
      date: 'June 25, 2025 • Recognition for outstanding service',
      category: 'Award',
      icon: 'fas fa-trophy',
      color: 'green'
    }
  ];

  stats = {
    emigrantsDispatched: '156,118',
    jobSeekers: '982,058',
    overseasReturnees: '225,106',
    koreanLanguageTrained: '25,106',
    japaneseLanguageTrained: '118'
  };

  jobPortalStats = {
    totalJobSeekers: '982,058',
    interestedJobSeekers: '186,559',
    activeJobs: '263,059',
    oecJobs: '883',
    oepJobs: '262,176',
    foreignEmployers: '500+',
    activeOEPs: '2,314'
  };

  private slideInterval: any;
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.startSlideShow();
    this.initializeAnimations();
    this.checkModalDisplay();
    this.initializeCounterAnimations();
    this.getAnnouncements()
    this.getActiveBanners()
    this.getAboutOec()
    this.getExecutives()
    this.industrystats()
  this.getServices();
  }


   toggleIndustryCollapse(): void {
    this.industryCollapseOpen = !this.industryCollapseOpen;
  }


isDegreeOpen(industryName: string): boolean {
  return !!this.statisticsData[industryName];
}
toggleDegreeCollapse(industryName: string) {
  this.statisticsData[industryName] = !this.isDegreeOpen(industryName);
}
  // Get degree count
  getDegreeCount(): number {
    return this.statisticsData?.byDegreeLevel ? Object.keys(this.statisticsData.byDegreeLevel).length : 0;
  }
// Get top degree levels with improved data processing
  getTopDegreeLevel(): any[] {
    if (!this.statisticsData?.byDegreeLevel) return [];
    
    return Object.keys(this.statisticsData.byDegreeLevel)
      .map(key => {
        const data = this.statisticsData.byDegreeLevel[key];
        return {
          name: key,
          uniqueUsers: data.uniqueUsers,
          level: data.level,
          percentage: data.percentage || this.getPercentage(data.uniqueUsers)
        };
      })
      .sort((a, b) => b.uniqueUsers - a.uniqueUsers)
      .slice(0, 50); // Show top 50 degree levels
  }
trackByIndustryName(index: number, industry: any): string {
  return industry.name;
}

// Method to handle attachment clicks
onAttachmentClick(attachment: Attachment): void {
  if (attachment.attachment_type === 'attachment_file') {
    // Handle file download
    let fileUrl = attachment.file_url;
    if (!fileUrl && attachment.file_path) {
      // Construct URL from file_path and handle Windows backslashes
      const normalizedPath = attachment.file_path.replace(/\\/g, '/');
      fileUrl = normalizedPath.startsWith('/') 
        ? this.baseUrl + normalizedPath
        : this.baseUrl + '/' + normalizedPath;
    }
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  } else if (attachment.attachment_type === 'link') {
    // Handle external link
    if (attachment.link_url) {
      if (attachment.link_url.startsWith('http')) {
        window.open(attachment.link_url, '_blank');
      } else {
        window.location.href = attachment.link_url;
      }
    }
  }
}

// Method to get attachment icon class (using FontAwesome icons)
getAttachmentIconClass(attachment: Attachment): string {
  if (attachment.attachment_type === 'attachment_file') {
    // Check file type by mime_type or file extension
    if (attachment.mime_type?.includes('image')) {
      return 'fas fa-image';
    } else if (attachment.mime_type?.includes('pdf')) {
      return 'fas fa-file-pdf';
    } else if (attachment.mime_type?.includes('word') || attachment.mime_type?.includes('document')) {
      return 'fas fa-file-word';
    } else if (attachment.mime_type?.includes('excel') || attachment.mime_type?.includes('spreadsheet')) {
      return 'fas fa-file-excel';
    } else if (attachment.mime_type?.includes('powerpoint') || attachment.mime_type?.includes('presentation')) {
      return 'fas fa-file-powerpoint';
    } else if (attachment.mime_type?.includes('zip') || attachment.mime_type?.includes('rar')) {
      return 'fas fa-file-archive';
    } else {
      return 'fas fa-file-download';
    }
  } else if (attachment.attachment_type === 'link') {
    return 'fas fa-external-link-alt';
  }
  return 'fas fa-file';
}

// Method to format file size in human-readable format
formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Method to check if announcement has attachments
hasAttachments(announcement: Announcement): boolean {
  return announcement.attachments && announcement.attachments.length > 0;
}

// Method to get attachment count
getAttachmentCount(announcement: Announcement): number {
  return announcement.attachments ? announcement.attachments.length : 0;
}

// Helper method to get full image URL for flags
getFlagImageUrl(flagPath: string): string {
  if (!flagPath) return '';
  
  // Handle different path formats
  if (flagPath.startsWith('http')) {
    return flagPath;
  } else if (flagPath.startsWith('/')) {
    return this.baseUrl + flagPath;
  } else {
    // Handle Windows backslashes and convert to forward slashes
    const normalizedPath = flagPath.replace(/\\/g, '/');
    return this.baseUrl + '/' + normalizedPath;
  }
}

// Method to close modal from component
closeAnnouncementModal(): void {
  this.isModalVisible = false;
  // Set flag to not show again today
  const today = new Date().toDateString();
  localStorage.setItem('oec-announcements-seen', today);
}

// Method to handle "View All Notices" button
viewAllAnnouncements(): void {
  // Navigate to announcements page or open in new tab
  window.open('/announcements', '_blank');
  // Or if you have Angular routing: this.router.navigate(['/announcements']);
}
// TrackBy function for degree items
trackByDegreeName(index: number, degree: any): string {
  return degree.name;
}
    onDownloadReport(): void {
    if (!this.statisticsData) {
      console.log('No data available for download');
      return;
    }

    console.log('Generating industry report...');
    this.generateReport();
  }

   generateReport(): void {
    if (!this.statisticsData) return;

    const reportData = {
      reportTitle: 'OEC Industry & Education Statistics Report',
      generatedAt: new Date().toISOString(),
      summary: {
        totalUsers: this.statisticsData.totalUsers,
        totalEducationRecords: this.statisticsData.totalEducationRecords,
        numberOfIndustries: this.getIndustryCount(),
        numberOfDegreeTypes: this.getDegreeCount(),
        topIndustryByUsers: this.statisticsData.summary?.topIndustryByUsers,
        mostCommonDegree: this.statisticsData.summary?.mostCommonDegree,
        averageDegreeLevelScore: this.statisticsData.summary?.averageDegreeLevelScore
      },
      industryBreakdown: this.getIndustriesArray().map(industry => ({
        name: industry.name,
        uniqueUsers: industry.data.uniqueUsers,
        totalEducationRecords: industry.data.totalEducationRecords,
        marketSharePercentage: this.getPercentage(industry.data.uniqueUsers),
        topDegrees: this.getTopDegrees(industry.data.degreeBreakdown)
      })),
      degreeBreakdown: this.getTopDegreeLevel(),
      rawData: {
        byIndustry: this.statisticsData.byIndustry,
        byDegreeLevel: this.statisticsData.byDegreeLevel
      }
    };

    // Create downloadable JSON file
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const exportFileDefaultName = `OEC-Industry-Statistics-Report-${dateStr}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.style.display = 'none';
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);

    console.log('Report downloaded successfully');
  }
  onIndustryDetails(industry: any): void {
    console.log('Showing details for industry:', industry.name);
    // Add your navigation or modal logic here
  }
  exportToCSV(dataType: 'industries' | 'degrees'): void {
    if (!this.statisticsData) return;

    let csvContent = '';
    let filename = '';

    if (dataType === 'industries') {
      csvContent = 'Industry Name,Unique Users,Total Education Records,Market Share %\n';
      this.processedIndustryData.forEach(industry => {
        const row = `"${industry.name}",${industry.uniqueUsers},${industry.totalRecords},${industry.percentage}\n`;
        csvContent += row;
      });
      filename = 'OEC-Industries-Statistics.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
   getFormattedStatistics(): any {
    if (!this.statisticsData) return null;

    return {
      overview: {
        totalUsers: this.statisticsData.totalUsers.toLocaleString(),
        totalEducationRecords: this.statisticsData.totalEducationRecords.toLocaleString(),
        industriesCount: this.getIndustryCount(),
        degreesCount: this.getDegreeCount()
      },
      topIndustries: this.getIndustriesArray().slice(0, 5),
      topDegrees: this.getTopDegreeLevel().slice(0, 10)
    };
  }
  // Method to export data to CSV format

 searchStatistics(searchTerm: string): { industries: any[]; degrees: any[] } | null {
  if (!this.statisticsData || !searchTerm?.trim()) {
    return null;
  }

  const lowerTerm = searchTerm.toLowerCase();

  const industries = this.getIndustriesArray().filter((industry: any) =>
    industry.name?.toLowerCase().includes(lowerTerm)
  );

  const degrees = this.getTopDegreeLevel().filter((degree: any) =>
    degree.name?.toLowerCase().includes(lowerTerm)
  );

  return { industries, degrees };
}


getIndustryIcon(industryName: string): string {
    const iconMap: { [key: string]: string } = {
      'Manufacturing': 'fas fa-industry',
      'Healthcare': 'fas fa-heartbeat',
      'Information Technology': 'fas fa-laptop-code',
      'Education': 'fas fa-graduation-cap',
      'Engineering': 'fas fa-cogs',
      'Construction': 'fas fa-hard-hat',
      'Finance': 'fas fa-chart-line',
      'Agriculture': 'fas fa-seedling',
      'Transportation': 'fas fa-truck',
      'Retail': 'fas fa-shopping-cart',
      'Healthcare & Life Sciences': 'fas fa-heartbeat',
      'Engineering & ICT': 'fas fa-laptop-code',
      'General Professional & Administrative': 'fas fa-user-tie',
      'Arts & Social Sciences (General)': 'fas fa-palette',
      'Business, Management & Consulting': 'fas fa-briefcase',
      'Education & Training': 'fas fa-chalkboard-teacher',
      'Science & Research': 'fas fa-microscope',
      'Law & Governance': 'fas fa-balance-scale'
    };
    
    // Try exact match first
    if (iconMap[industryName]) {
      return iconMap[industryName];
    }
    
    // Try partial match
    const lowerIndustry = industryName.toLowerCase();
    for (const [key, value] of Object.entries(iconMap)) {
      if (lowerIndustry.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerIndustry)) {
        return value;
      }
    }
    
    return 'fas fa-briefcase'; // Default icon
  }

  getIndustriesArray(): any[] {
  if (!this.statisticsData?.byIndustry) return [];
  
  return Object.keys(this.statisticsData.byIndustry).map(key => ({
    name: key,
    data: this.statisticsData.byIndustry[key]
  })).sort((a, b) => b.data.uniqueUsers - a.data.uniqueUsers);
}

// Method to get industry count

// Method to calculate percentage
 getPercentage(value: number): string {
    if (!this.statisticsData?.totalUsers || this.statisticsData.totalUsers === 0) return '0%';
    return ((value / this.statisticsData.totalUsers) * 100).toFixed(1) + '%';
  }

// Method to get top degrees for an industry
 getTopDegrees(degreeBreakdown: any): any[] {
    if (!degreeBreakdown) return [];
    
    return Object.keys(degreeBreakdown)
      .map(key => ({
        name: key,
        count: degreeBreakdown[key].count,
        level: degreeBreakdown[key].level
      }))
      .sort((a, b) => b.count - a.count);
  }

// Simple toggle method - only affects the clicked card
   toggleCard(industryName: any) {
    if (this.expandedCards.has(industryName)) {
      this.expandedCards.delete(industryName);
    } else {
      this.expandedCards.add(industryName);
    }
    console.log(`Toggled ${industryName}:`, this.isCardExpanded(industryName));
  }

  // Check if a specific card is expanded
    isCardExpanded(industryName: string): boolean {
    return this.expandedCards.has(industryName);
  }

   getProcessedIndustries(): any[] {
    return this.processedIndustryData;
  }

   getIndustryCount(): number {
    return this.processedIndustryData.length;
  }

// Initialize all cards as collapsed when data loads
  industrystats(): void {
    this.apiService.industrystats().subscribe({
      next: (response) => {
        this.statisticsData = response.statistics;
        console.log('Industry statistics loaded:', this.statisticsData);
        
        // Process and cache the industry data to prevent reloading
        this.processIndustryData();
      },
      error: (error) => {
        console.error('Error loading industry statistics:', error);
        this.statisticsData = null;
        this.processedIndustryData = [];
      }
    });
  }

  private processIndustryData(): void {
    if (!this.statisticsData?.byIndustry) {
      this.processedIndustryData = [];
      return;
    }

    this.processedIndustryData = Object.keys(this.statisticsData.byIndustry).map(key => {
      const industryData = this.statisticsData.byIndustry[key];
      
      // Process top degrees once and cache them
      const topDegrees = this.getTopDegrees(industryData.degreeBreakdown).slice(0, 5);
      
      return {
        name: key,
        data: industryData,
        uniqueUsers: industryData.uniqueUsers,
        percentage: this.getPercentage(industryData.uniqueUsers),
        icon: this.getIndustryIcon(key),
        topDegrees: topDegrees, // Cached top degrees
        totalRecords: industryData.totalEducationRecords
      };
    }).sort((a, b) => b.uniqueUsers - a.uniqueUsers);

    console.log('Processed industry data:', this.processedIndustryData);
  }

subCollapse: { [key: string]: boolean } = {}; 
private collapsibleIndustries = new Set<string>([
    'School Education Level',
    'Healthcare & Life Sciences'
  ]);
  

scrollQualifications(industryName: string, direction: 'up' | 'down'): void {
  console.log("Here Now", industryName);

  // Use getSafeId to generate a valid selector
  const container = document.querySelector(`#qualifications-${this.getSafeId(industryName)}`);
  if (container) {
    const scrollAmount = 100;
    const currentScroll = container.scrollTop;
    const targetScroll = direction === 'up' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }
}
getSafeId(name: string): string {
  return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
}
private initializeSubCollapseStates(): void {
  if (this.statisticsData?.byIndustry) {
    Object.keys(this.statisticsData.byIndustry).forEach(industryName => {
      // Set default state to true (collapsed) for all cards
      this.subCollapse[industryName] = true;
    });
  }
}

// Update the toggleSubCollapse method to only toggle the specific card
toggleSubCollapse(industryName: string): void {
  // Only toggle the clicked card, don't affect others
  this.subCollapse[industryName] = !this.subCollapse[industryName];
  
  // Optional: Log to debug which card is being toggled
  console.log(`Toggled ${industryName}: ${this.subCollapse[industryName]}`);
}
  // Enhanced view all industries method
  onViewAllIndustries(): void {
    console.log('Opening detailed industry analysis...');
    
    // You can implement a modal here or navigate to a detailed page
    // For now, let's expand both collapse sections automatically
    this.industryCollapseOpen = true;
    this.degreeCollapseOpen = true;
    
    // Scroll to the statistics section
    setTimeout(() => {
      const element = document.querySelector('.industry-statistics-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);

    // If you have routing set up, you can navigate to a detailed page:
    // this.router.navigate(['/detailed-statistics']);
  }
  getServices() {
  this.apiService.getServices().subscribe({
    next: (response) => {
      this.servicesData = response.data;
    },
    error: (error) => {
      console.error('Error loading services:', error);
    }
  });
}

onServiceClick(service: any): void {
  console.log('Service clicked:', service);
  // Add navigation or modal logic here
}

onGetStartedClick(): void {
  // Add navigation to registration/signup page
  window.open('/register', '_blank');
}

onLearnMoreClick(): void {
  // Add navigation to services detail page
  window.open('/services', '_blank');
}
getAnnouncements(): void {
  this.baseUrl = this.apiService.MainbaseUrl;
  console.log("baseUrl::::::: ", this.baseUrl);
  
  this.apiService.getAnnouncements().subscribe({
    next: (announcements: Announcement[]) => {
      this.announcements = announcements;
      // Process any date strings to Date objects if needed
      this.announcements.forEach(announcement => {
        if (typeof announcement.deadline === 'string') {
          announcement.deadline = new Date(announcement.deadline);
        }
        if (typeof announcement.createdAt === 'string') {
          announcement.createdAt = new Date(announcement.createdAt);
        }
        // Ensure attachments array exists for backward compatibility
        if (!announcement.attachments) {
          announcement.attachments = [];
        }
      });
      console.log('Processed announcements:', this.announcements);
    },
    error: (error) => {
      console.error('Error loading announcements:', error);
    }
  });
}
getAboutOec() {
  this.apiService.getAboutOec().subscribe({
    next: (response) => {
      this.aboutOecData = response.data;
      // Process URL once when data loads
      const url = this.aboutOecData?.youtube_video_link || 'https://www.youtube.com/embed/2FomaOFxmoQ';
      this.processedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    },
    error: (error) => {
      console.error('Error loading About OEC:', error);
    }
  });
}
getExecutives(){
  this.apiService.getExecutives().subscribe({
   next: (executives) => {
     this.executives = executives.data;
   },
   error: (error) => {
     console.error('Error loading announcements:', error);
   }
 });
}
openProfile(profileUrl: string): void {
  if (profileUrl) {
    window.open(profileUrl, '_blank');
  }
} 
getExecutiveImageUrl(executive: any): string {
  if (executive.image_url) {
    return this.apiService.getImageUrl(executive.image_url);
  }
  return 'https://via.placeholder.com/300x200?text=No+Image';
}
getSafeUrl() {
  console.log("HERE::::");
  
  const url = this.aboutOecData?.youtube_video_link || 'https://www.youtube.com/embed/2FomaOFxmoQ';
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
onAboutButtonClick(): void {
  const link = this.aboutOecData?.button_link || '/about';
  if (link.startsWith('http')) {
    window.open(link, '_blank');
  } else {
    window.location.href = link;
  }
}
onBannerButtonClick(banner: Banner, type: 'green' | 'gray'): void {
 const link = type === 'green' ? banner.green_button_link : banner.gray_button_link;
 
 if (link.startsWith('http')) {
   window.open(link, '_blank');
 } else {
   window.location.href = link;
 }
}
getBannerSubtitleAsArray(banner: Banner): string[] {
 if (banner.banner_subtitle_type === 'points' && Array.isArray(banner.banner_subtitle)) {
   return banner.banner_subtitle;
 }
 return [];
}
getBannerImageUrl(banner: Banner): string {
  const imageUrl = this.apiService.getImageUrl(banner.background_image);
  console.log('Image URL:', imageUrl);
  return imageUrl;
}
 getActiveBanners(){
  this.apiService.getActiveBanners().subscribe({
    next: (banners) => {
      this.activeBanners = banners;
      // Process URLs once when data loads
      this.processedBanners = banners.map(banner => ({
        ...banner,
        processedImageUrl: this.apiService.getImageUrl(banner.background_image)
      }));
      console.log('Banners processed:', this.processedBanners);
    },
    error: (error) => {
      console.error('Error loading banners:', error);
      this.activeBanners = [];
      this.processedBanners = [];
    }
  });
}
getBannerTitleHtml(banner: Banner): SafeHtml {
  if (banner.banner_title_highlight?.text) {
    const highlightedTitle = banner.banner_title.replace(
      banner.banner_title_highlight.text,
      `<span style="color: ${banner.banner_title_highlight.color}">${banner.banner_title_highlight.text}</span>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlightedTitle);
  }
  return this.sanitizer.bypassSecurityTrustHtml(banner.banner_title);
}
onAnnouncementClick(announcement: Announcement, type: 'orange' | 'blue'): void {
 const link:any = type === 'orange' ? announcement.orange_button_link : announcement.blue_button_link;
 
 if (link.startsWith('http')) {
   window.open(link, '_blank');
 } else {
   window.location.href = link;
 }
}
getAnnouncementBackgroundClass(category: string): string {
  const colorMap: { [key: string]: string } = {
    'Hot': 'bg-gradient-to-r from-red-50 to-red-100 border-red-200',
    'Registration': 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200', // Changed to blue
    'New': 'bg-gradient-to-r from-green-50 to-green-100 border-green-200',
    'Notice': 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200',
    'Jobs': 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200',
    'Courses': 'bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200',
    'Award': 'bg-gradient-to-r from-green-50 to-green-100 border-green-200',
    'Training': 'bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200',
    'Scholarship': 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
  };
  
  return colorMap[category] || 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
}

getAnnouncementBadgeClass(category: string): string {
  // console.log('Category:', category);
  const colorMap: { [key: string]: string } = {
    'urgent': 'bg-red-100 text-red-600',
    'general': 'bg-blue-100 text-blue-600', // Changed to blue
    'news': 'bg-green-100 text-green-600',
    'update': 'bg-purple-100 text-purple-600',
    'Jobs': 'bg-orange-100 text-orange-600',
    'Courses': 'bg-teal-100 text-teal-600',
    'Award': 'bg-green-100 text-green-600',
    'Training': 'bg-indigo-100 text-indigo-600',
    'Scholarship': 'bg-yellow-100 text-yellow-600'
  };
  
  return colorMap[category] || 'bg-gray-100 text-gray-600';
}
  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000); // Change slide every 5 seconds
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  private initializeAnimations(): void {
    // Initialize intersection observer for animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Trigger counter animations for stats section
          if (entry.target.id === 'stats-section') {
            this.animateCounters();
          }
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe animated elements after view init
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('[class*="animate-"], #stats-section');
      animatedElements.forEach(el => this.observer?.observe(el));
    }, 100);
  }

  private initializeCounterAnimations(): void {
    // Set up intersection observer specifically for counter animations
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          statsObserver.disconnect(); // Only animate once
        }
      });
    }, { threshold: 0.3 });

    setTimeout(() => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        statsObserver.observe(statsSection);
      }
    }, 500);
  }

  private checkModalDisplay(): void {
  const today = new Date().toDateString();
  const modalShownToday = localStorage.getItem('oec-announcements-seen') === today;
  
  if (!modalShownToday) {
    setTimeout(() => {
      // Only show modal if we have announcements
      if (this.announcements && this.announcements.length > 0) {
        this.isModalVisible = true;
      }
    }, 2000);
  }
}

  closeModal(): void {
    this.isModalVisible = false;
  }

  onModalCheckboxChange(event: any): void {
    if (event.target.checked) {
      const today = new Date().toDateString();
      localStorage.setItem('oec-modal-shown', today);
    } else {
      localStorage.removeItem('oec-modal-shown');
    }
  }
isInvalidDate(date: any): boolean {
  return date instanceof Date && isNaN(date.getTime());
}
  animateCounters(): void {
    // Counter animation logic with staggered timing
    setTimeout(() => {
      this.animateCounter('.counter-1', '0', this.stats.emigrantsDispatched, 2000);
    }, 200);
    
    setTimeout(() => {
      this.animateCounter('.counter-2', '0', this.stats.jobSeekers + '+', 1800);
    }, 400);
    
    setTimeout(() => {
      this.animateCounter('.counter-3', '0', this.stats.overseasReturnees, 1600);
    }, 600);
    
    setTimeout(() => {
      this.animateCounter('.counter-4', '0', this.stats.koreanLanguageTrained, 1400);
    }, 800);
    
    setTimeout(() => {
      this.animateCounter('.counter-5', '0', this.stats.japaneseLanguageTrained, 1200);
    }, 1000);
  }

  private animateCounter(selector: string, start: string, end: string, duration: number): void {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    const startTime = performance.now();
    const startVal = parseInt(start.replace(/[^\d]/g, '')) || 0;
    const endVal = parseInt(end.replace(/[^\d]/g, '')) || 0;
    
    const easeOutQuart = (t: number) => 1 - (--t) * t * t * t;
    
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const currentVal = Math.floor(startVal + (endVal - startVal) * easedProgress);
      const formattedNumber = currentVal.toLocaleString();
      element.textContent = formattedNumber + (end.includes('+') ? '+' : '');
      
      if (progress < 1) {
        element.style.textShadow = `0 0 ${10 * (1 - progress)}px currentColor`;
        requestAnimationFrame(update);
      } else {
        element.textContent = end;
        element.style.textShadow = '0 0 5px currentColor';
        
        // Final pulse effect
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.transition = 'transform 0.3s ease';
        }, 150);
      }
    };
    
    requestAnimationFrame(update);
  }

  // Utility method to handle external link clicks
  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  // Method to handle service card interactions
  onServiceCardClick(serviceId: number): void {
    console.log('Service clicked:', serviceId);
    // Add navigation or modal logic here
  }

  // Method to handle news item clicks
  onNewsItemClick(newsId: number): void {
    console.log('News item clicked:', newsId);
    // Add navigation logic here
  }

  // Method to scroll to specific sections
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Method to handle CTA button clicks
  onCTAClick(action: string): void {
    switch (action) {
      case 'register':
        this.openExternalLink('https://jobs.oec.gov.pk/register');
        break;
      case 'login':
        this.openExternalLink('https://jobs.oec.gov.pk/login');
        break;
      case 'job-portal':
        this.openExternalLink('https://jobs.oec.gov.pk/home');
        break;
      default:
        console.log('CTA clicked:', action);
    }
  }
}