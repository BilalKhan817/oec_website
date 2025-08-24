import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

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
