import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, MenuItem, TopBarButton } from '../../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  activeTab: string = '';
  menuItems: MenuItem[] = [];
  topBarButtons: TopBarButton[] = [];
  loading = true;
  navbarDescriptions: any = {};

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeScrollEffects();
    this.loadMenuData();
    this.loadTopBarButtons();
    this.loadNavbarDescriptions();
  }

  loadNavbarDescriptions(): void {
    this.apiService.getNavbarDescriptions().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.navbarDescriptions = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading navbar descriptions:', error);
      }
    });
  }

  loadMenuData(): void {
    this.apiService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items.sort((a, b) => (a.order || 0) - (b.order || 0));
        // Set first tab as active for each menu with tabs
        this.menuItems.forEach(menu => {
          if (menu.tabs && menu.tabs.length > 0) {
            const firstTab = menu.tabs.sort((a, b) => (a.order || 0) - (b.order || 0))[0];
            if (firstTab && !this.activeTab) {
              this.activeTab = firstTab.tab_id;
            }
          }
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
        this.loading = false;
      }
    });
  }

  loadTopBarButtons(): void {
    this.apiService.getTopBarButtons().subscribe({
      next: (buttons) => {
        this.topBarButtons = buttons.sort((a, b) => (a.order || 0) - (b.order || 0));
      },
      error: (error) => {
        console.error('Error loading top bar buttons:', error);
      }
    });
  }

  getDesktopButtons(): TopBarButton[] {
    return this.topBarButtons.filter(btn => btn.show_on_mobile !== false);
  }

  getMobileButtons(): TopBarButton[] {
    return this.topBarButtons.filter(btn => btn.show_on_mobile === true);
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