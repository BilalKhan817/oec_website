import { Component } from '@angular/core';

@Component({
  selector: 'app-future-roadmaps',
  templateUrl: './future-roadmaps.component.html',
  styleUrls: ['./future-roadmaps.component.css']
})
export class FutureRoadmapsComponent {

  constructor() { }

  /**
   * Handles expansion goal interactions
   */
  onExpansionGoalClick(goalName: string): void {
    console.log(`Expansion goal clicked: ${goalName}`);
    // TODO: Implement expansion goal details modal
  }

  /**
   * Handles technology initiative interactions
   */
  onTechnologyInitiativeClick(initiativeName: string): void {
    console.log(`Technology initiative clicked: ${initiativeName}`);
    // TODO: Implement technology initiative details modal
  }

  /**
   * Handles goal card interactions
   */
  onGoalCardClick(goalName: string): void {
    console.log(`Goal card clicked: ${goalName}`);
    // TODO: Implement goal details modal
  }

  /**
   * Handles timeline milestone interactions
   */
  onTimelineMilestoneClick(year: string, milestone: string): void {
    console.log(`Timeline milestone clicked: ${year} - ${milestone}`);
    // TODO: Implement timeline milestone details
  }

  /**
   * Handles impact stat interactions
   */
  onImpactStatClick(statName: string): void {
    console.log(`Impact stat clicked: ${statName}`);
    // TODO: Implement detailed impact information
  }

  /**
   * Gets current year for timeline highlighting
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Checks if a timeline year is current or past
   */
  isTimelineYearActive(year: string): boolean {
    const currentYear = this.getCurrentYear();
    const timelineYear = parseInt(year);
    return timelineYear <= currentYear;
  }
}
