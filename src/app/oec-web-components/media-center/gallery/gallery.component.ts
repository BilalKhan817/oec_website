import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/api.service';

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
  _id: string;
  image_url: string;
  caption: string;
}

interface Video {
  _id: string;
  video_url: string;
  caption: string;
  duration: string;
}

interface Gallery {
  _id: string;
  title: string;
  gallery_type: string;
  description: string;
  photos: Photo[];
  videos: Video[];
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photoGalleries: Gallery[] = [];
  videoGalleries: Gallery[] = [];
  selectedPhoto: Photo | null = null;
  selectedVideo: Video | null = null;
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadGalleries();
  }

  loadGalleries(): void {
    this.apiService.getMediaGalleriesPage().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          const galleries: Gallery[] = response.data;
          this.photoGalleries = galleries.filter(
            g => (g.gallery_type === 'photo' || g.gallery_type === 'mixed') && g.photos?.length > 0
          );
          this.videoGalleries = galleries.filter(
            g => (g.gallery_type === 'video' || g.gallery_type === 'mixed') && g.videos?.length > 0
          );
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return this.apiService.MainbaseUrl + (path.startsWith('/') ? path : '/' + path);
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
}
