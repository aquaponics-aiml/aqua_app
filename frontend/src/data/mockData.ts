export const sensorData = {
  temperature: { value: 24, unit: '°C', label: 'Temperature', status: 'optimal' },
  ph: { value: 7.2, unit: 'pH', label: 'pH Level', status: 'optimal' },
  food: { value: 85, unit: '%', label: 'Food Level', status: 'good' },
};

// Mock 7-day trends for graph placeholders
export const trends = {
  temperature: [23.4, 23.8, 24.0, 24.2, 23.9, 24.1, 24.0],
  ph: [7.0, 7.1, 7.2, 7.3, 7.2, 7.2, 7.2],
  food: [100, 95, 92, 90, 88, 86, 85],
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 'aquarium-filter',
    name: 'Aquarium Filter',
    category: 'Equipment',
    price: '$49.99',
    image:
      'https://images.unsplash.com/photo-1758854486625-2ef3d73853fc?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'fish-food',
    name: 'Premium Fish Flakes',
    category: 'Food',
    price: '$12.99',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'driftwood',
    name: 'Natural Driftwood',
    category: 'Decor',
    price: '$24.99',
    image:
      'https://images.unsplash.com/photo-1630094129983-2c90e1fa129d?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'temp-sensor',
    name: 'Smart Temp Sensor',
    category: 'Sensor',
    price: '$34.99',
    image:
      'https://images.unsplash.com/photo-1583924920073-98b3ac159c09?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'ph-sensor',
    name: 'Digital pH Meter',
    category: 'Sensor',
    price: '$39.99',
    image:
      'https://images.unsplash.com/photo-1662647343354-5a03bbbd1d45?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'auto-dispenser',
    name: 'Auto Food Dispenser',
    category: 'Equipment',
    price: '$59.99',
    image:
      'https://images.unsplash.com/photo-1708191281407-7176d42c3107?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'aquarium-glass',
    name: 'Curved Glass Tank',
    category: 'Tank',
    price: '$129.99',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
  {
    id: 'led-light',
    name: 'LED Aquarium Light',
    category: 'Equipment',
    price: '$44.99',
    image:
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?crop=entropy&cs=srgb&fm=jpg&w=600&q=80',
  },
];
