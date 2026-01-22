import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import * as L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  content: any = null;
  isLoading = true;

  // Maps
  headquartersMap: L.Map | null = null;
  travelOfficeMap: L.Map | null = null;
  regionalOfficeMaps: Map<number, L.Map> = new Map();

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadContactUsContent();
  }

  ngAfterViewInit(): void {
    // Maps will be initialized after content is loaded
  }

  loadContactUsContent(): void {
    this.apiService.getContactUs().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.content = response.data;
          // Initialize maps after content is loaded
          setTimeout(() => {
            this.initializeMaps();
          }, 500);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact us content:', error);
        this.isLoading = false;
      }
    });
  }

  initializeMaps(): void {
    // Initialize Headquarters Map
    if (this.content?.headquarters_section?.latitude && document.getElementById('hq-map')) {
      this.initializeHeadquartersMap(
        this.content.headquarters_section.latitude,
        this.content.headquarters_section.longitude
      );
    }

    // Initialize Travel Office Map
    if (this.content?.travel_office_section?.latitude && document.getElementById('travel-office-map')) {
      this.initializeTravelOfficeMap(
        this.content.travel_office_section.latitude,
        this.content.travel_office_section.longitude
      );
    }

    // Initialize Regional Office Maps
    if (this.content?.regional_offices_section?.offices) {
      this.content.regional_offices_section.offices.forEach((office: any, index: number) => {
        if (office.latitude && document.getElementById(`regional-office-map-${index}`)) {
          this.initializeRegionalOfficeMap(index, office.latitude, office.longitude, office.city);
        }
      });
    }
  }

  initializeHeadquartersMap(lat: number, lng: number): void {
    if (this.headquartersMap) {
      this.headquartersMap.remove();
    }

    this.headquartersMap = L.map('hq-map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.headquartersMap);

    const customIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker([lat, lng], { icon: customIcon })
      .addTo(this.headquartersMap)
      .bindPopup('<b>OEC Headquarters</b>')
      .openPopup();

    // Force map to recalculate its size
    setTimeout(() => {
      this.headquartersMap?.invalidateSize();
    }, 100);
  }

  initializeTravelOfficeMap(lat: number, lng: number): void {
    if (this.travelOfficeMap) {
      this.travelOfficeMap.remove();
    }

    this.travelOfficeMap = L.map('travel-office-map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.travelOfficeMap);

    const customIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker([lat, lng], { icon: customIcon })
      .addTo(this.travelOfficeMap)
      .bindPopup('<b>OEC Travel Office</b>')
      .openPopup();

    // Force map to recalculate its size
    setTimeout(() => {
      this.travelOfficeMap?.invalidateSize();
    }, 100);
  }

  initializeRegionalOfficeMap(index: number, lat: number, lng: number, cityName: string): void {
    const existingMap = this.regionalOfficeMaps.get(index);
    if (existingMap) {
      existingMap.remove();
    }

    const map = L.map(`regional-office-map-${index}`).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`<b>${cityName} Office</b>`)
      .openPopup();

    this.regionalOfficeMaps.set(index, map);

    // Force map to recalculate its size
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
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
