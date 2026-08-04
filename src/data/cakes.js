import blackForestCake from '../assets/cakes/blackforestcake.jpg';  
import strawberryCake from '../assets/cakes/strawberryshortcake.jpg';
import vanillaCake from '../assets/cakes/vanilladreamcake.jpg';
import chocolateLavaCake from '../assets/cakes/chocolatelavacake.jpg';  

export const cakes = [
  { id: 'black-forest-cake', name: 'Black Forest Cake', price: '$8.50', src: blackForestCake, category: 'Chocolate', status: 'available', isFavourite: true },
  { id: 'strawberry-shortcake', name: 'Strawberry Cake', price: '$7.50', src: strawberryCake, category: 'Fruit', status: 'available', isFavourite: true },
  { id: 'vanilla-dream-cake', name: 'Vanilla Dream Cake', price: '$11.00', src: vanillaCake, category: 'Vanilla', status: 'sold-out', isFavourite: true },
  { id: 'chocolate-lava-cake', name: 'Chocolate Lava Cake', price: '$9.00', src: chocolateLavaCake, category: 'Chocolate', status: 'made-to-order', isFavourite: true },
]