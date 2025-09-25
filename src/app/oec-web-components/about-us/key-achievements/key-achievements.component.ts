import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-key-achievements',
  templateUrl: './key-achievements.component.html',
  styleUrls: ['./key-achievements.component.css']
})
export class KeyAchievementsComponent {
  partnerships: any[] = [];
  digitalTransformation: any[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getPartnerships();
    this.getDigitalTransformation();
  }

  getPartnerships() {
    this.apiService.getPartnerships().subscribe((data:any) => {
      this.partnerships = data;
    });
  }

  getDigitalTransformation() {
    this.apiService.getDigitalTransformation().subscribe((data:any) => {
      this.digitalTransformation = data;
    });
  }
}
