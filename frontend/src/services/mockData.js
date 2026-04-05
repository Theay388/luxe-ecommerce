export const mockProducts = [
  // Women
  {
    _id: '1',
    name: 'Tailored Cashmere Overcoat',
    slug: 'tailored-cashmere-overcoat',
    description: 'A perfectly tailored overcoat crafted from the finest Mongolian cashmere. An investment piece that transcends seasons.',
    price: 895,
    comparePrice: 1200,
    category: 'Women',
    subcategory: 'Outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Ivory'],
    stock: 20,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    numReviews: 24,
    images: ['https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '2',
    name: 'Silk Midi Dress',
    slug: 'silk-midi-dress',
    description: 'Fluid silk midi dress with a relaxed silhouette. Effortlessly elegant for day or evening.',
    price: 380,
    category: 'Women',
    subcategory: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Navy', 'Blush'],
    stock: 15,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.6,
    numReviews: 18,
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '3',
    name: 'Cashmere Turtleneck',
    slug: 'cashmere-turtleneck',
    description: 'Lightweight yet incredibly warm, this cashmere turtleneck is the cornerstone of a luxury wardrobe.',
    price: 320,
    category: 'Women',
    subcategory: 'Knitwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Ivory'],
    stock: 30,
    isFeatured: true,
    rating: 4.9,
    numReviews: 42,
    images: ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '4',
    name: 'Wide-Leg Trousers',
    slug: 'wide-leg-trousers',
    description: 'High-waisted wide-leg trousers cut from Italian wool crepe. Timeless and versatile.',
    price: 245,
    category: 'Women',
    subcategory: 'Trousers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Camel', 'Navy'],
    stock: 25,
    isNewArrival: true,
    rating: 4.5,
    numReviews: 12,
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80']
  },
  // Men
  {
    _id: '5',
    name: 'Slim-Fit Wool Suit',
    slug: 'slim-fit-wool-suit',
    description: 'A finely tailored suit in Italian wool. The pinnacle of menswear craftsmanship.',
    price: 895,
    category: 'Men',
    subcategory: 'Suits & Blazers',
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Charcoal', 'Navy', 'Black'],
    stock: 12,
    isFeatured: true,
    rating: 4.7,
    numReviews: 31,
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '6',
    name: 'Cashmere Rollneck',
    slug: 'cashmere-rollneck',
    description: 'A luxuriously soft rollneck knit from two-ply cashmere. Effortless and refined.',
    price: 450,
    category: 'Men',
    subcategory: 'Knitwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Camel', 'Charcoal', 'Ivory'],
    stock: 22,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    numReviews: 28,
    images: ['https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '7',
    name: 'Tailored Trench Coat',
    slug: 'tailored-trench-coat',
    description: 'An iconic double-breasted trench coat in weather-resistant gabardine.',
    price: 1200,
    comparePrice: 1500,
    category: 'Men',
    subcategory: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Navy'],
    stock: 10,
    isFeatured: true,
    rating: 4.9,
    numReviews: 19,
    images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80']
  },
  // Kids
  {
    _id: '8',
    name: 'Cotton Knit Sweater',
    slug: 'cotton-knit-sweater',
    description: 'Soft organic cotton knit sweater for everyday comfort. Perfect for play and special occasions.',
    price: 65,
    category: 'Kids',
    subcategory: 'Tops',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Navy', 'Cream', 'Rose'],
    stock: 30,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.6,
    numReviews: 15,
    images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '9',
    name: 'Denim Jacket',
    slug: 'kids-denim-jacket',
    description: 'Classic denim jacket with soft cotton lining. Built to last through countless adventures.',
    price: 85,
    category: 'Kids',
    subcategory: 'Outerwear',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Blue', 'Black'],
    stock: 20,
    isNewArrival: true,
    rating: 4.4,
    numReviews: 8,
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '10',
    name: 'Floral Dress',
    slug: 'kids-floral-dress',
    description: 'Delicate floral print dress with ruffled details. Perfect for parties and everyday elegance.',
    price: 55,
    category: 'Kids',
    subcategory: 'Dresses',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Pink', 'Lavender', 'Mint'],
    stock: 25,
    isFeatured: true,
    rating: 4.7,
    numReviews: 22,
    images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80']
  },
  // Babies
  {
    _id: '11',
    name: 'Organic Romper',
    slug: 'organic-romper',
    description: 'Ultra-soft organic cotton romper with snap buttons. Gentle on delicate skin.',
    price: 35,
    category: 'Babies',
    subcategory: 'Onesies',
    sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
    colors: ['White', 'Sage', 'Blush'],
    stock: 40,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    numReviews: 56,
    images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '12',
    name: 'Knit Booties',
    slug: 'knit-booties',
    description: 'Handcrafted knit booties to keep tiny feet warm and cozy.',
    price: 25,
    category: 'Babies',
    subcategory: 'Accessories',
    sizes: ['0-6M', '6-12M'],
    colors: ['Cream', 'Dusty Rose', 'Mustard'],
    stock: 50,
    isNewArrival: true,
    rating: 4.8,
    numReviews: 34,
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '13',
    name: 'Hooded Towel',
    slug: 'hooded-towel',
    description: 'Plush hooded towel made from organic cotton. Perfect for bath time cuddles.',
    price: 45,
    category: 'Babies',
    subcategory: 'Accessories',
    sizes: ['One Size'],
    colors: ['White', 'Sage', 'Sky Blue'],
    stock: 35,
    isFeatured: true,
    rating: 4.7,
    numReviews: 19,
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80']
  },
  // Accessories
  {
    _id: '14',
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'Hand-stitched full-grain leather crossbody bag. Develops a rich patina with age.',
    price: 650,
    category: 'Accessories',
    subcategory: 'Bags',
    sizes: ['One Size'],
    colors: ['Camel', 'Black', 'Cognac'],
    stock: 15,
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    numReviews: 47,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '15',
    name: 'Cashmere Scarf',
    slug: 'cashmere-scarf',
    description: 'A lightweight cashmere scarf woven in Scotland. The perfect finishing touch.',
    price: 145,
    category: 'Accessories',
    subcategory: 'Scarves',
    sizes: ['One Size'],
    colors: ['Camel', 'Charcoal', 'Ivory', 'Navy'],
    stock: 50,
    isNewArrival: true,
    rating: 4.6,
    numReviews: 38,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80']
  },
  {
    _id: '16',
    name: 'Structured Blazer',
    slug: 'structured-blazer',
    description: 'Single-breasted blazer with a sharp, structured silhouette. A power piece for any occasion.',
    price: 520,
    category: 'Women',
    subcategory: 'Outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Ivory', 'Navy'],
    stock: 18,
    isFeatured: true,
    rating: 4.7,
    numReviews: 26,
    images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80']
  }
];

export const mockUsers = [
  {
    _id: 'user1',
    name: 'Sarah Jones',
    email: 'sarah@example.com',
    role: 'user'
  },
  {
    _id: 'admin1',
    name: 'Admin',
    email: 'admin@stylenest.com',
    role: 'admin'
  }
];

export const mockOrders = [
  {
    _id: 'order1',
    items: [
      { product: '1', name: 'Tailored Cashmere Overcoat', image: mockProducts[0].images[0], price: 895, size: 'S', color: 'Camel', qty: 1 }
    ],
    totalPrice: 985.49,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    user: mockUsers[0]
  }
];

class MockApi {
  async get(url) {
    await this.simulateDelay();
    
    if (url.includes('/products/featured')) {
      return { data: mockProducts.filter(p => p.isFeatured) };
    }
    if (url.includes('/products/new-arrivals')) {
      return { data: mockProducts.filter(p => p.isNewArrival) };
    }
    if (url.includes('/products') && url.match(/\/products\/[a-f0-9]+$/)) {
      const id = url.split('/').pop();
      const product = mockProducts.find(p => p._id === id);
      if (!product) throw { response: { status: 404, data: { message: 'Product not found' } } };
      return { data: product };
    }
    if (url.includes('/products')) {
      const params = new URLSearchParams(url.split('?')[1] || '');
      let filtered = [...mockProducts];
      
      const category = params.get('category');
      if (category) filtered = filtered.filter(p => p.category === category);
      
      const search = params.get('search');
      if (search) filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
      
      const sort = params.get('sort');
      if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
      if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      
      const page = parseInt(params.get('page')) || 1;
      const limit = parseInt(params.get('limit')) || 12;
      const total = filtered.length;
      const pages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      filtered = filtered.slice(start, start + limit);
      
      return { data: { products: filtered, total, pages } };
    }
    if (url.includes('/orders/mine')) {
      return { data: mockOrders };
    }
    if (url.includes('/orders/stats')) {
      return { data: { revenue: 15840, orders: 24, products: mockProducts.length, users: 2 } };
    }
    if (url.includes('/orders')) {
      return { data: mockOrders };
    }
    if (url.includes('/users')) {
      return { data: mockUsers };
    }
    
    return { data: {} };
  }

  async post(url, data) {
    await this.simulateDelay();
    
    if (url.includes('/auth/login')) {
      const user = mockUsers.find(u => u.email === data.email);
      if (!user || data.password !== 'admin123' && data.password !== 'user1234') {
        throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
      }
      return { data: { ...user, token: 'mock_jwt_token_' + Date.now() } };
    }
    
    if (url.includes('/auth/register')) {
      const newUser = { _id: 'user_' + Date.now(), name: data.name, email: data.email, role: 'user' };
      return { data: { ...newUser, token: 'mock_jwt_token_' + Date.now() } };
    }
    
    if (url.includes('/users/profile')) {
      return { data: { ...mockUsers[0], ...data } };
    }
    
    if (url.includes('/users/wishlist')) {
      return { data: { message: 'Wishlist updated' } };
    }
    
    if (url.includes('/orders')) {
      const newOrder = {
        _id: 'order_' + Date.now(),
        items: data.items,
        totalPrice: data.totalPrice,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      return { data: newOrder };
    }
    
    return { data: { success: true } };
  }

  async put(url, data) {
    await this.simulateDelay();
    return { data: { success: true } };
  }

  async delete(url) {
    await this.simulateDelay();
    return { data: { success: true } };
  }

  simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export default MockApi;
