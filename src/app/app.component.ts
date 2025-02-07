import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import {
  PoDialogService,
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { ProAppConfigService } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuItemSelected: string = 'Home';

  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: (menu: PoMenuItem) => {
        this.printMenuAction(menu);
        this.router.navigate(['/']);
      },
      icon: 'an an-house-line',
      shortLabel: 'Home',
    },
    {
      label: 'Exemplo',
      action: (menu: PoMenuItem) => {
        this.printMenuAction(menu);
        this.router.navigate(['/exemplo']);
      },
      icon: 'an an-user',
      shortLabel: 'TESTE',
    },
    {
      label: 'Fechar',
      action: this.closeApp.bind(this),
      icon: 'an an-x',
      shortLabel: 'Fechar',
    },
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private router: Router,
    private podialogService: PoDialogService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        if (currentRoute === '/exemplo') {
          const menu = this.menus.find((item) => item.label === 'Exemplo');
          if (menu) {
            this.printMenuAction(menu);
          }
        }
      }
    });
  }

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  closeApp() {
    if (this.proAppConfigService.insideProtheus())
      this.podialogService.confirm({
        title: 'Fechar aplicação',
        message: 'Deseja realmente fechar a aplicação?',
        confirm: () => {
          this.proAppConfigService.callAppClose(true);
        },
      });
    else
      this.podialogService.alert({
        title: 'Fechar aplicação',
        message: 'Não é possível fechar a aplicação fora do Protheus.',
      });
  }
}
