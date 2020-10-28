import { HeroInterface } from '../heroInterface';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // @Input()
  hero: HeroInterface;
  hero$: Observable<HeroInterface>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero();
    //getHeroSafe()
  }

  // When you know for certain that a HeroDetailComponent instance will never be re-used, you can use snapshot.
  getHero(): void {

    // Get the page param.  Note, the + converts it to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // If this component can be reused (like moving from detail to detail), then use this Switchmap and it will update the value (ngInit is only called once remember..)
  // This method uses the 'Observable' param not the static one in the above method
  getHeroSafe() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(+params.get('id')))
    );
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

  goToHeroes() {
    const heroId = this.hero ? this.hero.id : null;

    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
