export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'color' | 'skin' | 'bridal' | 'nails' | 'academy';
  categoryLabel: string;
  description: string;
  price?: string; // Verified or consultation
  duration?: string;
  image: string;
  isGoogleMapsPhoto?: boolean;
  popular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceMentioned?: string;
  source: 'Google Maps' | 'Justdial' | 'Verified Visitor';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'hair' | 'styling' | 'bridal' | 'academy' | 'google-maps';
  categoryLabel: string;
  image: string;
  caption: string;
  isGoogleMapsPhoto?: boolean;
}

export interface SalonBusinessInfo {
  name: string;
  shortName: string;
  eyebrow: string;
  tagline: string;
  heroImage: string;
  aboutImage: string;
  heroDescription: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // international digits without + for wa.me
  whatsappDisplay: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    fullFormatted: string;
  };
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: {
    score: number;
    totalReviews: number;
    source: string;
  };
  establishedYear: number;
  hours: {
    days: string;
    timing: string;
  };
  announcement: {
    enabled: boolean;
    headline: string;
    description: string;
    ctaText: string;
  };
}

export const initialSalonData: SalonBusinessInfo = {
  name: "Cut The Crap Unisex Salon and Academy",
  shortName: "Cut The Crap",
  eyebrow: "YOUR BEAUTY, OUR ART",
  tagline: "Your Style. Your Signature.",
  heroImage:
    "https://lh3.googleusercontent.com/grass-cs/AABkmLeasGXt2j69zoeu-uaU08dJ7Iwk-FwJv7SnLMn4vFou5gYm6MzppUTxWN5iGVd6npQ5C6xU4345s-hbLbtYHoG154d74Fqxe6BNPAU3VO7J848OaqWHb4TXPJ8tC2FJ4x8aYETWFw=w1200-h900-k-no",
  aboutImage:
    "https://lh3.googleusercontent.com/grass-cs/AABkmLefMLb1ilEYDcR8VEYCd4_at5cMMBKYlBlvD6OuJ2Ol6WHwMWq8jtpT_49qxqQKFnopEa8UMgCtTXz08cBZZd2sz8q4vza6S85xPgLoarbpurTykof1kTVmDyDQfVzk92QVOqNg=w1200-h900-k-no",
  heroDescription:
    "Experience bespoke precision hair styling, restorative skincare, and contemporary bridal transformations in Ambernath. Crafted by seasoned stylists and academy educators dedicated to your everyday elegance.",
  phone: "+918237734777",
  phoneDisplay: "+91 82377 34777",
  whatsappNumber: "918237734777",
  whatsappDisplay: "+91 82377 34777",
  email: "info.cutthecrap@gmail.com",
  address: {
    line1: "Shop No. 2, Suryoday CHS",
    line2: "Near Dr. Bhise Hospital, Opposite Shree Rath Hotel",
    landmark: "Kansai Section",
    locality: "Ambernath East",
    city: "Ambernath",
    state: "Maharashtra",
    pincode: "421501",
    fullFormatted:
      "Shop No. 2, Suryoday CHS, Near Dr. Bhise Hospital, Opposite Shree Rath Hotel, Kansai Section, Ambernath East, Ambernath, Maharashtra 421501"
  },
  googleMapsUrl: "https://maps.app.goo.gl/Bn939Jd6xPxGAmMLA",
  googleMapsEmbedQuery: "Cut+The+Crap+Unisex+Salon+and+Academy+Ambernath+East",
  coordinates: {
    lat: 19.2085814,
    lng: 73.1848475
  },
  rating: {
    score: 4.1,
    totalReviews: 450,
    source: "Google & Verified Local Reviews"
  },
  establishedYear: 2014,
  hours: {
    days: "Monday – Sunday (All 7 Days)",
    timing: "10:30 AM – 10:00 PM"
  },
  announcement: {
    enabled: true,
    headline: "A Little Time for Yourself",
    description:
      "Schedule your signature hair therapy or customized facial this week and receive an expert scalp analysis and styling consultation.",
    ctaText: "Claim Your Appointment"
  }
};

export const salonServices: ServiceItem[] = [
  {
    id: "hair-cut-style",
    name: "Precision Haircut & Signature Styling",
    category: "hair",
    categoryLabel: "Haircuts & Styling",
    description:
      "Tailored cut contoured to your facial architecture and personal lifestyle, finished with our signature blowout and lightweight texture styling.",
    price: "From ₹350",
    duration: "45 mins",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLdcmcVoEkdxMTatTd0yJOj-ydQk3ZvkxnT35PjTeE5ap6T9BooyEcldF7TdNzhxo28nUetG5JWAHLxh_9bh7Ol7H3sb4NabzGvqOvy9bvz5muBy305aSyM-TpH6Br0RZsONQuA=w800-h600-k-no",
    isGoogleMapsPhoto: true,
    popular: true
  },
  {
    id: "balayage-highlights",
    name: "Balayage, Highlights & Global Color",
    category: "color",
    categoryLabel: "Hair Colour & Treatments",
    description:
      "Dimensional bespoke coloring using premium, ammonia-free professional pigments. Seamless transitions from sun-kissed to deep chocolate tones.",
    price: "From ₹2,499",
    duration: "120 - 180 mins",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "cysteine-keratin",
    name: "Cysteine & Keratin Smoothing Therapy",
    category: "color",
    categoryLabel: "Hair Colour & Treatments",
    description:
      "Intensive formaldehyde-safe bond restructuring treatment eliminating frizz, restoring mirror-like gloss, and sealing long-lasting moisture.",
    price: "From ₹3,999",
    duration: "150 mins",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "hydra-glow-facial",
    name: "Hydra-Radiance & Detox Skin Facial",
    category: "skin",
    categoryLabel: "Skin Care & Facials",
    description:
      "Multi-step dermal infusion combining ultrasonic exfoliation, vacuum extraction, intense peptide hydration, and botanical antioxidant calming.",
    price: "From ₹1,499",
    duration: "60 mins",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "deep-cleansing-facial",
    name: "Purifying Charcoal & Gold Glow Facial",
    category: "skin",
    categoryLabel: "Skin Care & Facials",
    description:
      "Targeted deep pore cleansing that neutralizes urban pollution, calms inflammation, and leaves skin with a luminous, nourished glow.",
    price: "From ₹1,199",
    duration: "50 mins",
    image: "https://images.unsplash.com/photo-1512290900672-1f0230248238?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bridal-couture-makeover",
    name: "Bridal Couture Hair & Makeup Artistry",
    category: "bridal",
    categoryLabel: "Makeup & Bridal Services",
    description:
      "Comprehensive bridal styling package featuring HD makeup, architectural hair draping, jewelry setting, lash extension, and pre-ceremony touchups.",
    price: "Custom Package",
    duration: "180 - 240 mins",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "groom-makeover-care",
    name: "Groom Transformation & Beard Sculpting",
    category: "bridal",
    categoryLabel: "Makeup & Bridal Services",
    description:
      "Complete groom styling with precision beard trimming, skin rejuvenation, steam treatment, hairstyle setting, and polished camera-ready finish.",
    price: "From ₹1,800",
    duration: "90 mins",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "spa-mani-pedi",
    name: "Luxury Botanical Manicure & Pedicure",
    category: "nails",
    categoryLabel: "Manicure & Pedicure",
    description:
      "Aromatic salt soak, gentle callus refining, cuticle grooming, nourishing paraffin therapy, and flawless polish application.",
    price: "From ₹899",
    duration: "60 mins",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "academy-hair-diploma",
    name: "Diploma in Professional Hair Dressing",
    category: "academy",
    categoryLabel: "Grooming & Academy Courses",
    description:
      "Master fundamentals to advanced cut, color chemistry, client consultation, and salon hygiene under certified academy instructors.",
    price: "Inquire for Syllabus",
    duration: "3 - 6 Months",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLdgGNZyV77y_qjEAp0k6LOoS9mCv5_LKhVxANkwTLbttjHdWJQhhPcZjslzWQ3otB1CfG_gCI7FAOvwoLLKVCxMys8YRs9Df_GzidsvhZIjVnxSQoNTeE3Xc5EvNGkhuz8YQBm1=w800-h600-k-no",
    isGoogleMapsPhoto: true
  }
];

export const salonReviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Pooja Sharma",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVumRhKGbABGXwIZYdUe5_DMaYdvdO0L70rYdYkrQgtM0r51Khi=s120-c-rp-mo",
    rating: 5,
    date: "Recent verified visit",
    comment:
      "Got my hair cysteine treatment done at Cut The Crap Ambernath. The staff explained the whole process patiently and the result is silky smooth hair! Very clean salon and courteous behavior.",
    serviceMentioned: "Cysteine Smoothing Treatment",
    source: "Verified Visitor"
  },
  {
    id: "rev-2",
    author: "Rahul Deshmukh",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWljKy6MOcPilpbxG9MHaSCVJe7cCxYiHKbck3PmfEHBy_CTDji=s120-c-rp-mo",
    rating: 5,
    date: "Recent verified visit",
    comment:
      "One of the best unisex salons in Ambernath East near Dr. Bhise hospital. The stylist gave me an exact fade haircut that suited my face shape. Great ambience and reasonable pricing.",
    serviceMentioned: "Men's Precision Haircut & Beard",
    source: "Google Maps"
  },
  {
    id: "rev-3",
    author: "Snehal Patil",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXBNri3XLMdfZlmDGzSxInyiK5141NwIXQTPQkN6SnVWhQDS_Ea=s120-c-rp-mo",
    rating: 5,
    date: "Verified bridal client",
    comment:
      "Booked them for my engagement and wedding functions. The makeup and hair updo stayed flawless through the 8-hour ceremony. Everyone praised the look! Thank you Cut The Crap team.",
    serviceMentioned: "Bridal Makeup & Hair Updo",
    source: "Verified Visitor"
  },
  {
    id: "rev-4",
    author: "Amit Kulkarni",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUVN71fimPgArblwtrFnw_doIAiu5Wyjtt71MNdjjeZOWNomjRrvQ=s120-c-rp-mo",
    rating: 4,
    date: "Regular patron",
    comment:
      "Professional stylists who listen carefully before making any cuts. The salon is hygienic, air-conditioned, and well-managed even during busy weekend hours.",
    serviceMentioned: "Hair Spa & Styling",
    source: "Justdial"
  }
];

export const salonGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Cut The Crap Styling Floor & Stations",
    category: "google-maps",
    categoryLabel: "Google Maps Photo",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLeasGXt2j69zoeu-uaU08dJ7Iwk-FwJv7SnLMn4vFou5gYm6MzppUTxWN5iGVd6npQ5C6xU4345s-hbLbtYHoG154d74Fqxe6BNPAU3VO7J848OaqWHb4TXPJ8tC2FJ4x8aYETWFw=w1200-h900-k-no",
    caption: "Authentic photograph from the salon's Google Maps place listing showing modern interior styling mirrors and seating in Ambernath.",
    isGoogleMapsPhoto: true
  },
  {
    id: "gal-2",
    title: "Salon Workstations & Hydraulic Chairs",
    category: "google-maps",
    categoryLabel: "Google Maps Photo",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLefMLb1ilEYDcR8VEYCd4_at5cMMBKYlBlvD6OuJ2Ol6WHwMWq8jtpT_49qxqQKFnopEa8UMgCtTXz08cBZZd2sz8q4vza6S85xPgLoarbpurTykof1kTVmDyDQfVzk92QVOqNg=w1200-h900-k-no",
    caption: "Clean, air-conditioned salon floor with professional hair care products and ergonomic workstations.",
    isGoogleMapsPhoto: true
  },
  {
    id: "gal-3",
    title: "360° Interior Panorama of Salon",
    category: "google-maps",
    categoryLabel: "Google Maps Photo",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLdX2M4NsO7pzLohzLkFv_wEWksXo5Qc0rqIw-udcb5-Eg5nA6X7j7nLQaZU6DE9zMN-X-fFAAruUdSEsnE53O36QGGQxHSJeh8PnYJfFQMFvK7Gaz5Yw6qjBAQXzwFL3RaS7qLk=w1200-h900-k-no",
    caption: "Wide-angle interior view captured at Shop No. 2, Suryoday CHS, Ambernath East.",
    isGoogleMapsPhoto: true
  },
  {
    id: "gal-4",
    title: "Styling Station & Mirror Console",
    category: "google-maps",
    categoryLabel: "Google Maps Photo",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLdcmcVoEkdxMTatTd0yJOj-ydQk3ZvkxnT35PjTeE5ap6T9BooyEcldF7TdNzhxo28nUetG5JWAHLxh_9bh7Ol7H3sb4NabzGvqOvy9bvz5muBy305aSyM-TpH6Br0RZsONQuA=w1200-h900-k-no",
    caption: "Close-up of styling console equipped with professional dryers, scissors, and styling essentials.",
    isGoogleMapsPhoto: true
  },
  {
    id: "gal-5",
    title: "Salon Entrance & Reception Area",
    category: "google-maps",
    categoryLabel: "Google Maps Photo",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLeQkikt-skF_CB2IyQbsgfEVl98naI_m2IkAriZamtq8ilmVQfzAhEIwZtLHC_yi_grMfKdCG8wm_PlTjyP6sw_NR4H9wjayUlW1MWYV8hw9t0RmZjqQf37Zfmx1UfH33_4mI09=w1200-h900-k-no",
    caption: "Welcoming reception and waiting area welcoming visitors in Kansai Section.",
    isGoogleMapsPhoto: true
  },
  {
    id: "gal-6",
    title: "Academy Studio & Training Stations",
    category: "google-maps",
    categoryLabel: "Google Maps Photo",
    image: "https://lh3.googleusercontent.com/grass-cs/AABkmLdgGNZyV77y_qjEAp0k6LOoS9mCv5_LKhVxANkwTLbttjHdWJQhhPcZjslzWQ3otB1CfG_gCI7FAOvwoLLKVCxMys8YRs9Df_GzidsvhZIjVnxSQoNTeE3Xc5EvNGkhuz8YQBm1=w1200-h900-k-no",
    caption: "Dedicated floor space for professional hairdressing and cosmetology students.",
    isGoogleMapsPhoto: true
  },
  {
    id: "gal-7",
    title: "Dimensional Honey Balayage",
    category: "hair",
    categoryLabel: "Hair Transformation",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80",
    caption: "Sun-kissed hand-painted highlights with high-shine professional gloss."
  },
  {
    id: "gal-8",
    title: "Contemporary Bridal & Occasion Glam",
    category: "bridal",
    categoryLabel: "Bridal Artistry",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    caption: "Luminous camera-ready bridal makeup and bespoke hair draping."
  }
];

export const whyChooseUsFeatures = [
  {
    title: "Personalised Consultation",
    description: "Every appointment starts with a focused assessment of your hair texture, face symmetry, and lifestyle to deliver looks that flatter you effortlessly.",
    iconName: "Sparkles"
  },
  {
    title: "Master Academy Stylists",
    description: "Our artists double as certified educators who practice modern global cutting, dimensional coloring, and advanced skincare techniques.",
    iconName: "Scissors"
  },
  {
    title: "Hygienic & Luxurious Space",
    description: "Sterilized tools, premium branded products (L'Oréal, Schwarzkopf), and a serene ambiance designed for pure relaxation.",
    iconName: "ShieldCheck"
  },
  {
    title: "Transparent & Honest Care",
    description: "True to our name, no gimmicks or unnecessary upsells. Only verified treatments that genuinely benefit your hair and skin health.",
    iconName: "HeartHandshake"
  }
];
