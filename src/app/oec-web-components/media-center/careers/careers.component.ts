import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface JobPosting {
  _id: string;
  title: string;
  grade: string;
  location: string;
  deadline: string;
  applyLink: string;
}

interface DownloadableForm {
  _id: string;
  title: string;
  description: string;
  file_url: string;
}

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  jobPostings: JobPosting[] = [];
  downloadableForms: DownloadableForm[] = [];
  isLoading = true;

  totalPositions = 0;
  applicationForms = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadJobs();
    this.loadForms();
  }

  loadJobs(): void {
    this.apiService.getJobPostings().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.jobPostings = response.data;
          this.totalPositions = this.jobPostings.length;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadForms(): void {
    this.apiService.getCareerForms().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.downloadableForms = response.data;
          this.applicationForms = this.downloadableForms.length;
        }
      }
    });
  }

  getFileUrl(fileUrl: string): string {
    if (!fileUrl) return '#';
    return this.apiService.MainbaseUrl + fileUrl;
  }

  formatDeadline(deadline: string): string {
    if (!deadline) return '-';
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
