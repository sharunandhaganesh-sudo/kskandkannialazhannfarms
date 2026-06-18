// Static data — frontend-only, no backend.
// All image paths point to /public/animals (served from root).

export const CONTACTS = {
  cowGoat: ["7339598737"],
  dogCock: ["7339026424", "7305644912"],
  whatsappCowGoat: "917339598737",
  whatsappPrimary: "917305644912",
  whatsappGroup: "https://chat.whatsapp.com/IGLmtZYLs084kOWixKvNaS?source_surface=21",
  instagram: "https://www.instagram.com/kannialazhann?igsh=dmVnNnVnZXF1Z24w",
  youtube: "https://youtube.com/@kannialazhann?si=mh5HMe7UnDmaX2nL",
  location: "Rajapalayam, Gopalapuram - 626136, Tamil Nadu",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.6364915069435!2d77.623327!3d9.365399199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06c1391fc50537%3A0x9b13be14b39922b1!2sKSK%20FARMS!5e0!3m2!1sen!2sin!4v1781677577688!5m2!1sen!2sin",
};

export const CATEGORIES = [
  {
    slug: "cows",
    name: "Dairy Cows",
    tamil: "பால் பசுக்கள்",
    cover: "/animals/HF Cow.jpg",
    blurb:
      "Premium HF dairy stock — heavy milkers, pasture-raised, ethically maintained.",
    contact: ["7339598737"],
    whatsapp: "917339598737",
    faqs: [
      { q: "How much milk does an HF cow give?", a: "Our HF cows average 18–25 litres per day, depending on age, lactation stage, and feeding. All our cows have verified milk records." },
      { q: "What is the price of an HF cow?", a: "Pricing depends on age, lactation status, and milk yield. Contact us for current rates — we offer transparent, fair pricing." },
      { q: "Do you deliver outside Rajapalayam?", a: "Yes — we deliver across Tamil Nadu. We arrange trained handlers and transport logistics. Contact us to arrange delivery." },
      { q: "Are your cows free of disease?", a: "All our cows are health-checked and vaccinated. We maintain strict hygiene and provide veterinary documentation." },
      { q: "Can I visit the farm?", a: "Absolutely — visits by appointment. You can see the animals, verify health, and discuss breeding/feeding specifics." },
    ],
  },
  {
    slug: "goats",
    name: "Goats",
    tamil: "ஆடுகள்",
    cover: "/animals/Sembari ( pottu aadu ).jpg",
    blurb:
      "Sembari and native breeds — meat and breeding stock at ₹600/kg. Strong genetics, healthy herd.",
    contact: ["7339598737"],
    whatsapp: "917339598737",
    price: "₹600/kg",
    faqs: [
      { q: "What is the price of Sembari goat in Tamil Nadu?", a: "Our native goats are sold live-weight at ₹600/kg, including Sembari Pottu Aadu and Mayilambadi lines. Prices may vary slightly seasonally." },
      { q: "Do you deliver goats outside Rajapalayam?", a: "Yes — we regularly supply to Srivilliputhur, Sivakasi, Virudhunagar, Sattur and all of Tamil Nadu. See our Areas We Serve page." },
      { q: "Can I buy goats in bulk for a function or festival?", a: "Yes — bulk orders for weddings, festivals and functions are welcome. Contact us 2-3 weeks in advance to reserve stock." },
      { q: "Do you sell breeding pairs?", a: "Yes — we have excellent breeding-quality Sembari Pottu and Mayilambadi pairs. They carry strong genetics and proven bloodlines." },
      { q: "How are the goats transported?", a: "We use clean, well-ventilated transport and trained handlers. We ensure minimal stress and proper loading/unloading at both ends." },
    ],
  },
  {
    slug: "dogs",
    name: "Native Dogs",
    tamil: "நாட்டு நாய்கள்",
    cover: "/animals/Rajapalayam Dog.jpg",
    blurb:
      "Four legendary Tamil hound breeds — guardians, hunters, companions. Raised at the soil they were born for.",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
    faqs: [
      { q: "What breeds of native Tamil dogs do you have?", a: "We raise Rajapalayam, Kanni, Chippiparai, and Kombai — all legendary native hound breeds of Tamil Nadu with distinct hunting and guarding traits." },
      { q: "What is the price of a Rajapalayam puppy?", a: "Pricing varies by lineage, age, and purpose (pet vs. breeding). Contact us for current rates — we offer healthy, well-raised puppies." },
      { q: "Which breed is best for family guarding?", a: "Rajapalayam and Kombai are excellent for property guarding. Kanni and Chippiparai are smaller, more affectionate for family + guarding." },
      { q: "Do you provide training?", a: "We raise all puppies with early socialization. For advanced training, we can recommend trusted local trainers." },
      { q: "Can you export outside Tamil Nadu?", a: "Yes — we can arrange transport across India. Buyers are responsible for local regulations and import requirements." },
    ],
  },
  {
    slug: "poultry",
    name: "Poultry & Roosters",
    tamil: "கோழிகள் & சேவல்கள்",
    cover: "/animals/Sanda Seval.jpg",
    blurb:
      "Naatu Koli at ₹600/kg, Red Sonali, and prized Sanda Seval fighting roosters.",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
    price: "₹600/kg",
    faqs: [
      { q: "What is the price of Naatu Koli (country chicken)?", a: "Live Naatu Koli are sold at ₹600/kg. Fresh meat (cleaned) is also available — contact for details." },
      { q: "Do you sell eggs from Naatu Koli?", a: "Yes — see our Farm Eggs category. Daily collection, never refrigerated, rich yolk, ideal for cooking and breeding." },
      { q: "What is the difference between Naatu Koli and Sanda Seval?", a: "Naatu Koli is meat/egg chicken. Sanda Seval is a fighting rooster — bred for game, with championship bloodlines." },
      { q: "Can I buy Red Sonali for a small home flock?", a: "Yes — Red Sonali are perfect for backyard farming. They lay steadily and provide good meat. Contact for live bird pricing." },
      { q: "Do you deliver live birds?", a: "Yes — we deliver across Tamil Nadu with proper transport containers and expert handling to minimize stress." },
    ],
  },
  {
    slug: "eggs",
    name: "Farm Eggs",
    tamil: "முட்டைகள்",
    cover: "/animals/Naatu Koli Eggs.jpg",
    blurb:
      "Fresh country chicken eggs, daily from our free-range hens. Rich yolk, strong shell, real nutrition.",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
    faqs: [
      { q: "How fresh are your farm eggs?", a: "Collected every morning, never refrigerated for days. You get genuine same-day or next-day eggs with rich yolk." },
      { q: "What is the price of farm eggs?", a: "Current pricing available on request. Bulk orders and subscriptions get better rates." },
      { q: "Do you deliver eggs?", a: "Yes — we deliver weekly/bi-weekly orders across Rajapalayam and nearby areas. Contact for delivery schedule." },
      { q: "Are the eggs organic?", a: "Our hens are free-range, hormone-free, and raised on grain. We don't use antibiotics or artificial feeds." },
      { q: "Can I order in bulk for a restaurant or institution?", a: "Yes — bulk and wholesale orders are welcome. We offer consistent supply and competitive bulk rates." },
    ],
  },
];

export const ANIMALS = [
  // DOGS
  {
    slug: "chippiparai",
    category: "dogs",
    name: "Chippiparai",
    tamil: "சிப்பிபாறை",
    hero: "/animals/Chippiparai Dog.jpg",
    gallery: [
      "/animals/Chippiparai Dog.jpg",
      "/animals/Chippiparai Dog 2.jpg",
      "/animals/Chippiparai Puppies.jpg",
    ],
    tagline: "The royal sighthound of South Tamil Nadu.",
    description:
      "A graceful, deer-hunting sighthound bred for centuries by the royals of Chippiparai. Lean, fast, silent and fiercely loyal to one family. Known for endurance over kilometres, excellent guard instincts, and a calm indoor temperament.",
    traits: [
      { label: "Origin", value: "Chippiparai, Tamil Nadu" },
      { label: "Build", value: "Lean sighthound, 60–65cm tall" },
      { label: "Temperament", value: "Loyal, alert, one-master dog" },
      { label: "Best for", value: "Hunting, guarding, farms" },
    ],
    priceNote: "Contact for puppy & adult pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  {
    slug: "kanni",
    category: "dogs",
    name: "Kanni",
    tamil: "கன்னி",
    hero: "/animals/Kanni Dog.jpg",
    gallery: ["/animals/Kanni Dog.jpg", "/animals/Kanni Dog 2.jpg"],
    tagline: "The maiden hound — gifted to the bride.",
    description:
      "Sleek, agile, and almost mythological — Kanni were traditionally given to a bride at her wedding as a guardian. Smaller and more affectionate than Chippiparai, they bond deeply and are unmatched at chasing hare and small game.",
    traits: [
      { label: "Origin", value: "Tirunelveli region" },
      { label: "Build", value: "Slim, 56–63cm tall" },
      { label: "Temperament", value: "Affectionate, watchful, loyal" },
      { label: "Best for", value: "Family + guarding" },
    ],
    priceNote: "Contact for puppy & adult pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  {
    slug: "kombai",
    category: "dogs",
    name: "Kombai",
    tamil: "கொம்பை",
    hero: "/animals/Kombai dog.jpg",
    gallery: ["/animals/Kombai dog.jpg"],
    tagline: "The boar-hunter of the Tamil hills.",
    description:
      "Muscular, fearless and built for the wild. Kombai was historically used to hunt wild boar and bison. With a reddish-brown coat, black mask and powerful jaw, they make formidable guard dogs and are deeply protective of their territory.",
    traits: [
      { label: "Origin", value: "Kombai, Theni district" },
      { label: "Build", value: "Powerful, 50–60cm tall" },
      { label: "Temperament", value: "Fearless, territorial, fierce" },
      { label: "Best for", value: "Farm guarding, large land" },
    ],
    priceNote: "Contact for puppy & adult pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  {
    slug: "rajapalayam",
    category: "dogs",
    name: "Rajapalayam",
    tamil: "ராஜபாளையம்",
    hero: "/animals/Rajapalayam Dog.jpg",
    gallery: [
      "/animals/Rajapalayam Dog.jpg",
      "/animals/Rajapalayam puppies.jpg",
    ],
    tagline: "Pure white royalty. The pride of our hometown.",
    description:
      "Born and bred in our own town of Rajapalayam, this snow-white sighthound is on the Indian postage stamp for a reason. Tall, lean, regal, and reserved with strangers. Famous for guarding paddy fields and palaces alike.",
    traits: [
      { label: "Origin", value: "Rajapalayam (our home turf)" },
      { label: "Build", value: "Tall, 65–75cm, pure white coat" },
      { label: "Temperament", value: "Regal, reserved, loyal" },
      { label: "Best for", value: "Estate guarding, show, hunting" },
    ],
    priceNote: "Contact for puppy & adult pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  // COWS
  {
    slug: "hf-cow",
    category: "cows",
    name: "HF Cow",
    tamil: "எச்.எஃப் பசு",
    hero: "/animals/HF Cow.jpg",
    gallery: ["/animals/HF Cow.jpg", "/animals/HF Cow2.jpg"],
    tagline: "Holstein Friesian — the gentle giant of dairy.",
    description:
      "Black-and-white HF cows are the highest milk-yielding breed in the world. Ours are raised on green fodder, clean water and stress-free sheds. We sell healthy, lactating and pregnant cows with verified milk records.",
    traits: [
      { label: "Breed", value: "Holstein Friesian (HF)" },
      { label: "Milk yield", value: "18–25 litres/day average" },
      { label: "Care", value: "Free of antibiotics, green fed" },
      { label: "Best for", value: "Dairy farms, home dairy" },
    ],
    priceNote: "Contact for current pricing",
    contact: ["7339598737"],
    whatsapp: "917339598737",
  },
  // GOATS
  {
    slug: "goat",
    category: "goats",
    name: "Goat",
    tamil: "ஆடு",
    hero: "/animals/Goat.jpg",
    gallery: ["/animals/Goat.jpg"],
    tagline: "Strong native goats — bred for taste and yield.",
    description:
      "Healthy native goats sold by weight for meat and breeding. Free-grazed, hormone-free, and weighed honestly. Bulk orders for functions and festivals welcomed.",
    traits: [
      { label: "Type", value: "Native goat" },
      { label: "Diet", value: "Free-graze + green fodder" },
      { label: "Use", value: "Meat / Breeding / Function" },
      { label: "Bulk", value: "Available for events" },
    ],
    priceNote: "₹600 / kg",
    contact: ["7339598737"],
    whatsapp: "917339598737",
  },
  {
    slug: "sembari-pottu",
    category: "goats",
    name: "Sembari (Pottu Aadu)",
    tamil: "செம்பறி — பொட்டு ஆடு",
    hero: "/animals/Sembari ( pottu aadu ).jpg",
    gallery: ["/animals/Sembari ( pottu aadu ).jpg"],
    tagline: "The flagship Sembari — bold, marked, magnificent.",
    description:
      "Sembari Pottu Aadu is famous for its distinctive coat markings and impressive frame. Prized for both breeding and show. A true heritage breed of South Tamil Nadu.",
    traits: [
      { label: "Breed", value: "Sembari (Pottu)" },
      { label: "Use", value: "Breeding / Show / Meat" },
      { label: "Notes", value: "Heritage Tamil breed" },
    ],
    priceNote: "₹600 / kg or contact for breeding pair",
    contact: ["7339598737"],
    whatsapp: "917339598737",
  },
  {
    slug: "sembari-mayilambadi",
    category: "goats",
    name: "Sembari (Mayilambadi)",
    tamil: "செம்பறி — மயிலம்பாடி",
    hero: "/animals/Sembari(Mayilambadi).jpg",
    gallery: ["/animals/Sembari(Mayilambadi).jpg"],
    tagline: "Mayilambadi line — taller, leaner, prized.",
    description:
      "The Mayilambadi strain of Sembari is famed in the southern districts for its taller frame, lean meat ratio, and stunning coat. Excellent for breeding programs and high-value buyers.",
    traits: [
      { label: "Breed", value: "Sembari (Mayilambadi)" },
      { label: "Use", value: "Premium breeding & show" },
      { label: "Frame", value: "Tall & lean" },
    ],
    priceNote: "₹600 / kg or contact for breeding pair",
    contact: ["7339598737"],
    whatsapp: "917339598737",
  },
  // POULTRY
  {
    slug: "naatu-koli",
    category: "poultry",
    name: "Naatu Koli",
    tamil: "நாட்டு கோழி",
    hero: "/animals/Naatu koli.jpg",
    gallery: ["/animals/Naatu koli.jpg"],
    tagline: "Real country chicken. Real taste.",
    description:
      "Free-range native country chicken — what your grandmother actually cooked. Lean, flavourful meat, raised on grain and insects, never battery-caged. Sold live by weight.",
    traits: [
      { label: "Type", value: "Country chicken (Naatu Koli)" },
      { label: "Raise", value: "Free-range, grain-fed" },
      { label: "Sold", value: "Live, by weight" },
    ],
    priceNote: "₹600 / kg",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  {
    slug: "red-sonali",
    category: "poultry",
    name: "Red Sonali",
    tamil: "சோனாலி",
    hero: "/animals/Red Sonali.jpg",
    gallery: ["/animals/Red Sonali.jpg"],
    tagline: "The dual-purpose champion of small farms.",
    description:
      "Red Sonali (Sonali) birds are loved for steady egg production AND solid meat. Hardy, disease-resistant, and perfect for backyard or commercial flocks.",
    traits: [
      { label: "Breed", value: "Red Sonali" },
      { label: "Use", value: "Eggs + meat (dual purpose)" },
      { label: "Note", value: "Disease-resistant, hardy" },
    ],
    priceNote: "Contact for live bird pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  {
    slug: "sanda-koli",
    category: "poultry",
    name: "Sanda Koli",
    tamil: "சண்டை கோழி",
    hero: "/animals/Sanda koli.jpg",
    gallery: ["/animals/Sanda koli.jpg"],
    tagline: "Built for the arena. Bloodline matters.",
    description:
      "Sanda Koli (fighter hens / game fowl) bred from verified Tamil bloodlines. Strong stance, sharp reflexes, and proven game heritage. Ideal for serious breeders and game enthusiasts.",
    traits: [
      { label: "Type", value: "Game fowl" },
      { label: "Bloodline", value: "Verified Tamil game lines" },
      { label: "Use", value: "Breeding, game" },
    ],
    priceNote: "Contact for bloodline pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  {
    slug: "sanda-seval",
    category: "poultry",
    name: "Sanda Seval",
    tamil: "சண்டை சேவல்",
    hero: "/animals/Sanda Seval.jpg",
    gallery: ["/animals/Sanda Seval.jpg"],
    tagline: "The Tamil fighting rooster. A living trophy.",
    description:
      "Sanda Seval — the legendary Tamil fighting rooster, bred for stance, plumage, and game heart. Each bird is hand-selected from championship lines and raised on a clean, high-protein diet.",
    traits: [
      { label: "Type", value: "Fighting rooster (Seval)" },
      { label: "Lines", value: "Championship bloodlines" },
      { label: "Notes", value: "Hand-selected, conditioned" },
    ],
    priceNote: "Contact for bloodline pricing",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
  // EGGS
  {
    slug: "farm-eggs",
    category: "eggs",
    name: "Country Chicken Eggs",
    tamil: "நாட்டு கோழி முட்டை",
    hero: "/animals/Naatu Koli Eggs.jpg",
    gallery: ["/animals/Naatu Koli Eggs.jpg", "/animals/Naatu koli.jpg"],
    tagline: "Real eggs from real hens, every single day.",
    description:
      "Fresh eggs from our free-range Naatu Koli flock — collected daily, never refrigerated for weeks. Rich orange yolk, hard shell, and the taste your parents grew up with. Available retail and wholesale.",
    traits: [
      { label: "Source", value: "Free-range Naatu Koli" },
      { label: "Freshness", value: "Daily collection" },
      { label: "Order", value: "Retail & wholesale" },
    ],
    priceNote: "Contact for current rate",
    contact: ["7305644912", "7339026424"],
    whatsapp: "917305644912",
  },
];

export const getAnimalsByCategory = (slug) =>
  ANIMALS.filter((a) => a.category === slug);

export const getAnimalBySlug = (slug) =>
  ANIMALS.find((a) => a.slug === slug);

export const getCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug);
