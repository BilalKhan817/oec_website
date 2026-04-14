import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-statistics',
  templateUrl: './report-statistics.component.html',
  styleUrls: ['./report-statistics.component.css']
})
export class ReportStatisticsComponent implements OnInit {
  documents: any[] = [];
  sections: { name: string; documents: any[] }[] = [];
  isLoading = true;
  baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = this.apiService.MainbaseUrl;
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.apiService.getReportDocuments().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.documents = response.data;
          this.groupBySection();
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading report documents:', error);
        this.isLoading = false;
      }
    });
  }

  groupBySection(): void {
    const sectionMap = new Map<string, any[]>();
    for (const doc of this.documents) {
      const section = doc.section || 'General';
      if (!sectionMap.has(section)) {
        sectionMap.set(section, []);
      }
      sectionMap.get(section)!.push(doc);
    }
    this.sections = Array.from(sectionMap.entries()).map(([name, documents]) => ({
      name,
      documents
    }));
  }

  getFileUrl(filePath: string): string {
    if (!filePath) return '#';
    if (filePath.startsWith('http')) return filePath;
    return this.baseUrl + filePath;
  }
}
