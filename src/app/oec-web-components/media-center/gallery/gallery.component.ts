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
  
    ];
  }

  initializeVideoCategories() {
    this.videoCategories = [

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
