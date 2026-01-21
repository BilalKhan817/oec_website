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

  // About Us data
  aboutOecData: any = {};
  governingLawData: any = {};
  oecAtGlanceData: any = {};
  ourFunctionsData: any = {};
  missionVisionData: any = {};
  achievementsData: any = {};
  whyChooseOecData: any = {};
  ourExecutivesData: any = {};

  // Emigrants data
  epsKoreaData: any = {};
  labourContractsData: any = {};
  epsResultsData: any = {};
  serviceAgreementsData: any = {};
  industriesData: any = {};

  // Development Hub data
  developmentHubData: any[] = [];

  // Media Center data
  latestAnnouncementsData: any = {};
  pressReleasesData: any = {};
  newsHighlightsData: any = {};
  eventsData: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeScrollEffects();
    this.loadMenuData();
    this.loadTopBarButtons();
    this.loadNavbarDescriptions();
    this.loadAboutUsData();
    this.loadEmigrantsData();
    this.loadDevelopmentHubData();
    this.loadMediaCenterData();
  }

  loadAboutUsData(): void {
    this.apiService.getAboutUsContent().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.aboutOecData = response.data;
        }
      },
      error: (error) => console.error('Error loading About OEC:', error)
    });

    this.apiService.getGoverningLaw().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.governingLawData = response.data;
        }
      },
      error: (error) => console.error('Error loading Governing Law:', error)
    });

    this.apiService.getOecAtGlance().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.oecAtGlanceData = response.data;
        }
      },
      error: (error) => console.error('Error loading OEC at Glance:', error)
    });

    this.apiService.getOurFunctions().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.ourFunctionsData = response.data;
        }
      },
      error: (error) => console.error('Error loading Our Functions:', error)
    });

    this.apiService.getMissionVision().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.missionVisionData = response.data;
        }
      },
      error: (error) => console.error('Error loading Mission Vision:', error)
    });

    this.apiService.getAchievements().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.achievementsData = response.data;
        }
      },
      error: (error) => console.error('Error loading Achievements:', error)
    });

    this.apiService.getWhyChooseOec().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.whyChooseOecData = response.data;
        }
      },
      error: (error) => console.error('Error loading Why Choose OEC:', error)
    });

    this.apiService.getOurExecutives().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.ourExecutivesData = response.data;
        }
      },
      error: (error) => console.error('Error loading Our Executives:', error)
    });
  }

  loadEmigrantsData(): void {
    this.apiService.getEPSKorea().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.epsKoreaData = response.data;
        }
      },
      error: (error) => console.error('Error loading EPS Korea:', error)
    });

    this.apiService.getLabourContracts().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.labourContractsData = response.data;
        }
      },
      error: (error) => console.error('Error loading Labour Contracts:', error)
    });

    this.apiService.getEPSResults().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.epsResultsData = response.data;
        }
      },
      error: (error) => console.error('Error loading EPS Results:', error)
    });

    this.apiService.getServiceAgreements().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.serviceAgreementsData = response.data;
        }
      },
      error: (error) => console.error('Error loading Service Agreements:', error)
    });

    this.apiService.getIndustries().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.industriesData = response.data;
        }
      },
      error: (error) => console.error('Error loading Industries:', error)
    });
  }

  loadDevelopmentHubData(): void {
    this.apiService.getDevelopmentHub().subscribe({
      next: (response: any) => {
        // Development Hub API returns array directly, not wrapped in success object
        if (Array.isArray(response)) {
          this.developmentHubData = response;
        } else if (response.success) {
          this.developmentHubData = response.data;
        }
      },
      error: (error) => console.error('Error loading Development Hub:', error)
    });
  }

  loadMediaCenterData(): void {
    this.apiService.getLatestAnnouncements().subscribe({
      next: (response: any) => {
        if (response.success && response.data && response.data.length > 0) {
          this.latestAnnouncementsData = response.data[0]; // Get first item
        }
      },
      error: (error) => console.error('Error loading Latest Announcements:', error)
    });

    this.apiService.getPressReleases().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.pressReleasesData = response.data;
        }
      },
      error: (error) => console.error('Error loading Press Releases:', error)
    });

    this.apiService.getNewsHighlights().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.newsHighlightsData = response.data;
        }
      },
      error: (error) => console.error('Error loading News Highlights:', error)
    });

    this.apiService.getEvents().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.eventsData = response.data;
        }
      },
      error: (error) => console.error('Error loading Events:', error)
    });
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

  getLeadershipRoute(title: string): string {
    if (title.toLowerCase().includes('managing director')) {
      return '/managing-director-message';
    } else if (title.toLowerCase().includes('board')) {
      return '/board-of-directors';
    } else {
      return '/our-executives';
    }
  }

  getLeadershipLinkText(title: string): string {
    if (title.toLowerCase().includes('managing director')) {
      return 'Read Message';
    } else if (title.toLowerCase().includes('board')) {
      return 'View Board';
    } else {
      return 'Meet Team';
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