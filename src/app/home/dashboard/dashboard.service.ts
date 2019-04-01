import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Meta } from '@angular/platform-browser';
interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string;     // Used as display text for item and title for separator type
  state?: string;    // Router state
  icon?: string;    // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean;  // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string;     // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
}
interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}



@Injectable()

export class DashBoardService {
  menuTransparent: boolean;
  /*   hideTransparent: boolean; */
  iconMenu: IMenuItem[] = [
    {
      name: 'BOOKING',
      type: 'dashboard',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
    },
    {
      name: 'BOOKING STATUS',
      type: 'link',
      tooltip: 'SMS',
      icon: 'message',
      state: 'cruds/ngx-table'
    }
  ];
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor(private meta: Meta) { }
  makeMenuTransparent() {
    this.menuTransparent = true;
  }

  hideMenuTransparent() {
    this.menuTransparent = false;
  }
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
    }
  }
  generateTags(config) {
    // default values
    config = {
      title: 'welcome',
      description: 'welcome',
      url: 'https://rinteger.com/',
      image: 'https://rinteger.com/assets/icons/icon-384x384.png',
      ...config
    };
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
  }

}
