import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

interface Photo {
  id: number;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  category: string;
}

interface Video {
  id: number;
  title: string;
  date: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  embedUrl: string;
  category: string;
}

interface PhotoCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  photos: Photo[];
}

interface VideoCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  videos: Video[];
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  
  photoCategories: PhotoCategory[] = [];
  videoCategories: VideoCategory[] = [];
  selectedPhoto: Photo | null = null;
  selectedVideo: Video | null = null;

  constructor() {}

  ngOnInit() {
    this.initializePhotoCategories();
    this.initializeVideoCategories();
  }

  initializePhotoCategories() {
    this.photoCategories = [
      {
        id: 1,
        name: 'MoU Signings',
        icon: '🤝',
        description: 'With HRD Korea, Italy Health Ministry, GIZ Germany',
        photos: [
          {
            id: 1,
            title: 'OEC-HRD Korea MoU Signing',
            date: 'March 15, 2025',
            caption: 'Official signing ceremony for EPS Korea program partnership',
            imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=MoU+Signing+1',
            category: 'MoU Signings'
          },
          {
            id: 2,
            title: 'Italy Health Ministry Agreement',
            date: 'February 28, 2025',
            caption: 'Nursing professionals deployment agreement with Italian authorities',
            imageUrl: 'https://via.placeholder.com/400x300/059669/ffffff?text=Italy+Agreement',
            category: 'MoU Signings'
          },
          {
            id: 3,
            title: 'GIZ Germany Partnership',
            date: 'January 20, 2025',
            caption: 'Vocational training and skills development collaboration',
            imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=GIZ+Partnership',
            category: 'MoU Signings'
          }
        ]
      },
      {
        id: 2,
        name: 'Orientation Sessions',
        icon: '🏫',
        description: 'EPS Korea, KSA Nursing, IT Programs',
        photos: [
          {
            id: 4,
            title: 'EPS Korea Orientation',
            date: 'April 10, 2025',
            caption: 'Pre-departure orientation for Korean language and culture',
            imageUrl: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=EPS+Orientation',
            category: 'Orientation Sessions'
          },
          {
            id: 5,
            title: 'KSA Nursing Program',
            date: 'March 25, 2025',
            caption: 'Healthcare professionals orientation for Saudi Arabia',
            imageUrl: 'https://via.placeholder.com/400x300/059669/ffffff?text=KSA+Nursing',
            category: 'Orientation Sessions'
          },
          {
            id: 6,
            title: 'IT Skills Training',
            date: 'February 15, 2025',
            caption: 'Technology professionals orientation and training',
            imageUrl: 'https://via.placeholder.com/400x300/7c3aed/ffffff?text=IT+Training',
            category: 'Orientation Sessions'
          }
        ]
      },
      {
        id: 3,
        name: 'Press Conferences',
        icon: '📰',
        description: 'Project Launches, Ministerial Visits',
        photos: [
          {
            id: 7,
            title: 'AI Portal Launch',
            date: 'May 5, 2025',
            caption: 'Official launch of OEC AI-based recruitment portal',
            imageUrl: 'https://via.placeholder.com/400x300/dc2626/ffffff?text=AI+Launch',
            category: 'Press Conferences'
          },
          {
            id: 8,
            title: 'Ministerial Visit',
            date: 'April 18, 2025',
            caption: 'Minister of Overseas Pakistanis visit to OEC headquarters',
            imageUrl: 'https://via.placeholder.com/400x300/059669/ffffff?text=Minister+Visit',
            category: 'Press Conferences'
          }
        ]
      },
      {
        id: 4,
        name: 'Delegation Visits',
        icon: '👥',
        description: 'Foreign Employers, Diplomatic Briefings',
        photos: [
          {
            id: 9,
            title: 'Korean Delegation',
            date: 'March 30, 2025',
            caption: 'HRD Korea delegation visit to discuss EPS program',
            imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Korean+Delegation',
            category: 'Delegation Visits'
          },
          {
            id: 10,
            title: 'Italian Health Officials',
            date: 'March 12, 2025',
            caption: 'Italian health ministry officials visit for nursing program',
            imageUrl: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Italian+Officials',
            category: 'Delegation Visits'
          }
        ]
      },
      {
        id: 5,
        name: 'Job Fairs / Drives',
        icon: '💼',
        description: 'Walk-in Interviews, Outreach Events',
        photos: [
          {
            id: 11,
            title: 'National Job Fair',
            date: 'May 12, 2025',
            caption: 'Large-scale job fair with multiple international employers',
            imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Job+Fair',
            category: 'Job Fairs'
          },
          {
            id: 12,
            title: 'EPS Korea Registration Drive',
            date: 'April 25, 2025',
            caption: 'Mass registration drive for EPS Korea program',
            imageUrl: 'https://via.placeholder.com/400x300/059669/ffffff?text=EPS+Drive',
            category: 'Job Fairs'
          }
        ]
      }
    ];
  }

  initializeVideoCategories() {
    this.videoCategories = [
      {
        id: 1,
        name: 'Promotional Videos',
        icon: '🎬',
        description: 'OEC Services, EPS Guide, Nursing in Italy',
        videos: [
          {
            id: 1,
            title: 'OEC Services Overview',
            date: 'March 2025',
            description: 'Comprehensive overview of OEC services and programs',
            duration: '5:32',
            thumbnailUrl: 'https://via.placeholder.com/400x225/10b981/ffffff?text=OEC+Services',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Promotional Videos'
          },
          {
            id: 2,
            title: 'EPS Korea Guide',
            date: 'February 2025',
            description: 'Complete guide for EPS Korea program applicants',
            duration: '8:15',
            thumbnailUrl: 'https://via.placeholder.com/400x225/2563eb/ffffff?text=EPS+Guide',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Promotional Videos'
          },
          {
            id: 3,
            title: 'Nursing in Italy',
            date: 'January 2025',
            description: 'Information about nursing opportunities in Italy',
            duration: '6:48',
            thumbnailUrl: 'https://via.placeholder.com/400x225/059669/ffffff?text=Nursing+Italy',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Promotional Videos'
          }
        ]
      },
      {
        id: 2,
        name: 'Testimonials',
        icon: '💬',
        description: 'From deployed workers abroad',
        videos: [
          {
            id: 4,
            title: 'Success Story - Korea',
            date: 'April 2025',
            description: 'Testimonial from Pakistani worker in South Korea',
            duration: '3:45',
            thumbnailUrl: 'https://via.placeholder.com/400x225/7c3aed/ffffff?text=Korea+Story',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Testimonials'
          },
          {
            id: 5,
            title: 'Nursing Success - Italy',
            date: 'March 2025',
            description: 'Pakistani nurse shares experience in Italian hospital',
            duration: '4:12',
            thumbnailUrl: 'https://via.placeholder.com/400x225/dc2626/ffffff?text=Italy+Story',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Testimonials'
          }
        ]
      },
      {
        id: 3,
        name: 'Orientation Snippets',
        icon: '📚',
        description: 'Travel advice, compliance awareness',
        videos: [
          {
            id: 6,
            title: 'Travel Safety Tips',
            date: 'May 2025',
            description: 'Essential travel safety guidelines for overseas workers',
            duration: '7:23',
            thumbnailUrl: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Travel+Tips',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Orientation Snippets'
          },
          {
            id: 7,
            title: 'Legal Compliance Guide',
            date: 'April 2025',
            description: 'Important legal compliance information for workers',
            duration: '5:56',
            thumbnailUrl: 'https://via.placeholder.com/400x225/059669/ffffff?text=Legal+Guide',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Orientation Snippets'
          }
        ]
      },
      {
        id: 4,
        name: 'Press Coverage',
        icon: '📺',
        description: 'MoU events, national TV news segments',
        videos: [
          {
            id: 8,
            title: 'MoU Signing Coverage',
            date: 'March 2025',
            description: 'National TV coverage of OEC-HRD Korea MoU signing',
            duration: '2:34',
            thumbnailUrl: 'https://via.placeholder.com/400x225/10b981/ffffff?text=MoU+Coverage',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Press Coverage'
          },
          {
            id: 9,
            title: 'OEC News Segment',
            date: 'February 2025',
            description: 'News coverage of OEC achievements and programs',
            duration: '4:18',
            thumbnailUrl: 'https://via.placeholder.com/400x225/2563eb/ffffff?text=News+Segment',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Press Coverage'
          }
        ]
      },
      {
        id: 5,
        name: 'Webinar Recordings',
        icon: '💻',
        description: 'Skills migration, CV building, employer sessions',
        videos: [
          {
            id: 10,
            title: 'CV Building Workshop',
            date: 'May 2025',
            description: 'Interactive workshop on creating effective CVs',
            duration: '12:45',
            thumbnailUrl: 'https://via.placeholder.com/400x225/7c3aed/ffffff?text=CV+Workshop',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Webinar Recordings'
          },
          {
            id: 11,
            title: 'Employer Session',
            date: 'April 2025',
            description: 'Direct session with international employers',
            duration: '15:32',
            thumbnailUrl: 'https://via.placeholder.com/400x225/dc2626/ffffff?text=Employer+Session',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'Webinar Recordings'
          }
        ]
      }
    ];
  }

  openPhotoModal(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closePhotoModal() {
    this.selectedPhoto = null;
  }

  playVideo(video: Video) {
    this.selectedVideo = video;
  }

  closeVideoModal() {
    this.selectedVideo = null;
  }

  downloadPhoto(photo: Photo) {
    // Implementation for downloading photo
    console.log('Downloading photo:', photo.title);
    // In a real implementation, this would trigger a download
  }

  sharePhoto(photo: Photo) {
    // Implementation for sharing photo
    console.log('Sharing photo:', photo.title);
    // In a real implementation, this would open sharing options
  }

  shareVideo(video: Video) {
    // Implementation for sharing video
    console.log('Sharing video:', video.title);
    // In a real implementation, this would open sharing options
  }
}
