import { Component } from '@angular/core';

@Component({
  selector: 'app-signed-mous',
  templateUrl: './signed-mous.component.html',
  styleUrls: ['./signed-mous.component.css']
})
export class SignedMousComponent {

  constructor() { }

  /**
   * Handles MoU country interactions
   */
  onMouCountryClick(countryName: string): void {
    // TODO: Implement MoU country details modal
  }

  /**
   * Handles MoU type card interactions
   */
  onMouTypeCardClick(typeName: string): void {
    // TODO: Implement MoU type details modal
  }

  /**
   * Handles document link interactions
   */
  onDocumentLinkClick(documentName: string): void {
    // TODO: Implement document download or preview
  }

  /**
   * Handles contact item interactions
   */
  onContactItemClick(contactType: string, contactValue: string): void {
    // TODO: Implement contact actions (email, phone, website)
  }

  /**
   * Gets MoU status color class
   */
  getMouStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'active';
      case 'in process':
        return 'in-process';
      case 'in negotiation':
        return 'negotiation';
      case 'under discussion':
        return 'discussion';
      default:
        return '';
    }
  }

  /**
   * Opens email client
   */
  openEmail(): void {
    const email = '_____@oec.gov.pk';
    window.open(`mailto:${email}?subject=MoU Partnership Inquiry`, '_blank');
  }

  /**
   * Opens phone dialer
   */
  openPhone(): void {
    const phone = '+92-51-9253254';
    window.open(`tel:${phone}`, '_blank');
  }

  /**
   * Opens website
   */
  openWebsite(): void {
    window.open('https://www.oec.gov.pk', '_blank');
  }
}
