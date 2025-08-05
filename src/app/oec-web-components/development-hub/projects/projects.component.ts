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
    console.log(`Project clicked: ${projectName}`);
    // TODO: Implement project details modal or navigation
  }

  /**
   * Handles efficiency card interactions
   */
  onEfficiencyCardClick(cardName: string): void {
    console.log(`Efficiency card clicked: ${cardName}`);
    // TODO: Implement efficiency details modal
  }

  /**
   * Handles impact stat interactions
   */
  onImpactStatClick(statName: string): void {
    console.log(`Impact stat clicked: ${statName}`);
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
