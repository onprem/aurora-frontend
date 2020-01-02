const sponsors = [
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/HP_logo_630x630.png',
    name: 'HP',
    title: 'Hello from HP',
  },
  {
    img: 'https://seeklogo.com/images/S/SBI_Life_Insurance-logo-F59BE2404A-seeklogo.com.png',
    name: 'SBI life insurance',
    title: '',
  },
  {
    img: 'https://logos-download.com/wp-content/uploads/2019/01/Gitanjali_Group_Logo.png',
    name: 'Gitanjali',
    title: '',
  },
  {
    img: 'https://pngimage.net/wp-content/uploads/2018/05/central-bank-of-india-logo-png.png',
    name: 'Central Bank Of India',
    title: '',
  },
  {
    img: 'https://www.stickpng.com/assets/images/5842999aa6515b1e0ad75ae1.png',
    name: `Domino's`,
    title: '',
  },
  {
    img: 'https://www.searchpng.com/wp-content/uploads/2019/03/Swiggy-PNG-Logo-715x715.png',
    name: `Swiggy`,
    title: '',
  },
  {
    img: 'https://s3.amazonaws.com/f6s-public/media/420499_large.png',
    name: `HackSociety`,
    title: '',
  },
  {
    img:
      'data:image/png;base64,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',
    name: `Digital Ocean`,
    title: '',
  },
  {
    img: 'https://www.thecollegefever.com/assets/images/TheCollegeFever-Logo-200x200.png',
    name: `The College Fever`,
    title: '',
  },
  {
    img:
      'data:image/png;base64,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',
    name: `festPav.com`,
    title: '',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Fabhotels_Logo.png',
    name: `Fab Hotels`,
    title: '',
  },
  {
    img: 'https://seeklogo.com/images/1/94-3-my-fm-logo-F7CD48278A-seeklogo.com.png',
    name: `My FM`,
    title: '',
  },
  {
    img:
      'https://recruit-c7ff.kxcdn.com/recruit/wp-content/themes/hacker-earth/assets/images/logo/HE_logo.png',
    name: `Hackerearth`,
    title: '',
  },
  {
    img: 'https://s3.amazonaws.com/codechef_shared/sites/all/themes/abessive/logo.png',
    name: `Codechef`,
    title: '',
  },
  {
    img: 'https://cdn2.iconfinder.com/data/icons/social-icons-color/512/paytm-512.png',
    name: `Paytm`,
    title: '',
  },
  {
    img: 'https://seeklogo.com/images/B/boi-bank-of-india-logo-BEB9E7695B-seeklogo.com.png',
    name: `Bank Of India`,
    title: '',
  },
  {
    img:
      'https://secureservercdn.net/198.71.233.106/990.175.myftpupload.com/wp-content/uploads/2017/10/Idea-Logo-PNG-Vector-Free-Download.jpeg',
    name: `Idea`,
    title: '',
  },
  {
    img: 'http://pngimg.com/uploads/samsung_logo/samsung_logo_PNG14.png',
    name: `Samsung`,
    title: '',
  },
  {
    img: 'http://pngimg.com/uploads/mcdonalds/mcdonalds_PNG9.png',
    name: `McDonald's`,
    title: '',
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    name: `IBM`,
    title: '',
  },
  {
    img: 'https://pngimage.net/wp-content/uploads/2018/06/radio-mirchi-logo-png-1.png',
    name: `Radio Mirchi`,
    title: '',
  },
  {
    img: 'https://www.gyftr.com/timespoints/images/brands/logos/31350_Archies_payback_size.png',
    name: `Archies`,
    title: '',
  },
  {
    img: 'https://pngimage.net/wp-content/uploads/2018/05/aircel-png-3.png',
    name: `Aircel`,
    title: '',
  },
  {
    img: 'https://www.stickpng.com/assets/images/5ae22ce233b73fa43b1a892e.png',
    name: `Nescafe`,
    title: '',
  },
];
export default sponsors;
