import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface FAQCategory {
  _id: string;
  name: string;
  icon: string;
  faqs: FAQ[];
}

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  categories: FAQCategory[] = [];
  isLoading = true;

  phone = '051-9253252';
  email = 'info@oec.gov.pk';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadFaqs();
    this.loadSettings();
  }

  loadFaqs(): void {
    this.apiService.getFaqCategories().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.categories = response.data.map((cat: any) => ({
            ...cat,
            faqs: (cat.faqs || []).map((faq: any) => ({
              ...faq,
              isExpanded: false
            }))
          }));
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadSettings(): void {
    this.apiService.getFaqSettings().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.phone = response.data.phone || this.phone;
          this.email = response.data.email || this.email;
        }
      }
    });
  }

  toggleFaq(faq: FAQ) {
    faq.isExpanded = !faq.isExpanded;
  }
}
