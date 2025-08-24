// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './oec-web-components/header/header.component';
import { FooterComponent } from './oec-web-components/footer/footer.component';
import { HomeComponent } from './oec-web-components/home/home.component';
import { OepHomeComponent } from './oep-web-components/oep-home/oep-home.component';
import { EpsHomeComponent } from './eps-web-components/eps-home/eps-home.component';
import { ForeignEmployerHomeComponent } from './foreign_employer-web-components/foreign-employer-home/foreign-employer-home.component';
import { AboutUsComponent } from './oec-web-components/about-us/about-us/about-us.component';
import { OecAtGlanceComponent } from './oec-web-components/about-us/oec-at-glance/oec-at-glance.component';
import { GoverningLawComponent } from './oec-web-components/about-us/governing-law/governing-law.component';
import { OurFunctionsComponent } from './oec-web-components/about-us/our-functions/our-functions.component';
import { BoardOfDirectorsComponent } from './oec-web-components/about-us/board-of-directors/board-of-directors.component';
import { ManagingDirectorMessageComponent } from './oec-web-components/about-us/managing-director-message/managing-director-message.component';
import { CoreValuesComponent } from './oec-web-components/about-us/core-values/core-values.component';
import { WhyChooseOecComponent } from './oec-web-components/about-us/why-choose-oec/why-choose-oec.component';
import { KeyAchievementsComponent } from './oec-web-components/about-us/key-achievements/key-achievements.component';
import { ServiceTimelinesComponent } from './oec-web-components/about-us/service-timelines/service-timelines.component';
import { OurExecutivesComponent } from './oec-web-components/about-us/our-executives/our-executives.component';
import { ForeignServiceAgreementsComponent } from './oec-web-components/emigrants/foreign-service-agreements/foreign-service-agreements.component';
import { PreDepartureTrainingComponent } from './oec-web-components/emigrants/pre-departure-training/pre-departure-training.component';
import { ProtectorProcessGuideComponent } from './oec-web-components/emigrants/protector-process-guide/protector-process-guide.component';
import { IndustriesComponent } from './oec-web-components/emigrants/industries/industries.component';
import { FeesStructureComponent } from './oec-web-components/emigrants/fees-structure/fees-structure.component';
import { SuccessStoriesComponent } from './oec-web-components/development-hub/success-stories/success-stories.component';
import { ProjectsComponent } from './oec-web-components/development-hub/projects/projects.component';
import { FutureRoadmapsComponent } from './oec-web-components/development-hub/future-roadmaps/future-roadmaps.component';
import { SignedMousComponent } from './oec-web-components/development-hub/signed-mous/signed-mous.component';
import { LatestAnnouncementsComponent } from './oec-web-components/media-center/latest-announcements/latest-announcements.component';
import { PressReleaseComponent } from './oec-web-components/media-center/press-release/press-release.component';
import { NewsHighlightsComponent } from './oec-web-components/media-center/news-highlights/news-highlights.component';
import { CareersComponent } from './oec-web-components/media-center/careers/careers.component';
import { FaqsComponent } from './oec-web-components/media-center/faqs/faqs.component';
import { DocumentDownloadsComponent } from './oec-web-components/media-center/document-downloads/document-downloads.component';
import { UsefulLinksComponent } from './oec-web-components/media-center/useful-links/useful-links.component';
import { GalleryComponent, SafePipe } from './oec-web-components/media-center/gallery/gallery.component';
import { ReportStatisticsComponent } from './oec-web-components/report-statistics/report-statistics/report-statistics.component';
import { ContactUsComponent } from './oec-web-components/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'oep', component: OepHomeComponent },
  { path: 'eps', component: EpsHomeComponent },
  { path: 'foreign-employer', component: ForeignEmployerHomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'oec-at-glance', component: OecAtGlanceComponent },
  { path: 'governing-law', component: GoverningLawComponent },
  { path: 'our-functions', component: OurFunctionsComponent },
  { path: 'board-of-directors', component: BoardOfDirectorsComponent },
  { path: 'managing-director-message', component: ManagingDirectorMessageComponent },
  { path: 'core-values', component: CoreValuesComponent },
  { path: 'why-choose-oec', component: WhyChooseOecComponent },
  { path: 'key-achievements', component: KeyAchievementsComponent },
  { path: 'service-timelines', component: ServiceTimelinesComponent },
  { path: 'our-executives', component: OurExecutivesComponent },  
  { path: 'foreign-service-agreements', component: ForeignServiceAgreementsComponent },
  { path: 'pre-departure-training', component: PreDepartureTrainingComponent },
  { path: 'protector-process-guide', component: ProtectorProcessGuideComponent },
  { path: 'industries', component: IndustriesComponent },
  { path: 'fees-structure', component: FeesStructureComponent },  
  { path: 'success-stories', component: SuccessStoriesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'future-plans', component: FutureRoadmapsComponent },
  { path: 'mous', component: SignedMousComponent },
  { path: 'latest-announcements', component: LatestAnnouncementsComponent },
  { path: 'press-release', component: PressReleaseComponent },
  { path: 'news-highlights', component: NewsHighlightsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'document-downloads', component: DocumentDownloadsComponent },
  { path: 'useful-links', component: UsefulLinksComponent },
  { path: 'report-statistics', component: ReportStatisticsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({ 
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OepHomeComponent,
    EpsHomeComponent,
    ForeignEmployerHomeComponent,
    AboutUsComponent,
    OecAtGlanceComponent,
    GoverningLawComponent,
    OurFunctionsComponent,
    BoardOfDirectorsComponent,
    ManagingDirectorMessageComponent,
    CoreValuesComponent,
    WhyChooseOecComponent,
    KeyAchievementsComponent,
    ServiceTimelinesComponent,
    OurExecutivesComponent,
    ForeignServiceAgreementsComponent,
    PreDepartureTrainingComponent,
    ProtectorProcessGuideComponent,
    IndustriesComponent,
    FeesStructureComponent,
    SuccessStoriesComponent,
    ProjectsComponent,
    FutureRoadmapsComponent,
    SignedMousComponent,
    LatestAnnouncementsComponent,
    PressReleaseComponent,
    NewsHighlightsComponent,
    CareersComponent,
    FaqsComponent,
    DocumentDownloadsComponent,
    UsefulLinksComponent,
    GalleryComponent,
    SafePipe,
    ReportStatisticsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }