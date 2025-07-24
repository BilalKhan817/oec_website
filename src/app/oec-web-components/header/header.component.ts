import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  activeTab = 'about-overview';
  
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
    const element = event.currentTarget as HTMLElement;
    const content = element.querySelector('.expand-content');
    const icon:any = element.querySelector('.expand-icon');
    
    if (content && icon) {
      const isActive = content.classList.contains('active');
      
      if (isActive) {
        content.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('active');
        icon.style.transform = 'rotate(90deg)';
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