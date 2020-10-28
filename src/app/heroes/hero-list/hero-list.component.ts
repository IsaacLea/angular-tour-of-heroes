import { MessageService } from '../../message.service';
import { HeroService } from '../hero.service';
import { HeroInterface } from '../heroInterface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map  } from 'rxjs/operators';
//import { HeapProfiler } from 'inspector';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

 // selectedHero: Hero; 
  heroes: HeroInterface[];
  heroes$: Observable<HeroInterface[]>;
  selectedId: number;
  
  constructor(
    private heroService: HeroService, 
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    

    this.getHeroes();

    //this.heroes.find(hero => hero.id == this.selectedId);
  }

  getHeroesObservable() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();
      })
    );
  }

  getHeroes(): void {

    // Set the selected hero id if it is present as a route parameter
    this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();
      })
    ).subscribe(heroes => this.heroes = heroes);

    // this.heroService.getHeroes()
    //     .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as HeroInterface)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: HeroInterface): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

}

