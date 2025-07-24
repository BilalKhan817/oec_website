
// Services Section Animation - Right to Left
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px 0px -100px 0px' // Trigger before fully in view
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animate section header (fade in from top)
                const header = section.querySelector('.text-center.mb-16');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                    header.style.transition = 'all 0.8s ease-out';
                    header.classList.add('animate-header');
                }
                
                // Animate service cards from right to left with staggered timing
                const serviceCards = section.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0) scale(1)';
                        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        
                        // Add subtle bounce effect
                        setTimeout(() => {
                            card.style.transform = 'translateX(-5px) scale(1.01)';
                            setTimeout(() => {
                                card.style.transform = 'translateX(0) scale(1)';
                            }, 200);
                        }, 400);
                        
                    }, index * 200); // 200ms delay between each card
                });
                
                // Animate bottom CTA section
                const cta = section.querySelector('.text-center.mt-16');
                if (cta) {
                    setTimeout(() => {
                        cta.style.opacity = '1';
                        cta.style.transform = 'translateY(0)';
                        cta.style.transition = 'all 0.8s ease-out';
                    }, (serviceCards.length * 200) + 400); // After all cards
                }
                
                // Animate floating background elements
                const floatingElements = section.querySelectorAll('.absolute.rounded-full');
                floatingElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = element.classList.contains('opacity-5') ? '0.05' : 
                                              element.classList.contains('opacity-8') ? '0.08' : '0.1';
                        element.style.transition = 'opacity 1s ease-out';
                    }, 300 + (index * 150));
                });
                
                // Stop observing once animation is triggered
                observer.unobserve(section);
            }
        });
    }, observerOptions);
    
    // Initialize the services section
    const servicesSection = document.querySelector('section.bg-gradient-to-br.from-slate-900');
    if (servicesSection) {
        // Set initial states for animated elements
        const header = servicesSection.querySelector('.text-center.mb-16');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(40px)';
        }
        
        // Set initial state for service cards (slide from right)
        const serviceCards = servicesSection.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(100px) scale(0.9)';
        });
        
        // Set initial state for CTA
        const cta = servicesSection.querySelector('.text-center.mt-16');
        if (cta) {
            cta.style.opacity = '0';
            cta.style.transform = 'translateY(40px)';
        }
        
        // Set initial state for floating elements
        const floatingElements = servicesSection.querySelectorAll('.absolute.rounded-full');
        floatingElements.forEach(element => {
            element.style.opacity = '0';
        });
        
        // Start observing
        observer.observe(servicesSection);
    }
    
    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Icon container animation
            const iconContainer = this.querySelector('.icon-gradient');
            if (iconContainer) {
                iconContainer.style.transform = 'scale(1.1) rotate(5deg)';
                iconContainer.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                iconContainer.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
            }
            
            // Title glow effect
            const title = this.querySelector('h3');
            if (title) {
                title.style.textShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
                title.style.transition = 'all 0.3s ease';
            }
            
            // Card elevation
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon container
            const iconContainer = this.querySelector('.icon-gradient');
            if (iconContainer) {
                iconContainer.style.transform = 'scale(1) rotate(0deg)';
                iconContainer.style.boxShadow = '';
            }
            
            // Reset title
            const title = this.querySelector('h3');
            if (title) {
                title.style.textShadow = 'none';
            }
            
            // Reset card
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(16, 185, 129, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: cardRipple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes cardRipple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .animate-header {
            animation: headerSlideIn 0.8s ease-out;
        }
        
        @keyframes headerSlideIn {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Smooth parallax for floating elements
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const servicesSection = document.querySelector('section.bg-gradient-to-br.from-slate-900');
        
        if (servicesSection) {
            const rect = servicesSection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                const floatingElements = servicesSection.querySelectorAll('.absolute.rounded-full');
                floatingElements.forEach((element, index) => {
                    const speed = 0.05 + (index % 3) * 0.02;
                    const yOffset = (scrolled - servicesSection.offsetTop) * speed;
                    element.style.transform = `translateY(${yOffset}px)`;
                });
            }
        }
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Touch feedback for mobile
    if ('ontouchstart' in window) {
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 50);
            });
        });
    }
    
    // Accessibility improvements
    serviceCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Service card - ' + card.querySelector('h3').textContent);
        
        card.addEventListener('focus', function() {
            this.style.outline = '3px solid #10b981';
            this.style.outlineOffset = '4px';
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Performance optimization
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        // Simplify animations on low-end devices
        const allAnimatedElements = document.querySelectorAll('.service-card');
        allAnimatedElements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });
    }
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const allAnimations = document.querySelectorAll('[class*="animate-"]');
        allAnimations.forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'opacity 0.3s ease';
        });
    }
});
// Intersection Observer for viewport-triggered animations
// Professional Counter Animation with Easing
document.addEventListener('DOMContentLoaded', function() {
    function animateCounter(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const startVal = parseInt(start.replace(/[^\d]/g, '')) || 0;
        const endVal = parseInt(end.replace(/[^\d]/g, '')) || 0;
        
        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const currentVal = Math.floor(startVal + (endVal - startVal) * easedProgress);
            
            // Format number with commas
            const formattedNumber = currentVal.toLocaleString();
            element.textContent = formattedNumber + suffix;
            
            // Add visual effects during animation
            if (progress < 1) {
                element.style.textShadow = `0 0 ${10 * (1 - progress)}px currentColor`;
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
                element.style.textShadow = '0 0 5px currentColor';
                
                // Final pulse effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                    element.style.transition = 'transform 0.3s ease';
                }, 150);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Enhanced Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animate counters with staggered timing
                setTimeout(() => {
                    const counter1 = section.querySelector('.counter-1');
                    if (counter1) animateCounter(counter1, '0', '156,118', 2000);
                }, 200);
                
                setTimeout(() => {
                    const counter2 = section.querySelector('.counter-2');
                    if (counter2) animateCounter(counter2, '0', '982,058', 1800, '+');
                }, 400);
                
                setTimeout(() => {
                    const counter3 = section.querySelector('.counter-3');
                    if (counter3) animateCounter(counter3, '0', '225,106', 1600);
                }, 600);
                
                setTimeout(() => {
                    const counter4 = section.querySelector('.counter-4');
                    if (counter4) animateCounter(counter4, '0', '25,106', 1400);
                }, 800);
                
                setTimeout(() => {
                    const counter5 = section.querySelector('.counter-5');
                    if (counter5) animateCounter(counter5, '0', '118', 1200);
                }, 1000);
                
                // Trigger slide animations
                const slideElements = section.querySelectorAll('[class*="animate-slide-up"]');
                slideElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('in-view');
                    }, index * 100);
                });
                
                observer.unobserve(section);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Let details/summary work naturally, just add smooth animations
    const mobileDropdowns = document.querySelectorAll('#mobile-menu details');
    mobileDropdowns.forEach(details => {
        const content = details.querySelector('.bg-gray-50');
        if (content) {
            content.style.transition = 'max-height 0.3s ease';
            content.style.overflow = 'hidden';
        }
        
        details.addEventListener('toggle', function() {
            if (content) {
                if (this.open) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0px';
                }
            }
        });
    });
    
    // Expandable cards inside mobile menu
    document.querySelectorAll('#mobile-menu .expandable-card').forEach(card => {
        const content = card.querySelector('.expand-content');
        const icon = card.querySelector('.expand-icon');
        
        if (content) {
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
        }
        
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
        }
        
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(90deg)';
            } else {
                content.style.maxHeight = '0px';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
// Enhanced Tab Switching with Visual Feedback
function showTab(tabId) {
    const clickedButton = event.target.closest('.tab-button');
    const tabContainer = clickedButton.closest('.tab-dropdown') || clickedButton.closest('[class*="dropdown"]');
    
    if (!tabContainer) return;
    
    // Get all tab contents and buttons within this container
    const tabContents = tabContainer.querySelectorAll('.tab-content');
    const tabButtons = tabContainer.querySelectorAll('.tab-button');
    
    // Hide all tab contents with animation
    tabContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => {
            content.classList.remove('active');
        }, 150);
    });
    
    // Remove active class from all tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.style.background = '';
        button.style.color = '';
        button.style.transform = '';
        button.style.boxShadow = '';
    });
    
    // Show selected tab content with animation
    setTimeout(() => {
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
            targetTab.style.opacity = '0';
            targetTab.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                targetTab.style.opacity = '1';
                targetTab.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // Add active styles to clicked tab button
        clickedButton.classList.add('active');
        clickedButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        clickedButton.style.color = 'white';
        clickedButton.style.transform = 'translateY(-2px)';
        clickedButton.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
    }, 150);
}

// Enhanced Expandable Content with Better UX
function toggleExpand(element) {
    const content = element.querySelector('.expand-content');
    const icon = element.querySelector('.expand-icon');
    const isActive = content.classList.contains('active');
    
    // Add loading state
    element.style.pointerEvents = 'none';
    
    if (isActive) {
        // Collapse
        content.style.maxHeight = content.scrollHeight + 'px';
        content.offsetHeight; // Force reflow
        content.style.maxHeight = '0';
        content.classList.remove('active');
        
        icon.style.transform = 'rotate(0deg)';
        element.classList.remove('active', 'border-green-300', 'bg-green-50');
        
        setTimeout(() => {
            element.style.pointerEvents = 'auto';
        }, 400);
        
    } else {
        // Expand
        content.classList.add('active');
        content.style.maxHeight = '0';
        content.offsetHeight; // Force reflow
        content.style.maxHeight = content.scrollHeight + 'px';
        
        icon.style.transform = 'rotate(90deg)';
        element.classList.add('active', 'border-green-300', 'bg-green-50');
        
        // Reset max-height after animation
        setTimeout(() => {
            content.style.maxHeight = 'none';
            element.style.pointerEvents = 'auto';
        }, 400);
    }
}

// Auto-open first tab for each dropdown on hover
document.querySelectorAll('.group').forEach(group => {
    const dropdown = group.querySelector('.tab-dropdown, .dropdown');
    if (!dropdown) return;
    
    group.addEventListener('mouseenter', function() {
        setTimeout(() => {
            const firstTab = dropdown.querySelector('.tab-button');
            const firstTabContent = dropdown.querySelector('.tab-content');
            
            if (firstTab && firstTabContent && !dropdown.querySelector('.tab-button.active')) {
                // Reset all tabs
                dropdown.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                dropdown.querySelectorAll('.tab-button').forEach(button => {
                    button.classList.remove('active');
                });
                
                // Activate first tab
                firstTab.classList.add('active');
                firstTabContent.classList.add('active');
            }
        }, 100);
    });
});

// Enhanced scroll effects with throttling
let scrollTimer = null;
window.addEventListener('scroll', function() {
    if (scrollTimer) return;
    
    scrollTimer = setTimeout(() => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 10) {
            nav.classList.add('shadow-2xl');
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.classList.remove('shadow-2xl');
            nav.style.backdropFilter = 'blur(15px)';
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        scrollTimer = null;
    }, 10);
});

// Enhanced accessibility
document.addEventListener('keydown', function(event) {
    // Tab navigation for dropdowns
    if (event.key === 'Tab') {
        const activeDropdown = document.querySelector('.group:hover .dropdown, .group:hover .tab-dropdown');
        if (activeDropdown && !activeDropdown.contains(event.target)) {
            // Close dropdown when tabbing out
            event.target.closest('.group')?.classList.remove('hover');
        }
    }
});


// COMPLETE MOBILE MENU REPLACEMENT
// Add this script at the end of your body tag
document.addEventListener('DOMContentLoaded', function() {
    // Create a new mobile menu from scratch
    function createNewMobileMenu() {
        // Find the existing mobile menu to replace
        const existingMobileMenu = document.getElementById('mobile-menu');
        if (!existingMobileMenu) return;
        
        // Create container for the new menu
        const newMobileMenuContainer = document.createElement('div');
        newMobileMenuContainer.id = 'new-mobile-menu';
        newMobileMenuContainer.className = 'new-mobile-menu lg:hidden bg-white border-t border-gray-200 shadow-lg';
        newMobileMenuContainer.style.maxHeight = '0';
        newMobileMenuContainer.style.overflow = 'hidden';
        newMobileMenuContainer.style.transition = 'max-height 0.5s ease';
        
        // Create the menu HTML
        newMobileMenuContainer.innerHTML = `
            <div class="py-4">
                <div class="space-y-1">
                    <!-- Home Link -->
                    <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg mx-2">
                        <i class="fas fa-home w-5 text-lg"></i>
                        <span class="font-medium">Home</span>
                    </a>
                    
                    <!-- About Us -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-info-circle w-5 text-lg"></i>
                                <span class="font-medium">About Us</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3 space-y-2">
                                <div class="nm-expandable border border-gray-200 rounded-lg p-3">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium">About OEC</span>
                                        <i class="fas fa-chevron-right nm-expand-icon text-xs"></i>
                                    </div>
                                    <div class="nm-expandable-content mt-2" style="display:none;">
                                        <p class="text-xs text-gray-600">Learn about our organization, history, and mission to serve Pakistani workers worldwide.</p>
                                    </div>
                                </div>
                                
                                <div class="nm-expandable border border-gray-200 rounded-lg p-3">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium">Leadership Team</span>
                                        <i class="fas fa-chevron-right nm-expand-icon text-xs"></i>
                                    </div>
                                    <div class="nm-expandable-content mt-2" style="display:none;">
                                        <p class="text-xs text-gray-600">Meet our board of directors, executives, and management team.</p>
                                    </div>
                                </div>
                                
                                <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Mission & Vision</a>
                                <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Achievements</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Emigrants -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-suitcase w-5 text-lg"></i>
                                <span class="font-medium">Emigrants</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3">
                                <div class="image-card bg-white rounded-lg overflow-hidden shadow-sm mb-3">
                                    <div class="h-16 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                                        <i class="fas fa-flag text-white text-xl"></i>
                                    </div>
                                    <div class="p-3">
                                        <h3 class="font-bold text-sm">EPS Korea</h3>
                                        <p class="text-xs text-gray-600">Employment opportunities in South Korea</p>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Foreign Service Agreement</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">How to get Protector</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Fee Structure</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Development Hub -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-rocket w-5 text-lg"></i>
                                <span class="font-medium">Development Hub</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3">
                                <div class="grid grid-cols-2 gap-2 mb-3">
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-trophy text-yellow-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Success Stories</div>
                                    </div>
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-project-diagram text-blue-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Projects</div>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Future Plans</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">MoUs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Media Center -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-tv w-5 text-lg"></i>
                                <span class="font-medium">Media Center</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3">
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-images text-green-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Photo Gallery</div>
                                    </div>
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-video text-red-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Video Gallery</div>
                                    </div>
                                </div>
                                <div class="space-y-2 mt-3">
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Downloads</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">FAQs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Reports & Analytics -->
                    <a href="/reports" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg mx-2">
                        <i class="fas fa-chart-bar w-5 text-lg"></i>
                        <span class="font-medium">Reports & Analytics</span>
                    </a>
                    
                    <!-- Contact Us -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-phone w-5 text-lg"></i>
                                <span class="font-medium">Contact Us</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3 space-y-3">
                                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-3">
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-building"></i>
                                        <span class="font-medium">Headquarters</span>
                                    </div>
                                    <p class="text-xs mt-1 opacity-90">OEC Main Office, Islamabad</p>
                                </div>
                                <button class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                                    <i class="fas fa-comment mr-2"></i>
                                    Send Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Replace the existing menu with our new one
        existingMobileMenu.parentNode.replaceChild(newMobileMenuContainer, existingMobileMenu);
        
        // Setup mobile menu toggle button
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            // Remove existing event listeners by cloning
            const newMenuBtn = mobileMenuBtn.cloneNode(true);
            mobileMenuBtn.parentNode.replaceChild(newMenuBtn, mobileMenuBtn);
            
            // Add our own event listener
            newMenuBtn.addEventListener('click', function() {
                const mobileMenu = document.getElementById('new-mobile-menu');
                if (mobileMenu) {
                    if (mobileMenu.style.maxHeight === '0px' || mobileMenu.style.maxHeight === '') {
                        mobileMenu.style.maxHeight = '80vh';
                        newMenuBtn.classList.add('active');
                    } else {
                        mobileMenu.style.maxHeight = '0px';
                        newMenuBtn.classList.remove('active');
                    }
                }
            });
        }
        
        // Setup dropdown toggles
        const dropdownToggles = document.querySelectorAll('.nm-dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.nm-dropdown');
                const content = dropdown.querySelector('.nm-dropdown-content');
                const icon = this.querySelector('.nm-icon');
                
                // Toggle this dropdown
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    if (icon) icon.style.transform = 'rotate(180deg)';
                } else {
                    content.style.display = 'none';
                    if (icon) icon.style.transform = 'rotate(0)';
                }
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherDropdown = otherToggle.closest('.nm-dropdown');
                        const otherContent = otherDropdown.querySelector('.nm-dropdown-content');
                        const otherIcon = otherToggle.querySelector('.nm-icon');
                        
                        otherContent.style.display = 'none';
                        if (otherIcon) otherIcon.style.transform = 'rotate(0)';
                    }
                });
            });
        });
        
        // Setup expandable cards
        const expandables = document.querySelectorAll('.nm-expandable');
        expandables.forEach(expandable => {
            expandable.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const content = this.querySelector('.nm-expandable-content');
                const icon = this.querySelector('.nm-expand-icon');
                
                // Toggle content visibility
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    if (icon) icon.style.transform = 'rotate(90deg)';
                } else {
                    content.style.display = 'none';
                    if (icon) icon.style.transform = 'rotate(0)';
                }
            });
        });
    }
    
    // Call the function to create our new menu
    createNewMobileMenu();
});
// Modal functionality
function closeModal() {
    const modal = document.getElementById('oec-announcements-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Auto-show modal on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if modal should be shown (not shown today)
    const today = new Date().toDateString();
    const modalShownToday = localStorage.getItem('oec-modal-shown') === today;
    
    if (!modalShownToday) {
        // Show modal after 2 seconds
        setTimeout(() => {
            const modal = document.getElementById('oec-announcements-modal');
            if (modal) {
                modal.style.display = 'flex';
                // Trigger animation
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modal.style.transform = 'scale(1)';
                }, 50);
            }
        }, 2000);
    }
    
    // Handle "Don't show again today" checkbox
    const checkbox = document.querySelector('#oec-announcements-modal input[type="checkbox"]');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('oec-modal-shown', today);
            } else {
                localStorage.removeItem('oec-modal-shown');
            }
        });
    }
    
    // Close modal when clicking backdrop
    const modal = document.getElementById('oec-announcements-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
       // Scroll-triggered animations
       function isElementInViewport(el) {
           const rect = el.getBoundingClientRect();
           return (
               rect.top >= 0 &&
               rect.left >= 0 &&
               rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
               rect.right <= (window.innerWidth || document.documentElement.clientWidth)
           );
       }

       function checkScroll() {
           const elements = document.querySelectorAll('.scroll-trigger, .step-card, .benefit-card');
           elements.forEach(element => {
               if (isElementInViewport(element)) {
                   element.classList.add('in-view', 'animate');
               }
           });
       }

       // Initialize animations on page load
       document.addEventListener('DOMContentLoaded', function() {
           checkScroll();
           
           // Add scroll event listener with throttling
           let ticking = false;
           window.addEventListener('scroll', function() {
               if (!ticking) {
                   requestAnimationFrame(function() {
                       checkScroll();
                       ticking = false;
                   });
                   ticking = true;
               }
           });

           // Stagger step animations
           setTimeout(() => {
               document.querySelectorAll('.step-card').forEach((step, index) => {
                   setTimeout(() => {
                       step.classList.add('animate');
                   }, index * 200);
               });
           }, 500);

           // Stagger benefit card animations
           setTimeout(() => {
               document.querySelectorAll('.benefit-card').forEach((card, index) => {
                   setTimeout(() => {
                       card.classList.add('animate');
                   }, index * 150);
               });
           }, 1000);
       });

       // Smooth scrolling for anchor links
       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
           anchor.addEventListener('click', function (e) {
               e.preventDefault();
               const target = document.querySelector(this.getAttribute('href'));
               if (target) {
                   target.scrollIntoView({
                       behavior: 'smooth',
                       block: 'start'
                   });
               }
           });
       });

// Modal functionality
function closeModal() {
    const modal = document.getElementById('oec-announcements-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Auto-show modal on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if modal should be shown (not shown today)
    const today = new Date().toDateString();
    const modalShownToday = localStorage.getItem('oec-modal-shown') === today;
    
    if (!modalShownToday) {
        // Show modal after 2 seconds
        setTimeout(() => {
            const modal = document.getElementById('oec-announcements-modal');
            if (modal) {
                modal.style.display = 'flex';
                // Trigger animation
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modal.style.transform = 'scale(1)';
                }, 50);
            }
        }, 2000);
    }
    
    // Handle "Don't show again today" checkbox
    const checkbox = document.querySelector('#oec-announcements-modal input[type="checkbox"]');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('oec-modal-shown', today);
            } else {
                localStorage.removeItem('oec-modal-shown');
            }
        });
    }
    
    // Close modal when clicking backdrop
    const modal = document.getElementById('oec-announcements-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

       // Scroll-triggered animations
       function isElementInViewport(el) {
           const rect = el.getBoundingClientRect();
           return (
               rect.top >= 0 &&
               rect.left >= 0 &&
               rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
               rect.right <= (window.innerWidth || document.documentElement.clientWidth)
           );
       }

       function checkScroll() {
           const elements = document.querySelectorAll('.scroll-trigger, .process-step, .testimonial-card');
           elements.forEach(element => {
               if (isElementInViewport(element)) {
                   element.classList.add('in-view', 'animate');
               }
           });
       }

       // FAQ Toggle Function
       function toggleFAQ(faqId) {
           const faqItem = document.getElementById(faqId);
           const content = faqItem.querySelector('.faq-content');
           const icon = faqItem.querySelector('.faq-icon');
           
           // Close all other FAQs
           document.querySelectorAll('.faq-item').forEach(item => {
               if (item.id !== faqId) {
                   const otherContent = item.querySelector('.faq-content');
                   const otherIcon = item.querySelector('.faq-icon');
                   otherContent.style.maxHeight = '0';
                   otherIcon.style.transform = 'rotate(0deg)';
               }
           });
           
           // Toggle current FAQ
           if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
               content.style.maxHeight = content.scrollHeight + 'px';
               icon.style.transform = 'rotate(45deg)';
           } else {
               content.style.maxHeight = '0';
               icon.style.transform = 'rotate(0deg)';
           }
       }

       // Initialize animations on page load
       document.addEventListener('DOMContentLoaded', function() {
           checkScroll();
           
           // Add scroll event listener with throttling
           let ticking = false;
           window.addEventListener('scroll', function() {
               if (!ticking) {
                   requestAnimationFrame(function() {
                       checkScroll();
                       ticking = false;
                   });
                   ticking = true;
               }
           });

           // Stagger process step animations
           setTimeout(() => {
               document.querySelectorAll('.process-step').forEach((step, index) => {
                   setTimeout(() => {
                       step.classList.add('animate');
                   }, index * 200);
               });
           }, 500);

           // Stagger testimonial animations
           setTimeout(() => {
               document.querySelectorAll('.testimonial-card').forEach((card, index) => {
                   setTimeout(() => {
                       card.classList.add('animate');
                   }, index * 300);
               });
           }, 1000);
       });

       // Smooth scrolling for anchor links
       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
           anchor.addEventListener('click', function (e) {
               e.preventDefault();
               const target = document.querySelector(this.getAttribute('href'));
               if (target) {
                   target.scrollIntoView({
                       behavior: 'smooth',
                       block: 'start'
                   });
               }
           });
       });
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Let details/summary work naturally, just add smooth animations
    const mobileDropdowns = document.querySelectorAll('#mobile-menu details');
    mobileDropdowns.forEach(details => {
        const content = details.querySelector('.bg-gray-50');
        if (content) {
            content.style.transition = 'max-height 0.3s ease';
            content.style.overflow = 'hidden';
        }
        
        details.addEventListener('toggle', function() {
            if (content) {
                if (this.open) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0px';
                }
            }
        });
    });
    
    // Expandable cards inside mobile menu
    document.querySelectorAll('#mobile-menu .expandable-card').forEach(card => {
        const content = card.querySelector('.expand-content');
        const icon = card.querySelector('.expand-icon');
        
        if (content) {
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
        }
        
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
        }
        
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(90deg)';
            } else {
                content.style.maxHeight = '0px';
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
// Enhanced Tab Switching with Visual Feedback
function showTab(tabId) {
    const clickedButton = event.target.closest('.tab-button');
    const tabContainer = clickedButton.closest('.tab-dropdown') || clickedButton.closest('[class*="dropdown"]');
    
    if (!tabContainer) return;
    
    // Get all tab contents and buttons within this container
    const tabContents = tabContainer.querySelectorAll('.tab-content');
    const tabButtons = tabContainer.querySelectorAll('.tab-button');
    
    // Hide all tab contents with animation
    tabContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => {
            content.classList.remove('active');
        }, 150);
    });
    
    // Remove active class from all tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.style.background = '';
        button.style.color = '';
        button.style.transform = '';
        button.style.boxShadow = '';
    });
    
    // Show selected tab content with animation
    setTimeout(() => {
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
            targetTab.style.opacity = '0';
            targetTab.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                targetTab.style.opacity = '1';
                targetTab.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // Add active styles to clicked tab button
        clickedButton.classList.add('active');
        clickedButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        clickedButton.style.color = 'white';
        clickedButton.style.transform = 'translateY(-2px)';
        clickedButton.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
    }, 150);
}

// Enhanced Expandable Content with Better UX
function toggleExpand(element) {
    const content = element.querySelector('.expand-content');
    const icon = element.querySelector('.expand-icon');
    const isActive = content.classList.contains('active');
    
    // Add loading state
    element.style.pointerEvents = 'none';
    
    if (isActive) {
        // Collapse
        content.style.maxHeight = content.scrollHeight + 'px';
        content.offsetHeight; // Force reflow
        content.style.maxHeight = '0';
        content.classList.remove('active');
        
        icon.style.transform = 'rotate(0deg)';
        element.classList.remove('active', 'border-green-300', 'bg-green-50');
        
        setTimeout(() => {
            element.style.pointerEvents = 'auto';
        }, 400);
        
    } else {
        // Expand
        content.classList.add('active');
        content.style.maxHeight = '0';
        content.offsetHeight; // Force reflow
        content.style.maxHeight = content.scrollHeight + 'px';
        
        icon.style.transform = 'rotate(90deg)';
        element.classList.add('active', 'border-green-300', 'bg-green-50');
        
        // Reset max-height after animation
        setTimeout(() => {
            content.style.maxHeight = 'none';
            element.style.pointerEvents = 'auto';
        }, 400);
    }
}

// Auto-open first tab for each dropdown on hover
document.querySelectorAll('.group').forEach(group => {
    const dropdown = group.querySelector('.tab-dropdown, .dropdown');
    if (!dropdown) return;
    
    group.addEventListener('mouseenter', function() {
        setTimeout(() => {
            const firstTab = dropdown.querySelector('.tab-button');
            const firstTabContent = dropdown.querySelector('.tab-content');
            
            if (firstTab && firstTabContent && !dropdown.querySelector('.tab-button.active')) {
                // Reset all tabs
                dropdown.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                dropdown.querySelectorAll('.tab-button').forEach(button => {
                    button.classList.remove('active');
                });
                
                // Activate first tab
                firstTab.classList.add('active');
                firstTabContent.classList.add('active');
            }
        }, 100);
    });
});

// Enhanced scroll effects with throttling
if (typeof window.scrollTimer === 'undefined') {
  window.scrollTimer = null;

  window.addEventListener('scroll', function () {
    if (window.scrollTimer) return;

    window.scrollTimer = setTimeout(() => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 10) {
        nav.classList.add('shadow-2xl');
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        nav.classList.remove('shadow-2xl');
        nav.style.backdropFilter = 'blur(15px)';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
      }
      window.scrollTimer = null;
    }, 10);
  });
}


// Enhanced accessibility
document.addEventListener('keydown', function(event) {
    // Tab navigation for dropdowns
    if (event.key === 'Tab') {
        const activeDropdown = document.querySelector('.group:hover .dropdown, .group:hover .tab-dropdown');
        if (activeDropdown && !activeDropdown.contains(event.target)) {
            // Close dropdown when tabbing out
            event.target.closest('.group')?.classList.remove('hover');
        }
    }
});


// COMPLETE MOBILE MENU REPLACEMENT
// Add this script at the end of your body tag
document.addEventListener('DOMContentLoaded', function() {
    // Create a new mobile menu from scratch
    function createNewMobileMenu() {
        // Find the existing mobile menu to replace
        const existingMobileMenu = document.getElementById('mobile-menu');
        if (!existingMobileMenu) return;
        
        // Create container for the new menu
        const newMobileMenuContainer = document.createElement('div');
        newMobileMenuContainer.id = 'new-mobile-menu';
        newMobileMenuContainer.className = 'new-mobile-menu lg:hidden bg-white border-t border-gray-200 shadow-lg';
        newMobileMenuContainer.style.maxHeight = '0';
        newMobileMenuContainer.style.overflow = 'hidden';
        newMobileMenuContainer.style.transition = 'max-height 0.5s ease';
        
        // Create the menu HTML
        newMobileMenuContainer.innerHTML = `
            <div class="py-4">
                <div class="space-y-1">
                    <!-- Home Link -->
                    <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg mx-2">
                        <i class="fas fa-home w-5 text-lg"></i>
                        <span class="font-medium">Home</span>
                    </a>
                    
                    <!-- About Us -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-info-circle w-5 text-lg"></i>
                                <span class="font-medium">About Us</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3 space-y-2">
                                <div class="nm-expandable border border-gray-200 rounded-lg p-3">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium">About OEC</span>
                                        <i class="fas fa-chevron-right nm-expand-icon text-xs"></i>
                                    </div>
                                    <div class="nm-expandable-content mt-2" style="display:none;">
                                        <p class="text-xs text-gray-600">Learn about our organization, history, and mission to serve Pakistani workers worldwide.</p>
                                    </div>
                                </div>
                                
                                <div class="nm-expandable border border-gray-200 rounded-lg p-3">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium">Leadership Team</span>
                                        <i class="fas fa-chevron-right nm-expand-icon text-xs"></i>
                                    </div>
                                    <div class="nm-expandable-content mt-2" style="display:none;">
                                        <p class="text-xs text-gray-600">Meet our board of directors, executives, and management team.</p>
                                    </div>
                                </div>
                                
                                <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Mission & Vision</a>
                                <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Achievements</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Emigrants -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-suitcase w-5 text-lg"></i>
                                <span class="font-medium">Emigrants</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3">
                                <div class="image-card bg-white rounded-lg overflow-hidden shadow-sm mb-3">
                                    <div class="h-16 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                                        <i class="fas fa-flag text-white text-xl"></i>
                                    </div>
                                    <div class="p-3">
                                        <h3 class="font-bold text-sm">EPS Korea</h3>
                                        <p class="text-xs text-gray-600">Employment opportunities in South Korea</p>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Foreign Service Agreement</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">How to get Protector</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Fee Structure</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Development Hub -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-rocket w-5 text-lg"></i>
                                <span class="font-medium">Development Hub</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3">
                                <div class="grid grid-cols-2 gap-2 mb-3">
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-trophy text-yellow-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Success Stories</div>
                                    </div>
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-project-diagram text-blue-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Projects</div>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Future Plans</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">MoUs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Media Center -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-tv w-5 text-lg"></i>
                                <span class="font-medium">Media Center</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3">
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-images text-green-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Photo Gallery</div>
                                    </div>
                                    <div class="text-center p-2 bg-white rounded-lg">
                                        <i class="fas fa-video text-red-500 text-lg mb-1"></i>
                                        <div class="text-xs font-medium">Video Gallery</div>
                                    </div>
                                </div>
                                <div class="space-y-2 mt-3">
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">Downloads</a>
                                    <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-all rounded">FAQs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Reports & Analytics -->
                    <a href="/reports" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg mx-2">
                        <i class="fas fa-chart-bar w-5 text-lg"></i>
                        <span class="font-medium">Reports & Analytics</span>
                    </a>
                    
                    <!-- Contact Us -->
                    <div class="nm-dropdown mx-2">
                        <button class="nm-dropdown-toggle w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-phone w-5 text-lg"></i>
                                <span class="font-medium">Contact Us</span>
                            </div>
                            <i class="fas fa-chevron-down nm-icon text-sm"></i>
                        </button>
                        <div class="nm-dropdown-content bg-gray-50 mt-2 rounded-lg mx-4" style="display:none;">
                            <div class="p-3 space-y-3">
                                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-3">
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-building"></i>
                                        <span class="font-medium">Headquarters</span>
                                    </div>
                                    <p class="text-xs mt-1 opacity-90">OEC Main Office, Islamabad</p>
                                </div>
                                <button class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                                    <i class="fas fa-comment mr-2"></i>
                                    Send Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Replace the existing menu with our new one
        existingMobileMenu.parentNode.replaceChild(newMobileMenuContainer, existingMobileMenu);
        
        // Setup mobile menu toggle button
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            // Remove existing event listeners by cloning
            const newMenuBtn = mobileMenuBtn.cloneNode(true);
            mobileMenuBtn.parentNode.replaceChild(newMenuBtn, mobileMenuBtn);
            
            // Add our own event listener
            newMenuBtn.addEventListener('click', function() {
                const mobileMenu = document.getElementById('new-mobile-menu');
                if (mobileMenu) {
                    if (mobileMenu.style.maxHeight === '0px' || mobileMenu.style.maxHeight === '') {
                        mobileMenu.style.maxHeight = '80vh';
                        newMenuBtn.classList.add('active');
                    } else {
                        mobileMenu.style.maxHeight = '0px';
                        newMenuBtn.classList.remove('active');
                    }
                }
            });
        }
        
        // Setup dropdown toggles
        const dropdownToggles = document.querySelectorAll('.nm-dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.nm-dropdown');
                const content = dropdown.querySelector('.nm-dropdown-content');
                const icon = this.querySelector('.nm-icon');
                
                // Toggle this dropdown
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    if (icon) icon.style.transform = 'rotate(180deg)';
                } else {
                    content.style.display = 'none';
                    if (icon) icon.style.transform = 'rotate(0)';
                }
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherDropdown = otherToggle.closest('.nm-dropdown');
                        const otherContent = otherDropdown.querySelector('.nm-dropdown-content');
                        const otherIcon = otherToggle.querySelector('.nm-icon');
                        
                        otherContent.style.display = 'none';
                        if (otherIcon) otherIcon.style.transform = 'rotate(0)';
                    }
                });
            });
        });
        
        // Setup expandable cards
        const expandables = document.querySelectorAll('.nm-expandable');
        expandables.forEach(expandable => {
            expandable.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const content = this.querySelector('.nm-expandable-content');
                const icon = this.querySelector('.nm-expand-icon');
                
                // Toggle content visibility
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    if (icon) icon.style.transform = 'rotate(90deg)';
                } else {
                    content.style.display = 'none';
                    if (icon) icon.style.transform = 'rotate(0)';
                }
            });
        });
    }
    
    // Call the function to create our new menu
    createNewMobileMenu();
});