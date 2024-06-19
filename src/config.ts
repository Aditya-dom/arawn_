import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: "Arawn's Blog",
  subtitle: 'My Personal website',
  lang: 'en',
  themeHue: 250,
  banner: {
    enable: true,
    src: 'assets/images/demo-banner.png',
  },
  favicon: [
    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/Aditya-dom',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/demo-avatar.jpeg',
  name: 'Arawn',
  bio: 'We live by the code & was raised by ethics.',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/Aditya-dom',
    },
    {
      name: 'Twitter',
      icon: 'fa6-brands:twitter',
      url: 'https://twitter.com/Aditya_dom10',
    },
    {
      name: 'Spotify',
      icon: 'fa6-brands:spotify',
      url: 'https://open.spotify.com/user/cmp0d8tkqc62rbkmktv4nk65e?si=3168cc1a57604be5',
    },
    {
      name: 'LinkedIn',
      icon: 'fa6-brands:linkedin',
      url: 'https://www.linkedin.com/in/adi-dom/',
    },
    {
      name: 'RSS',
      icon: 'fa6-solid:rss',
      url: '/rss.xml',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
