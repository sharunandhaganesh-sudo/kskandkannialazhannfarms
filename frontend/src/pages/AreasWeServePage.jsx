import { CONTACTS } from "../data/animals";
import useSEO from "../hooks/useSEO";

const SITE_URL = "https://www.kannialazhannfarm.in";

export default function AreasWeServePage() {
  useSEO({
    title: "Livestock & Farm Animal Delivery Across Tamil Nadu & Kerala | KSK & Kannialazhann Farm",
    description: "KSK & Kannialazhann Farm delivers native farm animals across Tamil Nadu and Kerala. From Rajapalayam to Kochi, Kollam, and Thiruvananthapuram, buy dogs, goats, cows, poultry & eggs with reliable transport and clear delivery terms.",
    url: `${SITE_URL}/areas-we-serve`,
  });

  const areas = [
    {
      name: "Rajapalayam & Gopalapuram",
      description: "Our home base. Same-day or next-day pickup available. Visit the farm for personalized consultations.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Kanyakumari",
      description: "The southern transport hub for Kerala-bound deliveries. Ideal for buyers near the Tamil Nadu–Kerala border.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Punalur",
      description: "Nearest major Kerala town via the Shenkottai pass. We deliver goats, dogs and poultry here on request.",
      contact: CONTACTS.whatsappCowGoat,
    },
    {
      name: "Kollam",
      description: "Strong demand for native dog breeds and Sembari goats. We arrange deliveries to Kollam with care and documentation.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Kottarakkara",
      description: "A growing poultry and livestock market. We deliver Naatu Koli, Red Sonali, and native goats to this region.",
      contact: CONTACTS.whatsappCowGoat,
    },
    {
      name: "Thiruvananthapuram",
      description: "Major Kerala city demand for poultry, eggs, and native dog breeds. We ship with trusted transport partners.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Pathanamthitta",
      description: "Service available for livestock and poultry buyers looking for authentic farm-sourced stock.",
      contact: CONTACTS.whatsappCowGoat,
    },
    {
      name: "Srivilliputhur",
      description: "High demand for Sembari goats for festivals and weddings. We deliver in bulk for functions — contact us 2-3 weeks in advance.",
      contact: CONTACTS.whatsappCowGoat,
    },
    {
      name: "Sivakasi",
      description: "Popular destination for Naatu Koli eggs and roosters. Households and small poultry operations regularly order from us.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Virudhunagar",
      description: "Strong market for native Tamil dog breeds (Rajapalayam, Kanni, Kombai). We have regular buyers here for breeding and guarding stock.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Sattur",
      description: "Excellent demand for HF dairy cows and Sembari goat breeding stock. We coordinate bulk deliveries.",
      contact: CONTACTS.whatsappCowGoat,
    },
    {
      name: "Tirunelveli",
      description: "Kanni dog territory. This region has strong hunting and guarding traditions — we supply extensively here.",
      contact: CONTACTS.whatsappPrimary,
    },
    {
      name: "Sankarankovil & Tenkasi",
      description: "Growing demand across the region for both poultry and goats. We deliver multiple times weekly.",
      contact: CONTACTS.whatsappCowGoat,
    },
    {
      name: "Madurai",
      description: "Large urban market. All categories popular here. We work with bulk orders and institutional buyers.",
      contact: CONTACTS.whatsappPrimary,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif-display text-5xl md:text-6xl text-[#2d2d2a] mb-6">
          We Deliver Native Livestock Across Tamil Nadu & Kerala
        </h1>
        <p className="text-lg text-[#5c5c5c] mb-16">
          From Rajapalayam to every corner of Tamil Nadu and Kerala — our goats, dogs, cows, poultry and eggs reach households, farms, and function organizers across the region. Below is how we serve your area.
        </p>

        <div className="grid gap-12 md:gap-16">
          {areas.map((area) => (
            <div key={area.name} className="border-b pb-12 last:border-b-0">
              <h2 className="text-2xl md:text-3xl font-serif-display text-[#1f4d2b] mb-4">
                {area.name}
              </h2>
              <p className="text-[#5c5c5c] mb-6 leading-relaxed">
                {area.description}
              </p>
              <a
                href={`https://wa.me/${area.contact}?text=Hi,%20I'm%20interested%20in%20your%20livestock.%20Can%20you%20help%20with%20delivery%20to%20${encodeURIComponent(area.name)}?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#1f4d2b] text-[#f4c20d] rounded-full font-semibold hover:bg-[#2d3d3a] transition"
              >
                Order for {area.name}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-[#f4c20d] bg-opacity-10 rounded-xl border border-[#1f4d2b] border-opacity-20">
          <h3 className="text-2xl font-serif-display text-[#1f4d2b] mb-3">
            Not seeing your area?
          </h3>
          <p className="text-[#5c5c5c] mb-4">
            We regularly expand delivery routes. Contact us to check availability or arrange special delivery:
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href={`https://wa.me/${CONTACTS.whatsappPrimary}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#1f4d2b] text-white rounded-full font-semibold hover:bg-[#2d3d3a]">
              WhatsApp +91 {CONTACTS.whatsappPrimary.slice(-10)}
            </a>
            <a href={`https://wa.me/${CONTACTS.whatsappCowGoat}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#1f4d2b] text-white rounded-full font-semibold hover:bg-[#2d3d3a]">
              Cows/Goats: +91 {CONTACTS.whatsappCowGoat.slice(-10)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
