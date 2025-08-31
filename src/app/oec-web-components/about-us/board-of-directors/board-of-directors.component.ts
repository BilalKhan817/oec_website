import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-board-of-directors',
  templateUrl: './board-of-directors.component.html',
  styleUrls: ['./board-of-directors.component.css']
})
export class BoardOfDirectorsComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  boardofDirectors: any = [];
  ngOnInit(): void {
    this.getBoardofDirectors()
    // Component initialization logic can be added here
  }

  getBoardofDirectors() {
    this.apiService.getBoardOfDirectors().subscribe((data: any) => {
      this.boardofDirectors = data;
    });
  }

  /**
   * Handle download button clicks for different resources
   * @param resourceType - The type of resource to download
   */
  downloadResource(resourceType: string): void {
    // This is a placeholder implementation
    // In a real application, you would implement actual file download logic
    console.log(`Downloading ${resourceType}`);
    
    // Example implementation for different resource types
    switch (resourceType) {
      case 'board-notification':
        this.downloadFile('Latest Board Notification', 'board-notification.pdf');
        break;
      case 'governance-policy':
        this.downloadFile('OEC Governance Policy', 'governance-policy.pdf');
        break;
      case 'board-charter':
        this.downloadFile('Board Charter', 'board-charter.pdf');
        break;
      default:
        console.warn('Unknown resource type:', resourceType);
    }
  }

  /**
   * Simulate file download (placeholder implementation)
   * @param fileName - Name of the file to download
   * @param filePath - Path to the file
   */
  private downloadFile(fileName: string, filePath: string): void {
    // This is a placeholder implementation
    // In a real application, you would:
    // 1. Make an HTTP request to get the file
    // 2. Create a blob and download link
    // 3. Trigger the download
    
    alert(`Downloading ${fileName}...\n\nNote: This is a placeholder. In a real application, the actual file would be downloaded.`);
    
    // Example of how you might implement actual file download:
    /*
    this.http.get(filePath, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    });
    */
  }

  /**
   * Get current year for dynamic content
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
