import { Component } from '@angular/core';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.css']
})
export class SuccessStoriesComponent {

  constructor() { }

  /**
   * Handles the call-to-action button click
   * This method can be extended to navigate to opportunities page or open a modal
   */
  onExploreOpportunities(): void {
    // TODO: Implement navigation to opportunities page
    console.log('Explore opportunities clicked');
    // You can add navigation logic here
    // this.router.navigate(['/opportunities']);
  }

  /**
   * Handles video story interactions
   */
  onVideoStoryClick(): void {
    console.log('Video story clicked');
    // TODO: Implement video modal or navigation
  }

  /**
   * Handles social media link interactions
   */
  onSocialMediaClick(): void {
    console.log('Social media clicked');
    // TODO: Implement social media navigation
  }

  /**
   * Handles before & after gallery interactions
   */
  onBeforeAfterClick(): void {
    console.log('Before & after clicked');
    // TODO: Implement gallery modal
  }

  /**
   * Handles shareable cards interactions
   */
  onShareableCardsClick(): void {
    console.log('Shareable cards clicked');
    // TODO: Implement download/share functionality
  }
}
