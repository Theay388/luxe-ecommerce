require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');

const seed = async () => {
  await connectDB();
  await User.deleteMany();
  await Product.deleteMany();

  await new User({ name: 'Admin', email: 'admin@luxe.com', password: 'admin123', role: 'admin' }).save();
  await new User({ name: 'Sarah Jones', email: 'sarah@example.com', password: 'user1234' }).save();

  const products = [
    // Women
    {
      name: 'Tailored Cashmere Overcoat', slug: 'tailored-cashmere-overcoat',
      description: 'A perfectly tailored overcoat crafted from the finest Mongolian cashmere. An investment piece that transcends seasons.',
      price: 895, comparePrice: 1200, category: 'Women', subcategory: 'Outerwear',
      sizes: ['XS','S','M','L','XL'], colors: ['Camel','Black','Ivory'], stock: 20,
      isFeatured: true, isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Silk Midi Dress', slug: 'silk-midi-dress',
      description: 'Fluid silk midi dress with a relaxed silhouette. Effortlessly elegant for day or evening.',
      price: 380, category: 'Women', subcategory: 'Dresses',
      sizes: ['XS','S','M','L'], colors: ['Ivory','Navy','Blush'], stock: 15,
      isFeatured: true, isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Cashmere Turtleneck', slug: 'cashmere-turtleneck',
      description: 'Lightweight yet incredibly warm, this cashmere turtleneck is the cornerstone of a luxury wardrobe.',
      price: 320, category: 'Women', subcategory: 'Knitwear',
      sizes: ['XS','S','M','L','XL'], colors: ['Camel','Charcoal','Ivory'], stock: 30,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Wide-Leg Trousers', slug: 'wide-leg-trousers',
      description: 'High-waisted wide-leg trousers cut from Italian wool crepe. Timeless and versatile.',
      price: 245, category: 'Women', subcategory: 'Trousers',
      sizes: ['XS','S','M','L','XL'], colors: ['Black','Camel','Navy'], stock: 25,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Structured Blazer', slug: 'structured-blazer',
      description: 'Single-breasted blazer with a sharp, structured silhouette. A power piece for any occasion.',
      price: 520, category: 'Women', subcategory: 'Outerwear',
      sizes: ['XS','S','M','L','XL'], colors: ['Charcoal','Ivory','Navy'], stock: 18,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Merino Wool Cardigan', slug: 'merino-cardigan',
      description: 'A fine-gauge merino wool cardigan with elegant mother-of-pearl buttons.',
      price: 195, category: 'Women', subcategory: 'Knitwear',
      sizes: ['XS','S','M','L'], colors: ['Ivory','Blush','Sage'], stock: 40,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80']
    },
    // Men
    {
      name: 'Slim-Fit Wool Suit', slug: 'slim-fit-wool-suit',
      description: 'A finely tailored suit in Italian wool. The pinnacle of menswear craftsmanship.',
      price: 895, category: 'Men', subcategory: 'Suits & Blazers',
      sizes: ['36','38','40','42','44'], colors: ['Charcoal','Navy','Black'], stock: 12,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Cashmere Rollneck', slug: 'cashmere-rollneck',
      description: 'A luxuriously soft rollneck knit from two-ply cashmere. Effortless and refined.',
      price: 450, category: 'Men', subcategory: 'Knitwear',
      sizes: ['S','M','L','XL','XXL'], colors: ['Camel','Charcoal','Ivory'], stock: 22,
      isFeatured: true, isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Tailored Trench Coat', slug: 'tailored-trench-coat',
      description: 'An iconic double-breasted trench coat in weather-resistant gabardine.',
      price: 1200, comparePrice: 1500, category: 'Men', subcategory: 'Outerwear',
      sizes: ['S','M','L','XL'], colors: ['Camel','Black','Navy'], stock: 10,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Linen Dress Shirt', slug: 'linen-dress-shirt',
      description: 'Crisp linen shirt with a classic spread collar. Perfect for warm weather elegance.',
      price: 180, category: 'Men', subcategory: 'Shirts',
      sizes: ['S','M','L','XL','XXL'], colors: ['Ivory','Blue','White'], stock: 35,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80']
    },
    // Accessories
    {
      name: 'Leather Crossbody Bag', slug: 'leather-crossbody-bag',
      description: 'Hand-stitched full-grain leather crossbody bag. Develops a rich patina with age.',
      price: 650, category: 'Accessories', subcategory: 'Bags',
      sizes: ['One Size'], colors: ['Camel','Black','Cognac'], stock: 15,
      isFeatured: true, isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80']
    },
    {
      name: 'Cashmere Scarf', slug: 'cashmere-scarf',
      description: 'A lightweight cashmere scarf woven in Scotland. The perfect finishing touch.',
      price: 145, category: 'Accessories', subcategory: 'Scarves',
      sizes: ['One Size'], colors: ['Camel','Charcoal','Ivory','Navy'], stock: 50,
      isNewArrival: true,
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80']
    },
  ];

  await Product.insertMany(products);
  console.log('✅ Seeded: 2 users, 12 products');
  process.exit(0);
};

seed().catch(err => { console.error('Seed failed:', err.message); process.exit(1); });
