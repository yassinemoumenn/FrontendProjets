import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-index2',
  templateUrl: './index2.component.html',
  styleUrls: ['../index2/style-landing-page.scss'],
  encapsulation: ViewEncapsulation.None
})

/**
 * Index-2 component
 */
export class Index2Component implements OnInit {
  id = 'JlvxDa7Sges';

  constructor() {}
  currentSection = 'home';

  ngOnInit(): void {
    document.getElementById('theme_id')?.classList.remove('theme-red');
    document.getElementById('theme_id')?.classList.add('theme-pink');
  }
  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar: HTMLElement | null = document.getElementById('navbar');
    if (navbar)
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        navbar.style.backgroundColor = '#272a33';
        navbar.style.padding = '10px';
      } else {
        navbar.style.backgroundColor = '';
        navbar.style.padding = '20px';
      }
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('navbarCollapse')?.classList.toggle('show');
  }
}
