import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { start } from 'repl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public router : Router){

  }

  onHome(){
    this.router.navigate(['/'])
  }

  onProjects(){
    this.router.navigate(['/projects'])
  }

  onExperience(){
    this.router.navigate(['/experience'])
  }

  onContact(){
    this.router.navigate(['/contact'])
  }

  onSkills(){

    const skillContainer = document.getElementById('skills-section')

    if(skillContainer){
      skillContainer.scrollIntoView({behavior : 'smooth', block: 'center'})
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > 0) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Change to translucent
    } else {
      navbar.style.backgroundColor = 'transparent'; // Reset to transparent
    }
  }

}
