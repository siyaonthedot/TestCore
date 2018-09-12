import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Cat }         from '../cat';
import { CatService }  from '../Cat.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: [ './cat-detail.component.css' ]
})
export class CatDetailComponent implements OnInit {
  @Input() cat: Cat;

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCat();
  }

  getCat(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.catService.getCat(id)
      .subscribe(cat => this.cat = cat);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.catService.updateCat(this.cat)
      .subscribe(() => this.goBack());
  }
}

