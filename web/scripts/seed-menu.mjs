// scripts/seed-menu.mjs
// One-time script: adds the 9 "Signature picks" items to the Keystatic menu collection.
// Downloads each photo from Baitna's Drivu menu, resizes it, and writes the YAML entry.
//
// Run from your Astro project folder (the one with package.json):
//   node scripts/seed-menu.mjs

import { mkdir, writeFile, access } from 'node:fs/promises';
import sharp from 'sharp'; // already installed with Astro

const IMG = 'https://drivu.s3.eu-west-1.amazonaws.com/uploads/menu_item/image/';

const items = [
  // Drinks
  { slug: 'cloud-matcha', name: 'Cloud Matcha', category: 'drinks', order: 1,
    note: 'Coconut water topped with smooth matcha foam',
    url: `${IMG}228809/WES08359_0004_WES08466.jpg` },
  { slug: 'mango-forest', name: 'Mango Forest', category: 'drinks', order: 2,
    note: 'Our summer mango signature',
    url: `${IMG}231169/WES08359_0016_WES08446.jpg` },
  { slug: 'iced-spanish-latte', name: 'Iced Spanish Latte', category: 'drinks', order: 3,
    note: 'Sweet, creamy iced latte with a Spanish twist',
    url: `${IMG}228805/Iced_Spanish_Latte.jpg` },

  // Desserts & Pastries
  { slug: 'cheese-croissant', name: 'Cheese Croissant', category: 'desserts', order: 1,
    note: 'Warm, flaky croissant topped with melted cheese',
    url: `${IMG}228066/19.jpeg` },
  { slug: 'san-sebastian-cheesecake', name: 'San Sebastian Cheesecake', category: 'desserts', order: 2,
    note: 'Caramelised top with a creamy centre',
    url: `${IMG}228044/42.jpeg` },
  { slug: 'lotus-milk-cake', name: 'Lotus Milk Cake', category: 'desserts', order: 3,
    note: 'Creamy milk cake with rich Lotus Biscoff',
    url: `${IMG}228063/44.jpeg` },

  // Sandwiches
  { slug: 'pesto-chicken-focaccia', name: 'Pesto Chicken Focaccia', category: 'sandwiches', order: 1,
    note: 'Chicken, mozzarella & basil pesto on focaccia',
    url: `${IMG}228075/20.jpeg` },
  { slug: 'chicken-bbq-sandwich', name: 'Chicken BBQ Sandwich', category: 'sandwiches', order: 2,
    note: 'Grilled chicken with smoky BBQ sauce',
    url: `${IMG}228073/69.jpeg` },
  { slug: 'smoked-turkey-dijon', name: 'Smoked Turkey & Dijon', category: 'sandwiches', order: 3,
    note: 'Smoked turkey with Dijon mustard',
    url: `${IMG}228070/65.jpeg` },
];

const exists = (p) => access(p).then(() => true, () => false);
const q = (s) => JSON.stringify(s); // safe YAML string (handles & and quotes)

await mkdir('src/content/menu', { recursive: true });

for (const item of items) {
  const yamlPath = `src/content/menu/${item.slug}.yaml`;
  if (await exists(yamlPath)) {
    console.log(`skip  ${item.name} (already exists)`);
    continue;
  }

  // 1. Download the photo
  const res = await fetch(item.url);
  if (!res.ok) {
    console.error(`FAIL  ${item.name}: photo download returned ${res.status}`);
    continue;
  }
  const original = Buffer.from(await res.arrayBuffer());

  // 2. Resize (some originals are 9000px+) and save next to the other menu photos
  const imgDir = `src/assets/menu/${item.slug}`;
  await mkdir(imgDir, { recursive: true });
  await sharp(original)
    .rotate() // respect phone orientation
    .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${imgDir}/image.jpg`);

  // 3. Write the Keystatic entry
  const yaml = [
    `name: ${q(item.name)}`,
    `category: ${item.category}`,
    `note: ${q(item.note)}`,
    `image: ../../assets/menu/${item.slug}/image.jpg`,
    `order: ${item.order}`,
    `visible: true`,
    '',
  ].join('\n');
  await writeFile(yamlPath, yaml);

  console.log(`added ${item.name}`);
}

console.log('\nDone. Open /keystatic → Menu highlights to check them.');
