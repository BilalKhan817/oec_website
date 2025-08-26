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
processedVideoUrl: any = null;
  
  constructor(private apiService: ApiService,
  private sanitizer: DomSanitizer) {}
  
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
  this.getServices();
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
 getAnnouncements(){
 this.apiService.getAnnouncements().subscribe({
   next: (announcements) => {
     this.announcements = announcements;
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
 const link = type === 'orange' ? announcement.orange_button_link : announcement.blue_button_link;
 
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
  const colorMap: { [key: string]: string } = {
    'Hot': 'bg-red-100 text-red-600',
    'Registration': 'bg-blue-100 text-blue-600', // Changed to blue
    'New': 'bg-green-100 text-green-600',
    'Notice': 'bg-purple-100 text-purple-600',
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
    const modalShownToday = localStorage.getItem('oec-modal-shown') === today;
    
    if (!modalShownToday) {
      setTimeout(() => {
        this.isModalVisible = true;
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