import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard/images/public',
    icon: 'icon-speedometer',
  },

  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Images',
    url: '/images',
    icon: 'icon-picture',
    children: [

      {
        name: "Upload",
        url: '/dashboard/images/upload',
        icon: 'icon-picture'
      },
      {
        name: 'Private',
        url: '/dashboard/images/private',
        icon: 'icon-picture'
      },
      {
        name: 'Public',
        url: '/dashboard/images/public',
        icon: 'icon-picture'
      },

    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Logout',
    url: ''
  },

];
