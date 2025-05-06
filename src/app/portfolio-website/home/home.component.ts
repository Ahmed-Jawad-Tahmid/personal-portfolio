import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { SkillsComponent } from "../skills/skills.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NavbarComponent, FooterComponent, SkillsComponent]
})
export class HomeComponent {

    constructor(public router : Router) {

    }

    onHome() {
        this.router.navigate(['./portfolio-website/home'])
    }
}
