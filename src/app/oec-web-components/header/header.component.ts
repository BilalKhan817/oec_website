import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  activeTab = 'about-overview';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.initializeScrollEffects();
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  showTab(tabId: string): void {
    this.activeTab = tabId;
  }
  
  toggleExpand(event: Event): void {

    event.stopPropagation();
  
    const icon = event.currentTarget as HTMLElement;
    const card = icon.closest('.expandable-card');
    if (!card) return;
  
    const content = card.querySelector('.expand-content');
    const expandIcon = card.querySelector('.expand-icon') as HTMLElement;
  
    if (content && expandIcon) {
      const isActive = content.classList.contains('active');
  
      if (isActive) {
        content.classList.remove('active');
        expandIcon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('active');
        expandIcon.style.transform = 'rotate(90deg)';
      }
    }
  }
  
  private initializeScrollEffects(): void {
    let scrollTimer: any = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      
      scrollTimer = setTimeout(() => {
        const nav = document.querySelector('nav');
        if (nav) {
          if (window.scrollY > 10) {
            nav.classList.add('shadow-2xl');
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
          } else {
            nav.classList.remove('shadow-2xl');
            nav.style.backdropFilter = 'blur(15px)';
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
          }
        }
        scrollTimer = null;
      }, 10);
    });
  }
}