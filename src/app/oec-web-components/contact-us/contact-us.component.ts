import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  content: any = null;
  isLoading = true;

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.loadContactUsContent();
  }

  loadContactUsContent(): void {
    this.apiService.getContactUs().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.content = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact us content:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.subject && this.contactForm.message) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', this.contactForm);

      // Show success message (you can implement a proper notification system)
      alert('Thank you for your message! We will get back to you soon.');

      // Reset the form
      this.contactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
