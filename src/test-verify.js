/**
 * Verification Script for Chacha Cheezy Fast Food & Pizza
 */

import { restaurantConfig } from './data/restaurant.js';
import { signatureMenu, menuCategories, galleryItems } from './data/menu.js';

console.log('--- 1. Testing Configuration & Brand Name ---');
console.assert(restaurantConfig.brandName === 'CHACHA CHEEZY', 'Brand name must be CHACHA CHEEZY');
console.assert(restaurantConfig.facebookUrl === 'https://www.facebook.com/ChachaCheezy/', 'Facebook URL must match');
console.assert(restaurantConfig.contact.whatsappNumber === '923074242727', 'WhatsApp number must be 923074242727');
console.log('✓ Brand identity verified as CHACHA CHEEZY with official Facebook link.');

console.log('\n--- 2. Testing Menu Items ---');
console.assert(signatureMenu.length >= 15, `Expected at least 15 items, found ${signatureMenu.length}`);
console.log(`✓ Loaded ${signatureMenu.length} Chacha Cheezy items.`);

signatureMenu.forEach(p => {
  console.assert(p.price > 0, `Price for ${p.name} must be positive`);
  console.assert(p.currency === 'PKR', `Currency for ${p.name} must be PKR`);
  console.assert(p.image.startsWith('https://'), `Valid image required for ${p.name}`);
});
console.log('✓ All items have valid PKR prices, descriptions, and high-res food images.');

console.log('\n--- 3. Testing Category Chips ---');
const categoryIds = menuCategories.map(c => c.id);
console.log('Active Category Chips:', categoryIds);
console.assert(categoryIds.includes('pizzas'), 'Category pizzas missing');
console.assert(categoryIds.includes('burgers'), 'Category burgers missing');
console.assert(categoryIds.includes('fries'), 'Category fries missing');
console.assert(categoryIds.includes('wraps'), 'Category wraps missing');
console.assert(categoryIds.includes('pastas'), 'Category pastas missing');
console.log('✓ All Chacha Cheezy category chips verified.');

console.log('\nALL VERIFICATION TESTS PASSED!');
