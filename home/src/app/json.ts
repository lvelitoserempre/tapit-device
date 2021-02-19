export default [{
  title: 'Home Page - 2020', content: [{
    type: 'welcome_message',
    data: {
      messageAuthenticated: {
        value: '<h6>Hola {{user.firstName}}, hoy tienes <span style="color:#ffffff;"><span style="background-color:#d35400;">{{user.points}}</span></span></h6>\r\n\r\n<p>¿Cómo vas a usarlos hoy?</p>\r\n',
        format: 'rich_text',
        processed: '<h6>Hola {{user.firstName}}, hoy tienes <span style="color:#ffffff;"><span style="background-color:#d35400;">{{user.points}}</span></span></h6>\n<p>¿Cómo vas a usarlos hoy?</p>\n'
      },
      messageAnonymous: {
        value: '<div class="md:flex md:flex-row md:justify-between md:items-center">\r\n<h6 class="font-bold text-sm md:text-lg"><strong>Acumula puntos y reclama productos, <span style="color:#d35400;">¡Es muy fácil!</span></strong></h6>\r\n</div>\r\n',
        format: 'rich_text',
        processed: '<div class="md:flex md:flex-row md:justify-between md:items-center">\n<h6 class="font-bold text-sm md:text-lg"><strong>Acumula puntos y reclama productos, <span style="color:#d35400;">¡Es muy fácil!</span></strong></h6>\n</div>\n'
      }
    },
    messageAuthenticated: '<h6>Hola {{user.firstName}}, hoy tienes <span style="color:#ffffff;"><span style="background-color:#d35400;">{{user.points}}</span></span></h6>\r\n\r\n<p>¿Cómo vas a usarlos hoy?</p>\r\n',
    messageAnonymous: '<div class="md:flex md:flex-row md:justify-between md:items-center">\r\n<h6 class="font-bold text-sm md:text-lg"><strong>Acumula puntos y reclama productos, <span style="color:#d35400;">¡Es muy fácil!</span></strong></h6>\r\n</div>\r\n'
  }, {
    type: 'seasonal_section',
    data: {
      seasonalCampaigns: [{
        type: 'points_section',
        data: {
          copy: {value: '<p>Slide 2 - discover</p>\r\n', format: 'rich_text', processed: '<p>Slide 2 - discover</p>\n'},
          imageDesktop: {
            target_id: '126',
            alt: '',
            title: '',
            width: '1024',
            height: '576',
            image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__0.png?itok=4lhS-0kW'
          },
          imageMobile: {
            target_id: '131',
            alt: '',
            title: '',
            width: '560',
            height: '560',
            image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-mobile_3.png?itok=kKU02xMV'
          },
          cta: {uri: 'https://google.com/games', title: 'Play Store Games', options: []}
        },
        image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__0.png?itok=4lhS-0kW',
        description: '<p>Slide 2 - discover</p>\r\n',
        button: {link: 'https://google.com/games', label: 'Play Store Games'}
      }, {
        type: 'points_section',
        data: {
          copy: {value: '<p>Discover - Slide 2</p>\r\n', format: 'rich_text', processed: '<p>Discover - Slide 2</p>\n'},
          imageDesktop: {
            target_id: '161',
            alt: '',
            title: '',
            width: '1024',
            height: '576',
            image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__4.png?itok=QntyPsb4'
          },
          imageMobile: {
            target_id: '156',
            alt: '',
            title: '',
            width: '560',
            height: '560',
            image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-mobile_4.png?itok=P88KqHV9'
          },
          cta: {uri: 'https://google.com/tapit', title: 'Search Tap It', options: []}
        },
        image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__4.png?itok=QntyPsb4',
        description: '<p>Discover - Slide 2</p>\r\n',
        button: {link: 'https://google.com/tapit', label: 'Search Tap It'}
      }]
    },
    slides: [{
      type: 'points_section',
      data: {
        copy: {value: '<p>Slide 2 - discover</p>\r\n', format: 'rich_text', processed: '<p>Slide 2 - discover</p>\n'},
        imageDesktop: {
          target_id: '126',
          alt: '',
          title: '',
          width: '1024',
          height: '576',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__0.png?itok=4lhS-0kW'
        },
        imageMobile: {
          target_id: '131',
          alt: '',
          title: '',
          width: '560',
          height: '560',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-mobile_3.png?itok=kKU02xMV'
        },
        cta: {uri: 'https://google.com/games', title: 'Play Store Games', options: []}
      },
      image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__0.png?itok=4lhS-0kW',
      description: '<p>Slide 2 - discover</p>\r\n',
      button: {link: 'https://google.com/games', label: 'Play Store Games'}
    }, {
      type: 'points_section',
      data: {
        copy: {value: '<p>Discover - Slide 2</p>\r\n', format: 'rich_text', processed: '<p>Discover - Slide 2</p>\n'},
        imageDesktop: {
          target_id: '161',
          alt: '',
          title: '',
          width: '1024',
          height: '576',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__4.png?itok=QntyPsb4'
        },
        imageMobile: {
          target_id: '156',
          alt: '',
          title: '',
          width: '560',
          height: '560',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-mobile_4.png?itok=P88KqHV9'
        },
        cta: {uri: 'https://google.com/tapit', title: 'Search Tap It', options: []}
      },
      image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/discover-home__4.png?itok=QntyPsb4',
      description: '<p>Discover - Slide 2</p>\r\n',
      button: {link: 'https://google.com/tapit', label: 'Search Tap It'}
    }]
  }, {
    type: 'catalog',
    data: {
      title: {
        value: '<p>Market <span style="color:#ff5005;">Tap it</span></p>\r\n',
        format: 'rich_text',
        processed: '<p>Market <span style="color:#ff5005;">Tap it</span></p>\n'
      },
      description: {
        value: '<p>Todas nuestras marcas te hacen <span style="color:#ff5005;">ganar puntos</span><strong>,</strong> elige la que mas te guste:</p>\r\n',
        format: 'rich_text',
        processed: '<p>Todas nuestras marcas te hacen <span style="color:#ff5005;">ganar puntos</span><strong>,</strong> elige la que mas te guste:</p>\n'
      },
      cta: {uri: 'https://market.tapit.com.co', title: 'Ver todo el market', options: []},
      products: [
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        },
        {
          type: 'product',
          data: {
            imageDesktop: {
              target_id: '31',
              alt: '',
              title: '',
              width: '372',
              height: '800',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
            }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
          },
          image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
          link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
        }
      ]
    },
    title: '<p>El catálogo <span style="color:#ff5005;">Tap it</span></p>\r\n',
    description: '<p>Todas nuestras marcas te hacen <span style="color:#ff5005;">ganar puntos</span><strong>,</strong> elige la que mas te guste:</p>\r\n',
    slides: [{
      type: 'product',
      data: {
        imageDesktop: {
          target_id: '31',
          alt: '',
          title: '',
          width: '372',
          height: '800',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/2020-12/Aguila-Light.png'
        }, buyLink: {uri: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p', title: '', options: []}
      },
      image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/aguila.png?itok=46KOh9ox',
      link: 'https://market.tapit.com.co/cerveza--aguila--original355x6/p'
    }, {
      type: 'product',
      data: {
        imageDesktop: {
          target_id: '36',
          alt: '',
          title: '',
          width: '424',
          height: '1600',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/budweiser.png?itok=YgEsXD9U'
        }, buyLink: {uri: 'https://market.tapit.com.co/#1', title: '', options: []}
      },
      image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/budweiser.png?itok=YgEsXD9U',
      link: 'https://market.tapit.com.co/#1'
    }, {
      type: 'product',
      data: {
        imageDesktop: {
          target_id: '106',
          alt: '',
          title: '',
          width: '424',
          height: '1600',
          image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana.png?itok=Xb-Gmxks'
        }
      },
      image: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana.png?itok=Xb-Gmxks'
    }]
  }, {
    type: 'earn_points_section',
    data: {
      title: {
        value: '<p>¿Quieres ganar <span style="color:#d35400;">puntos</span>?</p>\r\n',
        format: 'rich_text',
        processed: '<p>¿Quieres ganar <span style="color:#d35400;">puntos</span>?</p>\n'
      },
      description: {
        value: '<p>Es tan fácil como tomarse una cerveza bien helada.</p>\r\n',
        format: 'rich_text',
        processed: '<p>Es tan fácil como tomarse una cerveza bien helada.</p>\n'
      },
      imageDesktop: {
        target_id: '51',
        alt: '',
        title: '',
        width: '1024',
        height: '576',
        image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/BANNER-GANAR-PUNTOS-desktop2_0.png?itok=n3fZMXm2'
      },
      imageMobile: {
        target_id: '46',
        alt: '',
        title: '',
        width: '660',
        height: '660',
        image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/earn-points-card-mobile2.png?itok=LEMz_739'
      },
      cta: {uri: 'https://market.tapit.com.co/#1', title: 'Ir a ganar puntos', options: []}
    }
  }, {
    type: 'recommended_section', data: {
      title: {
        value: '<p>Nuestros <span style="color:#ff5005;">recomendados</span></p>\r\n',
        format: 'rich_text',
        processed: '<p>Nuestros <span style="color:#ff5005;">recomendados</span></p>\n'
      },
      recommendedContent: [
        {
          type: 'recommended_content',
          data: {
            title: {
              value: '<p><span style="color:#ff5005;">Cerveza Poker</span></p>\r\n',
              format: 'rich_text',
              processed: '<p>Introducida por Adolphus Busch en 1876, aún se elabora con el mismo cuidado, alta calidad y estándares exigentes. Comenzó como una cerveza original de Estados Unidos, hoy es una marca global, se bebe en 85 países.</p>\n'
            },
            description: {
              value: '<p>Introducida por Adolphus Busch en 1876, aún se elabora con el mismo cuidado, alta calidad y estándares exigentes. Comenzó como una cerveza original de Estados Unidos, hoy es una marca global, se bebe en 85 países.</p>\r\n',
              format: 'rich_text',
              processed: '<p>Introducida por Adolphus Busch en 1876, aún se elabora con el mismo cuidado, alta calidad y estándares exigentes. Comenzó como una cerveza original de Estados Unidos, hoy es una marca global, se bebe en 85 países.</p>\n'
            },
            imageDesktop: {
              target_id: '56',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/budweiser_0.png?itok=cQm54KLM'
            },
            imageMobile: {
              target_id: '61',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/budweiser_1.png?itok=HXVS_tyA'
            },
            cta: {uri: 'https://market.tapit.com', title: 'Comprar', options: []}
          }
        }, {
          type: 'recommended_content',
          data: {
            description: {
              value: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\r\n',
              format: 'rich_text',
              processed: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\n'
            },
            imageDesktop: {
              target_id: '76',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_1.png?itok=alq6BA85'
            },
            imageMobile: {
              target_id: '71',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_0.png?itok=kHpIWL15'
            },
            cta: {uri: 'https://market.tapit.com', title: 'Comprar', options: []}
          }
        }, {
          type: 'recommended_content',
          data: {
            description: {
              value: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\r\n',
              format: 'rich_text',
              processed: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\n'
            },
            imageDesktop: {
              target_id: '76',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_1.png?itok=alq6BA85'
            },
            imageMobile: {
              target_id: '71',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_0.png?itok=kHpIWL15'
            },
            cta: {uri: 'https://market.tapit.com', title: 'Comprar', options: []}
          }
        }, {
          type: 'recommended_content',
          data: {
            description: {
              value: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\r\n',
              format: 'rich_text',
              processed: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\n'
            },
            imageDesktop: {
              target_id: '76',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_1.png?itok=alq6BA85'
            },
            imageMobile: {
              target_id: '71',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_0.png?itok=kHpIWL15'
            },
            cta: {uri: 'https://market.tapit.com', title: 'Comprar', options: []}
          }
        }, {
          type: 'recommended_content', data: {
            description: {
              value: '<p>Introducida por Adolphus Busch en 1876, aún se elabora con el mismo cuidado, alta calidad y estándares exigentes. Comenzó como una cerveza original de Estados Unidos, hoy es una marca global, se bebe en 85 países.</p>\r\n',
              format: 'rich_text',
              processed: '<p>Introducida por Adolphus Busch en 1876, aún se elabora con el mismo cuidado, alta calidad y estándares exigentes. Comenzó como una cerveza original de Estados Unidos, hoy es una marca global, se bebe en 85 países.</p>\n'
            },
            imageDesktop: {
              target_id: '56',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/budweiser_0.png?itok=cQm54KLM'
            },
            imageMobile: {
              target_id: '61',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/budweiser_1.png?itok=HXVS_tyA'
            },
            cta: {uri: 'https://market.tapit.com', title: 'Comprar', options: []}
          }
        }, {
          type: 'recommended_content',
          data: {
            description: {
              value: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\r\n',
              format: 'rich_text',
              processed: '<p>La primera cerveza colombiana estimulada con música en vivo dentro de su planta de producción durante el proceso de fermentación y maduración de la cerveza</p>\n'
            },
            imageDesktop: {
              target_id: '76',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_1.png?itok=alq6BA85'
            },
            imageMobile: {
              target_id: '71',
              alt: '',
              title: '',
              width: '424',
              height: '1600',
              image_url: 'http://tapit.dev-abinbev.acsitefactory.com/sites/g/files/wnfebl166/files/styles/large/public/2020-12/costen%CC%83a_bacana_0.png?itok=kHpIWL15'
            },
            cta: {uri: 'https://market.tapit.com', title: 'Comprar', options: []}
          }
        }
      ]
    }
  }]
}];
