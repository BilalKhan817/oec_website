import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Interfaces for API responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
  error?: string;
}
export interface Announcement {
  _id: string;
  title: string;
  flag?: string;
  deadline?: Date | string;
  announcement_category: string;
  attachments: any[];
  orange_button_title?: string;
  orange_button_link?: string;
  blue_button_title?: string;
  blue_button_link?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SubItem {
  _id?: string;
  title: string;
  icon?: string;
  description?: string;
  link?: string;
  link_type?: 'internal' | 'external';
  image_url?: string;
  badge_text?: string;
  badge_color?: string;
  expandable?: boolean;
  expand_content?: string;
  order?: number;
}

export interface Tab {
  _id?: string;
  tab_title: string;
  tab_icon?: string;
  tab_id: string;
  items: SubItem[];
  order?: number;
}

export interface MenuItem {
  _id?: string;
  title: string;
  icon: string;
  link?: string;
  link_type?: 'internal' | 'external' | 'none';
  has_dropdown?: boolean;
  dropdown_type?: 'simple' | 'tabs' | 'mega';
  dropdown_width?: string;
  tabs?: Tab[];
  items?: SubItem[];
  is_active?: boolean;
  order?: number;
}

export interface TopBarButton {
  _id?: string;
  title: string;
  icon?: string;
  link: string;
  link_type?: 'internal' | 'external';
  button_style?: 'default' | 'highlight';
  show_on_mobile?: boolean;
  is_active?: boolean;
  order?: number;
}

export interface Banner {
  _id: string;
  background_image: string;
  banner_title: string;
  banner_title_color: string;
  banner_title_highlight: {
    text: string;
    color: string;
  };
  banner_subtitle: string | string[];
  banner_subtitle_type: 'text' | 'points';
  support_message: string;
  green_button: string;
  green_button_link: string;
  gray_button: string;
  gray_button_link: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public MainbaseUrl = 'https://oec.gov.pk'
  // private baseUrl = 'https://oec.gov.pk/api'; // Update this to your API URL
  
  public MainbaseUrl = 'http://localhost:3000'
  public baseUrl = 'http://localhost:3000/api'; // Update this to your API URL
  
  // BehaviorSubjects for real-time data updates
  private announcementsSubject = new BehaviorSubject<Announcement[]>([]);
  private bannersSubject = new BehaviorSubject<Banner[]>([]);
  
  public announcements$ = this.announcementsSubject.asObservable();
  public banners$ = this.bannersSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize data on service creation
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getAnnouncements().subscribe();
    this.getActiveBanners().subscribe();
  }

  // ===== ANNOUNCEMENT METHODS =====

  /**
   * Get all announcements
   */
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<ApiResponse<Announcement[]>>(`${this.baseUrl}/announcements`)
      .pipe(
        map(response => {
          if (response.success) {
            this.announcementsSubject.next(response.data);
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch announcements');
        }),
        catchError(this.handleError<Announcement[]>('getAnnouncements', []))
      );
  }

  /**
   * Get single announcement by ID
   */
  getAnnouncement(id: string): Observable<Announcement> {
    return this.http.get<ApiResponse<Announcement>>(`${this.baseUrl}/announcements/${id}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch announcement');
        }),
        catchError(this.handleError<Announcement>('getAnnouncement'))
      );
  }

  /**
   * Create new announcement
   */
  createAnnouncement(announcement: Partial<Announcement>): Observable<Announcement> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<ApiResponse<Announcement>>(`${this.baseUrl}/announcements`, announcement, { headers })
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh announcements list
            this.getAnnouncements().subscribe();
            return response.data;
          }
          throw new Error(response.message || 'Failed to create announcement');
        }),
        catchError(this.handleError<Announcement>('createAnnouncement'))
      );
  }

  /**
   * Update announcement
   */
  updateAnnouncement(id: string, announcement: Partial<Announcement>): Observable<Announcement> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.put<ApiResponse<Announcement>>(`${this.baseUrl}/announcements/${id}`, announcement, { headers })
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh announcements list
            this.getAnnouncements().subscribe();
            return response.data;
          }
          throw new Error(response.message || 'Failed to update announcement');
        }),
        catchError(this.handleError<Announcement>('updateAnnouncement'))
      );
  }

  /**
   * Delete announcement
   */
  deleteAnnouncement(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse<Announcement>>(`${this.baseUrl}/announcements/${id}`)
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh announcements list
            this.getAnnouncements().subscribe();
            return true;
          }
          throw new Error(response.message || 'Failed to delete announcement');
        }),
        catchError(this.handleError<boolean>('deleteAnnouncement', false))
      );
  }

  // ===== BANNER METHODS =====

  /**
   * Get all banners
   */
  getBanners(): Observable<Banner[]> {
    return this.http.get<ApiResponse<Banner[]>>(`${this.baseUrl}/banners`)
      .pipe(
        map(response => {
          if (response.success) {
            this.bannersSubject.next(response.data);
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch banners');
        }),
        catchError(this.handleError<Banner[]>('getBanners', []))
      );
  }

  /**
   * Get only active banners
   */
  getActiveBanners(): Observable<Banner[]> {
    return this.http.get<ApiResponse<Banner[]>>(`${this.baseUrl}/banners/active`)
      .pipe(
        map(response => {
          if (response.success) {
            this.bannersSubject.next(response.data);
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch active banners');
        }),
        catchError(this.handleError<Banner[]>('getActiveBanners', []))
      );
  }

  /**
   * Get single banner by ID
   */
  getBanner(id: string): Observable<Banner> {
    return this.http.get<ApiResponse<Banner>>(`${this.baseUrl}/banners/${id}`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch banner');
        }),
        catchError(this.handleError<Banner>('getBanner'))
      );
  }

  /**
   * Create new banner with image upload
   */
  createBanner(formData: FormData): Observable<Banner> {
    return this.http.post<ApiResponse<Banner>>(`${this.baseUrl}/banners`, formData)
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh banners list
            this.getActiveBanners().subscribe();
            return response.data;
          }
          throw new Error(response.message || 'Failed to create banner');
        }),
        catchError(this.handleError<Banner>('createBanner'))
      );
  }

  /**
   * Update banner with optional image upload
   */
  updateBanner(id: string, formData: FormData): Observable<Banner> {
    return this.http.put<ApiResponse<Banner>>(`${this.baseUrl}/banners/${id}`, formData)
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh banners list
            this.getActiveBanners().subscribe();
            return response.data;
          }
          throw new Error(response.message || 'Failed to update banner');
        }),
        catchError(this.handleError<Banner>('updateBanner'))
      );
  }

  /**
   * Toggle banner active status
   */
  toggleBannerStatus(id: string): Observable<Banner> {
    return this.http.patch<ApiResponse<Banner>>(`${this.baseUrl}/banners/${id}/toggle`, {})
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh banners list
            this.getActiveBanners().subscribe();
            return response.data;
          }
          throw new Error(response.message || 'Failed to toggle banner status');
        }),
        catchError(this.handleError<Banner>('toggleBannerStatus'))
      );
  }

  /**
   * Delete banner
   */
  deleteBanner(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse<Banner>>(`${this.baseUrl}/banners/${id}`)
      .pipe(
        map(response => {
          if (response.success) {
            // Refresh banners list
            this.getActiveBanners().subscribe();
            return true;
          }
          throw new Error(response.message || 'Failed to delete banner');
        }),
        catchError(this.handleError<boolean>('deleteBanner', false))
      );
  }


   // ===== About OEC =====

   getAboutOec(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/about-oec`);
    }


     // ===== Meet Our Leadership =====

    getExecutives(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/executives`);
}



     // ===== Services =====


getServices(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/services`);
}

industrystats(): Observable<any> {
  return this.http.post<any>(`https://jobs.oec.gov.pk/api/industry-user-stats_api`,{});
}

  // ===== UTILITY METHODS =====

  /**
   * Get the full URL for uploaded images
   */
  getImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // Remove '/api' from baseUrl and add the image path
  const baseUrl = this.baseUrl.replace('/api', '');
  return `${baseUrl}${imagePath}`;
}

  // ===== About Us: Board of Directors =====

  getBoardOfDirectors(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/about-us/board-of-directors`)
      .pipe(
        catchError(this.handleError<any>('getBoardOfDirectors', {}))
      );
  }

  getPartnerships(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/about-us/partnerships`);
  }
  
  getDigitalTransformation(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/about-us/digital-transformations`);
  }
  /**
   * Check API health
   */
  checkHealth(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/health`)
      .pipe(
        catchError(this.handleError<any>('checkHealth', { success: false }))
      );
  }

  /**
   * Helper method for creating FormData for banner uploads
   */
  createBannerFormData(bannerData: any, imageFile?: File): FormData {
    const formData = new FormData();
    
    // Add image file if provided
    if (imageFile) {
      formData.append('background_image', imageFile);
    }
    
    // Add banner data
    formData.append('banner_title', bannerData.banner_title || '');
    formData.append('banner_title_color', bannerData.banner_title_color || '#FFFFFF');
    formData.append('banner_title_highlight_text', bannerData.banner_title_highlight_text || '');
    formData.append('banner_title_highlight_color', bannerData.banner_title_highlight_color || '#FFD700');
    
    // Handle subtitle based on type
    if (bannerData.banner_subtitle_type === 'points' && Array.isArray(bannerData.banner_subtitle)) {
      formData.append('banner_subtitle', JSON.stringify(bannerData.banner_subtitle));
    } else {
      formData.append('banner_subtitle', bannerData.banner_subtitle || '');
    }
    
    formData.append('banner_subtitle_type', bannerData.banner_subtitle_type || 'text');
    formData.append('support_message', bannerData.support_message || '');
    formData.append('green_button', bannerData.green_button || '');
    formData.append('green_button_link', bannerData.green_button_link || '');
    formData.append('gray_button', bannerData.gray_button || '');
    formData.append('gray_button_link', bannerData.gray_button_link || '');
    formData.append('is_active', bannerData.is_active ? 'true' : 'false');
    
    return formData;
  }

  // ===== MENU METHODS =====

  /**
   * Get all active menu items for public website
   */
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.baseUrl}/menu-items`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch menu items');
        }),
        catchError(this.handleError<MenuItem[]>('getMenuItems', []))
      );
  }

  /**
   * Get all active top bar buttons for public website
   */
  getTopBarButtons(): Observable<TopBarButton[]> {
    return this.http.get<ApiResponse<TopBarButton[]>>(`${this.baseUrl}/top-bar-buttons`)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          throw new Error(response.message || 'Failed to fetch top bar buttons');
        }),
        catchError(this.handleError<TopBarButton[]>('getTopBarButtons', []))
      );
  }

  /**
   * Get all navbar descriptions for About Us menu
   */
  getNavbarDescriptions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/about-us/navbar-descriptions`);
  }

  /**
   * Error handling
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // You can add user notification here
      // this.notificationService.showError(`${operation} failed: ${error.message}`);
      
      // Return a safe result so the app can continue working
      return new Observable<T>(observer => {
        if (result !== undefined) {
          observer.next(result);
        }
        observer.error(error);
      });
    };
  }
}