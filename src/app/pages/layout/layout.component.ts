import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/model/menus';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => {
      this.menus = data;
    })
  }

}
