import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateX(0%)' })
        ),
      ]),
    ]),
  ],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isEmployee = false;

  public slides = [
    { src: 'Impressora.png' },
    { src: 'broken-computer.png' },
    { src: 'Mouse.png' },
    { src: 'Teclado.png' },
    { src: 'Desktop.png' },
  ];
  currentSlide = 0;
  slideIndex = 0;
  isTransitioning = false;
  autoSlideInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoSlide();
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('userRole') === 'ROLE_FUNCIONARIO') {
      this.isEmployee = true;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.onNextClick();
    }, 8000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  onPreviousClick() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    this.slideIndex--;
    this.stopAutoSlide();
    this.startAutoSlide();
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  onNextClick() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    this.slideIndex++;
    this.stopAutoSlide();
    this.startAutoSlide();
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  goLogin() {
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
    } else {
      if (this.isEmployee) {
        this.router.navigate(['funcionario']);
      } else {
        this.router.navigate(['client']);
      }
    }
  }
}
