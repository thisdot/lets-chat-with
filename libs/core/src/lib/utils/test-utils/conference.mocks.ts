import { Conference } from '../../models';

export const conferencesMock: Conference[] = [
  {
    id: '1',
    title: 'React Conf',
    logoUrl:
      'https://do3z7e6uuakno.cloudfront.net/uploads/event/logo/1080054/fbbd4bd840cd661bcd9a696a6404388e.jpg',
    matches: 2,
    chats: 3,
    subTitle: 'A test conference about React',
    letsChatWithUrl: 'react-conf',
    qrImageUrl: 'https://test.com/img.png',
  },
  // Angular Conf
  {
    id: '2',

    subTitle: 'A conference about Angular',
    title: 'ngConf',
    logoUrl:
      'https://static.wixstatic.com/media/c4e8cf_48fd656959394709bd6c7171179397f5~mv2.png/v1/fill/w_340,h_338,al_c,q_85,usm_0.66_1.00_0.01/Asset%202.webp',
    matches: 2,
    chats: 3,
    letsChatWithUrl: 'ng-conf',
    qrImageUrl: 'https://test.com/img.png',
  },
  {
    id: '3',
    subTitle: 'A conference about Angular in Belgium',
    title: 'ngBE',
    logoUrl:
      'https://static1.squarespace.com/static/5b7b64d52714e503eebf914c/t/5b7b7dda758d462bead7e54c/1614678102951/?format=1500w',
    matches: 2,
    chats: 3,
    letsChatWithUrl: 'ngBe',
    qrImageUrl: 'https://test.com/img.png',
  },
  // Angular ATL
  {
    id: '4',
    subTitle: 'A conference about Angular in Atlanta',
    title: 'ngAtlanta',
    logoUrl:
      'https://assets.website-files.com/59f04de85aae0d0001bb95be/59f1a028ffa06300013b4d40_ngATL-logo.svg',
    matches: 2,
    chats: 3,
    letsChatWithUrl: 'ngAtlanta',
    qrImageUrl: 'https://test.com/img.png',
  },
];
