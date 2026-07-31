export const INITIAL_USERS = [
  // BUSINESS OWNERS
  {
    id: 'b1',
    role: 'business',
    name: 'Artisan Roast Cafe',
    ownerName: 'Elena Rostova',
    email: 'elena@artisanroast.com',
    phone: '+1 (555) 234-5678',
    state: 'California',
    city: 'San Francisco',
    category: 'Cafe & Restaurant',
    description: 'Specialty organic coffee house and artisanal bakery situated in downtown SF. Known for eco-friendly sourcing and vibrant aesthetic atmosphere.',
    instagram: 'https://instagram.com/artisanroast_sf',
    website: 'https://artisanroast.com',
    location: '452 Market St, San Francisco, CA 94105',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    rating: 4.9,
    reviewsCount: 28,
    completionScore: 95,
  },
  {
    id: 'b2',
    role: 'business',
    name: 'PulseFit Wear',
    ownerName: 'Marcus Vance',
    email: 'marcus@pulsefit.io',
    phone: '+1 (555) 876-5432',
    state: 'New York',
    city: 'New York',
    category: 'Fashion & Fitness',
    description: 'High-performance athleisure & eco-conscious activewear engineered for urban athletes and wellness creators.',
    instagram: 'https://instagram.com/pulsefitwear',
    website: 'https://pulsefitwear.io',
    location: '720 5th Ave, New York, NY 10019',
    logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    rating: 4.8,
    reviewsCount: 42,
    completionScore: 90,
  },
  {
    id: 'b3',
    role: 'business',
    name: 'Luminary Tech Solutions',
    ownerName: 'Sophia Lin',
    email: 'sophia@luminarytech.app',
    phone: '+1 (555) 345-6789',
    state: 'Texas',
    city: 'Austin',
    category: 'Technology & Startups',
    description: 'AI-driven productivity tools for creators and digital nomads. Launching next-gen smart scheduling app.',
    instagram: 'https://instagram.com/luminaryapp',
    website: 'https://luminarytech.app',
    location: '100 Congress Ave, Austin, TX 78701',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    rating: 5.0,
    reviewsCount: 15,
    completionScore: 100,
  },

  // INFLUENCERS
  {
    id: 'i1',
    role: 'influencer',
    name: 'Maya Lin',
    username: '@mayacreates',
    email: 'maya@mayalin.com',
    phone: '+1 (555) 901-2345',
    age: 24,
    gender: 'Female',
    state: 'California',
    city: 'San Francisco',
    languages: ['English', 'Mandarin'],
    category: 'Food & Lifestyle',
    instagram: 'https://instagram.com/mayacreates',
    youtube: 'https://youtube.com/mayalinvlogs',
    twitter: 'https://x.com/mayacreates',
    linkedin: 'https://linkedin.com/in/mayalin',
    followersCount: 85000,
    avgReach: 32000,
    engagementRate: 5.4,
    bio: 'SF Lifestyle & Culinary Content Creator. Lover of matcha lattes, hidden brunch gems, and aesthetic travel vlogs.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    rating: 4.95,
    reviewsCount: 34,
    completionScore: 100,
    portfolio: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'i2',
    role: 'influencer',
    name: 'Devon Carter',
    username: '@devonfit',
    email: 'devon@devonfit.com',
    phone: '+1 (555) 432-1098',
    age: 27,
    gender: 'Male',
    state: 'New York',
    city: 'New York',
    languages: ['English', 'Spanish'],
    category: 'Fitness & Health',
    instagram: 'https://instagram.com/devonfit',
    youtube: 'https://youtube.com/devonfitlabs',
    twitter: 'https://x.com/devonfit',
    linkedin: '',
    followersCount: 142000,
    avgReach: 58000,
    engagementRate: 6.2,
    bio: 'NYC Fitness Trainer & Calisthenics Specialist. Inspiring thousands to move daily and live clean.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    rating: 4.88,
    reviewsCount: 51,
    completionScore: 90,
    portfolio: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'i3',
    role: 'influencer',
    name: 'Aria Thorne',
    username: '@ariacodes',
    email: 'aria@ariacodes.dev',
    phone: '+1 (555) 678-9012',
    age: 26,
    gender: 'Female',
    state: 'Texas',
    city: 'Austin',
    languages: ['English'],
    category: 'Tech & Gadgets',
    instagram: 'https://instagram.com/ariacodes',
    youtube: 'https://youtube.com/ariacodes',
    twitter: 'https://x.com/ariacodes',
    linkedin: 'https://linkedin.com/in/ariathorne',
    followersCount: 62000,
    avgReach: 24000,
    engagementRate: 7.1,
    bio: 'Software Engineer & Tech Creator in Austin. Sharing developer desk setups, app breakdowns, and AI tools.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    rating: 5.0,
    reviewsCount: 19,
    completionScore: 95,
    portfolio: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
    ]
  }
];

export const INITIAL_CAMPAIGNS = [
  {
    id: 'c1',
    businessId: 'b1',
    title: 'Spring Organic Brew Launch & Tasting Event',
    campaignType: 'Promotion',
    description: 'We are introducing our new cold brew line and botanical herbal teas! Looking for local food, lifestyle, and coffee enthusiasts in SF to attend an exclusive VIP tasting and publish 1 Reel + 3 IG Stories highlighting the flavors and ambience.',
    businessCategory: 'Cafe & Restaurant',
    state: 'California',
    city: 'San Francisco',
    venue: 'Artisan Roast Flagship Store',
    date: '2026-08-15',
    time: '18:00',
    duration: '2 Hours',
    isPaid: true,
    budget: 450,
    minFollowers: 10000,
    maxFollowers: 150000,
    platforms: ['Instagram', 'TikTok'],
    creatorCategory: 'Food & Lifestyle',
    deadline: '2026-08-10',
    status: 'Active',
    mode: 'Offline',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    applicantsCount: 4,
    createdAt: '2026-07-28'
  },
  {
    id: 'c2',
    businessId: 'b2',
    title: 'Summer Eco-Athleisure Brand Ambassador Program',
    campaignType: 'Collaboration',
    description: 'PulseFit Wear is selecting 3 long-term ambassadors for our quarterly sustainable activewear collection. Includes $1,200 monthly payout + unlimited gear + 10% affiliate commission for your audience.',
    businessCategory: 'Fashion & Fitness',
    state: 'New York',
    city: 'New York',
    venue: 'Hybrid / NYC Fitness Studios',
    date: '2026-08-20',
    time: '10:00',
    duration: '3 Months',
    isPaid: true,
    budget: 1200,
    minFollowers: 25000,
    maxFollowers: 300000,
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    creatorCategory: 'Fitness & Health',
    deadline: '2026-08-14',
    status: 'Active',
    mode: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    applicantsCount: 8,
    createdAt: '2026-07-25'
  },
  {
    id: 'c3',
    businessId: 'b3',
    title: 'Luminary AI App Promo & Desk Setup Review',
    campaignType: 'Promotion',
    description: 'Seeking tech reviewers and productivity influencers to demonstrate how Luminary AI automates content planning. 1 Dedicated YouTube Integration or 1 IG Carousel with screen recording.',
    businessCategory: 'Technology & Startups',
    state: 'Texas',
    city: 'Austin',
    venue: 'Remote / Online',
    date: '2026-08-12',
    time: '12:00',
    duration: '1 Week',
    isPaid: true,
    budget: 800,
    minFollowers: 15000,
    maxFollowers: 200000,
    platforms: ['YouTube', 'Instagram', 'LinkedIn', 'Twitter/X'],
    creatorCategory: 'Tech & Gadgets',
    deadline: '2026-08-08',
    status: 'Active',
    mode: 'Online',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    applicantsCount: 3,
    createdAt: '2026-07-30'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app1',
    campaignId: 'c1',
    influencerId: 'i1',
    message: 'Hey Elena! I would love to cover the Spring Organic Brew Launch. I live right in SF and my audience is obsessed with local cafe reviews and coffee spots!',
    availableDate: '2026-08-15',
    expectedPrice: 450,
    portfolioLink: 'https://instagram.com/mayacreates',
    status: 'Accepted',
    appliedAt: '2026-07-29'
  },
  {
    id: 'app2',
    campaignId: 'c2',
    influencerId: 'i2',
    message: 'Hey Marcus! PulseFit Wear aligns perfectly with my training ethos. I post daily workout reels in NYC and would love to represent your activewear collection!',
    availableDate: '2026-08-20',
    expectedPrice: 1200,
    portfolioLink: 'https://instagram.com/devonfit',
    status: 'Pending',
    appliedAt: '2026-07-26'
  },
  {
    id: 'app3',
    campaignId: 'c3',
    influencerId: 'i3',
    message: 'Hi Sophia! As a dev and tech reviewer in Austin, Luminary AI looks like a gamechanger. I can record a 4K desk setup video demoing the AI features.',
    availableDate: '2026-08-12',
    expectedPrice: 800,
    portfolioLink: 'https://youtube.com/ariacodes',
    status: 'Pending',
    appliedAt: '2026-07-31'
  }
];

export const INITIAL_DEALS = [
  {
    id: 'd1',
    campaignId: 'c1',
    businessId: 'b1',
    influencerId: 'i1',
    finalPrice: 450,
    deliverables: '1 Instagram Reel showcasing cafe ambience & coffee + 3 Stories with link sticker.',
    deadline: '2026-08-18',
    terms: 'High quality 1080p video, tag @artisanroast_sf, content must stay on grid for at least 90 days.',
    paymentMethod: 'Online',
    status: 'Active',
    paymentStatus: 'Processing',
    offlineBusinessPaid: false,
    offlineInfluencerReceived: false,
    qrCodeToken: 'SL-QR-SPRING-BREW-001',
    createdAt: '2026-07-30'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'm1',
    senderId: 'b1',
    receiverId: 'i1',
    text: 'Hi Maya! We saw your profile and we loved your recent reel on SF specialty coffee shops. We accepted your application for the Spring Organic Brew Launch!',
    timestamp: '2026-07-30T10:15:00Z',
    isSeen: true
  },
  {
    id: 'm2',
    senderId: 'i1',
    receiverId: 'b1',
    text: 'Thank you so much Elena! I am so excited to visit the flagship store on Aug 15th. I have already added it to my calendar!',
    timestamp: '2026-07-30T10:20:00Z',
    isSeen: true
  },
  {
    id: 'm3',
    senderId: 'b1',
    receiverId: 'i1',
    text: 'Awesome! I generated our deal contract for $450. You can review the terms and check-in QR code directly in the deal section.',
    timestamp: '2026-07-30T10:22:00Z',
    isSeen: false
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    userId: 'i1',
    title: 'Application Accepted! 🎉',
    message: 'Artisan Roast Cafe accepted your application for Spring Organic Brew Launch.',
    timestamp: '2026-07-30T10:15:00Z',
    isRead: false,
    type: 'deal'
  },
  {
    id: 'n2',
    userId: 'b1',
    title: 'New Application Received',
    message: 'Maya Lin applied for your campaign "Spring Organic Brew Launch".',
    timestamp: '2026-07-29T14:30:00Z',
    isRead: true,
    type: 'application'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'r1',
    targetUserId: 'i1',
    authorId: 'b1',
    authorName: 'Artisan Roast Cafe',
    rating: 5,
    comment: 'Maya was incredible to work with! Punctual, professional, and her Reel drove over 40 new visitors to our store on launch day.',
    date: '2026-07-15'
  },
  {
    id: 'r2',
    targetUserId: 'b1',
    authorId: 'i1',
    authorName: 'Maya Lin',
    rating: 5,
    comment: 'Elena and the team at Artisan Roast provided clear instructions, tasty coffee, and fast payment. 10/10 collaboration experience!',
    date: '2026-07-16'
  }
];

export const LEADERBOARD_CREATORS = [
  { rank: 1, name: 'Maya Lin', username: '@mayacreates', rating: 4.95, deals: 34, earnings: '$18,400', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', category: 'Food & Lifestyle' },
  { rank: 2, name: 'Devon Carter', username: '@devonfit', rating: 4.88, deals: 51, earnings: '$32,600', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', category: 'Fitness & Health' },
  { rank: 3, name: 'Aria Thorne', username: '@ariacodes', rating: 5.00, deals: 19, earnings: '$14,200', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', category: 'Tech & Gadgets' }
];

export const LEADERBOARD_BUSINESSES = [
  { rank: 1, name: 'Luminary Tech Solutions', rating: 5.00, campaigns: 12, totalPaid: '$48,000', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300', category: 'Technology' },
  { rank: 2, name: 'Artisan Roast Cafe', rating: 4.90, campaigns: 8, totalPaid: '$14,500', logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300', category: 'Cafe & Dining' },
  { rank: 3, name: 'PulseFit Wear', rating: 4.80, campaigns: 15, totalPaid: '$36,000', logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300', category: 'Fashion & Fitness' }
];
