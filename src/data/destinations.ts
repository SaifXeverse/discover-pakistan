import { Destination, Hotel } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'hunza',
    name: 'Hunza Valley',
    category: 'northern',
    tagline: 'The Shangri-La of the Karakoram Range',
    description: 'Surrounded by majestic peaks like Rakaposhi, Hunza is famous for its ancient forts, crystal glacier lakes, and incredible elder longevity.',
    longDescription: 'Tucked deep in Gilgit-Baltistan, the Hunza Valley is a spectacular mountain basin lying at an altitude of 2,438 meters. For centuries, it has inspired poets and explorers. With terraces of golden apricots, towering glaciers, and standard-bearers of historical Central Asian trade like Baltit Fort, Hunza is Pakistan\'s ultimate crown jewel. The hospitable locals, clear turquoise Hunza River, and legendary views of Rakaposhi, Ultar Sar, and Ladyfinger peak make it a world-class luxury escape.',
    imageUrl: 'https://i.pinimg.com/736x/6e/c5/fc/6ec5fc93e821f4866ecbf795d93a333d.jpg',
    coordinates: { x: 62, y: 15 }, // Northern-most top center-east
    mapCoords: 'Gilgit-Baltistan',
    weather: {
      temp: 18,
      condition: 'Sunny & Crisp',
      humidity: 35,
      wind: '12 km/h NW',
      forecast: [
        { day: 'Mon', temp: 18, condition: 'Sunny' },
        { day: 'Tue', temp: 19, condition: 'Clear' },
        { day: 'Wed', temp: 16, condition: 'Partly Cloudy' },
        { day: 'Thu', temp: 15, condition: 'Light Breezy' },
        { day: 'Fri', temp: 18, condition: 'Sunny' }
      ]
    },
    attractions: ['Baltit Fort', 'Altit Fort', 'Karimabad Bazaar', 'Attabad Lake', 'Eagle\'s Nest', 'Hussaini Suspension Bridge'],
    travelTips: [
      'Pack warm layers, even in summer the nights get cold.',
      'Rent a local 4x4 jeep to explore off-road trails.',
      'Spend sunset at Eagle\'s Nest for a panoramic 360-degree view of Golden Peak and Rakaposhi.'
    ],
    bestTime: 'May to October'
  },
  {
    id: 'skardu',
    name: 'Skardu Capital',
    category: 'northern',
    tagline: 'Gateway to the Giants of Karakoram',
    description: 'A paradise of desert sands against massive stone ridges, Skardu provides entry to K2 and houses spectacular blue lakes.',
    longDescription: 'Skardu is the primary tourism and mountaineering hub of Gilgit-Baltistan, positioned elegantly at the confluence of the Indus and Shigar Rivers. It boasts some of the most striking topographies on Earth: from the high-altitude, cold sands of Katpana Desert to the deeply serene Shangrila Lake (Lower Kachura) and the ancient Kharpocho Fort standing guard over the town. Skardu acts as the launching pad for expeditions to K2, Broad Peak, and Gasherbrum.',
    imageUrl: 'https://i.pinimg.com/736x/84/40/21/8440214411b4d55ff3ff6e5e6afc820b.jpg',
    coordinates: { x: 70, y: 20 }, // North-East
    mapCoords: 'Baltistan',
    weather: {
      temp: 21,
      condition: 'Clear Sky',
      humidity: 30,
      wind: '10 km/h E',
      forecast: [
        { day: 'Mon', temp: 21, condition: 'Clear' },
        { day: 'Tue', temp: 22, condition: 'Clear' },
        { day: 'Wed', temp: 20, condition: 'Cloudy' },
        { day: 'Thu', temp: 19, condition: 'Windy' },
        { day: 'Fri', temp: 22, condition: 'Clear' }
      ]
    },
    attractions: ['Shangrila Lake', 'Katpana Cold Desert', 'Sheosar Lake (Deosai)', 'Kharpocho Fort', 'Satpara Lake'],
    travelTips: [
      'Deosai Plains are best visited in late summer when wildflowers are in full bloom.',
      'Acclimatize properly as Skardu is at 2,230m altitude.',
      'Purchase locally crafted woolen shawls and dry apricots.'
    ],
    bestTime: 'June to September'
  },
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows',
    category: 'northern',
    tagline: 'In the Shadow of the Killer Mountain',
    description: 'A stellar alpine meadow resting directly below the sheer 8,126-meter face of Nanga Parbat, the ninth-highest peak.',
    longDescription: 'Fairy Meadows is a magical green grazing grassland bordered by a mesmerizing pine forest, named by German climbers as "Märchenwiese". Located at the base of Nanga Parbat (the ninth tallest mountain in the world), it offers one of the most breathtaking up-close views of active glaciers and glacier-ice walls in the world. The journey is an adventure in itself: a thrilling jeep ride along the Indus River Gorge, followed by a scenic trek up ancient hiking pathways.',
    imageUrl: 'https://i.pinimg.com/1200x/06/23/50/062350c88473334c815561a92658db79.jpg',
    coordinates: { x: 55, y: 22 }, // North Central
    mapCoords: 'Diamer District, GB',
    weather: {
      temp: 12,
      condition: 'Chilly & Clear',
      humidity: 40,
      wind: '18 km/h S',
      forecast: [
        { day: 'Mon', temp: 12, condition: 'Clear' },
        { day: 'Tue', temp: 13, condition: 'Clear' },
        { day: 'Wed', temp: 10, condition: 'Rain/Snow Mix' },
        { day: 'Thu', temp: 8, condition: 'Chilly/Overcast' },
        { day: 'Fri', temp: 11, condition: 'Sunny & Cold' }
      ]
    },
    attractions: ['Nanga Parbat Base Camp', 'Reflection Lake', 'Beyal Camp', 'Indus River Gorge Trek'],
    travelTips: [
      'The jeep track from Raikot Bridge is highly adventurous—hire only licensed local jeeps.',
      'Stay in traditional wooden cottages to enjoy hot local dishes around cozy fires.',
      'Wake up before dawn to see Nanga Parbat turn glowing gold in the first sunlight.'
    ],
    bestTime: 'May to September'
  },
  {
    id: 'lahore-fort',
    name: 'Mughal Heartland (Lahore Fort & Badshahi)',
    category: 'historical',
    tagline: 'The Soul of Ancient Mughal Architecture',
    description: 'A striking complex of historical forts, intricate mosaic halls, and the iconic pink sandstone Badshahi Mosque.',
    longDescription: 'Lahore Fort (Shahi Qila) and the neighboring Badshahi Mosque form the historical core of Pakistan\'s cultural capital, Lahore. Rebuilt under Emperor Akbar in 1566 and enhanced by successive emperors, the Fort contains spectacular sights like the Sheesh Mahal (Palace of Mirrors), embellished with thousands of tiny Persian pieces of glass. Across the courtyard stands Badshahi Mosque, built under Aurangzeb in 1673, capable of holding over 100,000 worshippers, defined by massive onion domes and pristine red sandstone facades.',
    imageUrl: 'https://eagleeye.com.pk/pttl/wp-content/uploads/2016/03/Badshahi-Mosque.jpg',
    coordinates: { x: 50, y: 48 }, // Center-East
    mapCoords: 'Lahore, Punjab',
    weather: {
      temp: 34,
      condition: 'Sunny & Warm',
      humidity: 55,
      wind: '8 km/h S',
      forecast: [
        { day: 'Mon', temp: 34, condition: 'Sunny' },
        { day: 'Tue', temp: 35, condition: 'Hot' },
        { day: 'Wed', temp: 33, condition: 'Overcast' },
        { day: 'Thu', temp: 31, condition: 'Thunderstorm' },
        { day: 'Fri', temp: 33, condition: 'Humid/Clear' }
      ]
    },
    attractions: ['Sheesh Mahal (Palace of Mirrors)', 'Badshahi Mosque', 'Shalimar Gardens', 'Wazir Khan Mosque', 'Lahore Museum'],
    travelTips: [
      'Visit in the late afternoon to catch gorgeous golden hour photography of the stone structures.',
      'Explore the adjacent Walled City of Lahore with local rickshaws.',
      'Try the legendary aromatic local foods on Fort Road Food Street at night.'
    ],
    bestTime: 'October to March'
  },
  {
    id: 'clifton-beach',
    name: 'Clifton & Hawke\'s Bay Beach',
    category: 'beach',
    tagline: 'Sands of the Arabian Sea',
    description: 'The golden tides of Karachi, boasting majestic camel rides along the coast, coastal caves, and clear blue tides.',
    longDescription: 'Karachi\'s beaches along the Arabian Sea offer popular weekend retreats and breathtaking marine landscapes. Clifton Beach is famous for its unique silver-grey sands and bustling evening energy filled with camel rides, buggy cruises, and local street seafood. Further west, Hawke\'s Bay is a tranquil marine nesting site of Green Turtles, offering pristine blue water and beautiful private beach chalets perfect for deep oceanic views and relaxation.',
    imageUrl: 'https://i.pinimg.com/736x/61/41/a3/6141a33954ad49aa475dc33c771df9f7.jpg',
    coordinates: { x: 22, y: 88 }, // Southern tip
    mapCoords: 'Karachi, Sindh',
    weather: {
      temp: 31,
      condition: 'Breezy & Warm',
      humidity: 78,
      wind: '22 km/h SW',
      forecast: [
        { day: 'Mon', temp: 31, condition: 'Breezy' },
        { day: 'Tue', temp: 31, condition: 'Humid' },
        { day: 'Wed', temp: 32, condition: 'Breezy-Cloudy' },
        { day: 'Thu', temp: 30, condition: 'Partly Sunny' },
        { day: 'Fri', temp: 31, condition: 'Warm Wind' }
      ]
    },
    attractions: ['Seaview Beach Rides', 'Turtle Nesting Walkways', 'Churna Island Snorkeling', 'Do Darya Coastal Dining'],
    travelTips: [
      'Take a camel ride along the shoreline for a timeless coastal photo.',
      'Best seafood can be eaten right on the coastal ports of Kemari.',
      'Visit Hawke\'s Bay early on weekdays to find absolute peace and clean shore sands.'
    ],
    bestTime: 'November to February'
  },
  {
    id: 'islamabad',
    name: 'Islamabad Capital (Faisal Mosque)',
    category: 'historical',
    tagline: 'The Green Serene Capital Garden City',
    description: 'Pakistan capital located at the scenic Margalla Hills foothill, famous for the majestic Faisal Mosque and clean forested avenues.',
    longDescription: 'Nestled at the base of the ancient Margalla Hills, Islamabad is one of the world\'s most carefully planned capital cities. Famous for its abundant green belts, wide avenues, and high-quality modern dining, the city\'s crown jewel is the colossal Faisal Mosque. Designed by Turkish architect Vedat Dalokay and shaped like a Bedouin tent, it stands as an architectural triumph that accommodates hundreds of thousands of serene worshippers simultaneously.',
    imageUrl: 'https://i.pinimg.com/1200x/cc/11/ea/cc11ea9eddaa3e31bc17b68326560a82.jpg',
    coordinates: { x: 42, y: 35 }, // Center-North Islamabad
    mapCoords: 'Islamabad Capital Territory',
    weather: {
      temp: 26,
      condition: 'Sunny & Pleasant',
      humidity: 45,
      wind: '12 km/h NE',
      forecast: [
        { day: 'Mon', temp: 26, condition: 'Clear font' },
        { day: 'Tue', temp: 27, condition: 'Sunny' },
        { day: 'Wed', temp: 25, condition: 'Pleasant' },
        { day: 'Thu', temp: 24, condition: 'Cloudy' },
        { day: 'Fri', temp: 26, condition: 'Sunny' }
      ]
    },
    attractions: ['Faisal Mosque', 'Daman-e-Koh Lookout', 'Margalla Hills Trail 5', 'Saidpur Heritage Village', 'Lok Virsa Museum'],
    travelTips: [
      'Hike up Margalla Trail 5 in the early morning for fresh pine air and gorgeous views of the entire valley.',
      'Take memorable pictures of Faisal Mosque at dusk when the white marble shines under orange horizons.',
      'Visit Saidpur Village for local, cozy traditional claypot dinners.'
    ],
    bestTime: 'October to April'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Serena Altit Fort Heritage Lodge',
    destinationId: 'hunza',
    location: 'Karimabad, Hunza Valley',
    rating: 4.9,
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    features: ['Mountain Views', 'Traditional Gardens', 'Organic Cuisine', 'Heritage Tours']
  },
  {
    id: 'h2',
    name: 'Luxus Grand Hunza Resort',
    destinationId: 'hunza',
    location: 'Attabad Lake, Hunza',
    rating: 4.8,
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    features: ['Lakefront Suites', 'Heated Pool', 'Infinity Balconies', 'Water Sports']
  },
  {
    id: 'h3',
    name: 'Shangrila Resort Skardu',
    destinationId: 'skardu',
    location: 'Kachura Lake, Skardu',
    rating: 4.7,
    price: 160,
    imageUrl: 'https://i.pinimg.com/1200x/79/2a/18/792a18f58e12b996240d1843b4d04aba.jpg',
    features: ['Lake Views', 'Chinese Pagoda Villas', 'Private Boating', 'Orchard Walks']
  },
  {
    id: 'h4',
    name: 'Fairy Meadows Cottage Resort',
    destinationId: 'fairy-meadows',
    location: 'Fairy Meadows Highland',
    rating: 4.6,
    price: 90,
    imageUrl: 'https://i.pinimg.com/736x/51/30/de/5130de4c8c0ec10f7bb9fb26434afc7f.jpg',
    features: ['Pine Cottages', 'Bonfire Pit', 'Direct Nanga Parbat View', 'Guided Treks']
  },
  {
    id: 'h5',
    name: 'Avari Lahore Hotel',
    destinationId: 'lahore-fort',
    location: 'Mall Road, Lahore',
    rating: 4.8,
    price: 140,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    features: ['Luxury Spa', 'Award-Winning Dining', 'Swimming Pool', 'Airport Shuttle']
  },
  {
    id: 'h6',
    name: 'Ramada Plaza by Wyndham Marine',
    destinationId: 'clifton-beach',
    location: 'DHA Phase 8, Karachi',
    rating: 4.7,
    price: 130,
    imageUrl: 'https://i.pinimg.com/1200x/06/bf/df/06bfdf95a3a8d6682e200103e6193922.jpg',
    features: ['Ocean Front', 'Rooftop Bar', 'Spa and Gym', 'Seafood Buffets']
  }
];

export const STATISTICS = [
  { id: 'peaks', value: '5', label: '8,000m+ Mountain Peaks', subtext: 'Including K2 & Nanga Parbat' },
  { id: 'glaciers', value: '7,200+', label: 'Glaciers', subtext: 'Most outside polar regions' },
  { id: 'culture', value: '6,000+', label: 'Years of History', subtext: 'Indus Valley Civilizations' },
  { id: 'parks', value: '26', label: 'National Parks', subtext: 'Protected wildlife sanctuaries' }
];
