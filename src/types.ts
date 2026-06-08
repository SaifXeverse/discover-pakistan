export interface Destination {
  id: string;
  name: string;
  category: 'northern' | 'historical' | 'beach';
  tagline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  coordinates: { x: number; y: number }; // Percentage coordinate for our SVG Map
  mapCoords: string; // Detail display helper
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    wind: string;
    forecast: { day: string; temp: number; condition: string }[];
  };
  attractions: string[];
  travelTips: string[];
  bestTime: string;
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  location: string;
  rating: number;
  price: number; // in USD or PKR
  imageUrl: string;
  features: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
    costEstimate?: string;
  }[];
  tips?: string;
}

export interface ItineraryResponse {
  destination: string;
  duration: number;
  budgetStyle: string;
  activitiesStyle: string;
  days: ItineraryDay[];
  accommodationSuggestion: string;
  packingMustHaves: string[];
}
