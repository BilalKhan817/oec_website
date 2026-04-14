import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  constructor() { }

  /**
   * Handles project card interactions
   */
  onProjectClick(projectName: string): void {
    // TODO: Implement project details modal or navigation
  }

  /**
   * Handles efficiency card interactions
   */
  onEfficiencyCardClick(cardName: string): void {
    // TODO: Implement efficiency details modal
  }

  /**
   * Handles impact stat interactions
   */
  onImpactStatClick(statName: string): void {
    // TODO: Implement detailed impact information
  }

  /**
   * Gets project status color class
   */
  getProjectStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'in progress':
        return 'in-progress';
      case 'planned':
        return 'planned';
      default:
        return '';
    }
  }
}
