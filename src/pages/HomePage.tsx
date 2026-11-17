import HeroArchPoster from "@/components/sections/hero/HeroArchPoster";
import AboutArchCurve from "@/components/sections/about/AboutArchCurve";
import ServicesNightList from "@/components/sections/features/ServicesNightList";
import GalleryWindowMerge from "@/components/sections/gallery/GalleryWindowMerge";
import StatementPlusConcept from "@/components/sections/statement/StatementPlusConcept";
import ContactPlumForm from "@/components/sections/contact/ContactPlumForm";

export default function HomePage() {
  return (
    <>
      <div id="hero" data-webild-section="HeroArchPoster" data-webild-section-id="HeroArchPoster-1" data-section="hero" className="contents" data-scene>
        <HeroArchPoster
          title="UMATI Living"
          script="Harare"
          labelLeft="Luxury Estates"
          labelRight="Gated Haven"
          marquee={[
            "Boutique Design",
            "Bespoke Luxury",
            "Prime Real Estate"
          ]}
          imageSrc="https://img.b2bpic.net/free-photo/3d-house-model-with-modern-architecture_23-2151004034.jpg"
          imageAlt="modern townhouse complex facade"
          cta={{
            text: "View Projects",
            href: "#gallery"
          }}
        />
      </div>

      <div id="about" data-webild-section="AboutArchCurve" data-webild-section-id="AboutArchCurve-1" data-section="about">
        <AboutArchCurve
          title="Built For Permanence"
          label="Harare's premier luxury estate developer"
          placeTitle="Harare Prime"
          description="Over 12 years, UMATI delivers boutique townhouses and private gated sanctuaries combining visionary architecture with precision construction across Harare."
          note="12 Years of Excellence"
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/coworkers-office-with-architecture-plans-computer_329181-12390.jpg",
              imageAlt: "Coworkers at office with architecture plans and a computer"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-young-business-team-working_23-2149153848.jpg",
              imageAlt: "Close up on young business team working"
            }
          ]}
        />
      </div>

      <div id="services" data-webild-section="ServicesNightList" data-webild-section-id="ServicesNightList-1" data-section="services" data-scene>
        <ServicesNightList
          items={[
            {
              title: "Architect Design",
              description: "Crafting clean, geometric floor plans tailored for luxury estate living.",
              imageSrc: "https://img.b2bpic.net/free-photo/worker-creative-office-uses-cad-software-design-house-interior_482257-125210.jpg",
              imageAlt: "architect working on computer in office"
            },
            {
              title: "Property Build",
              description: "Managing premium construction projects with precision and strict timelines.",
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-shot-caucasian-contractor-holding-real-estate-project-while-his-african-colleague-pointing-finger-scale-model-building-explaining-design-presentation-meeting-office_273609-5611.jpg",
              imageAlt: "contractors discussing house model"
            },
            {
              title: "Estate Management",
              description: "Maintaining perimeter security, green spaces, and shared estate infrastructure.",
              imageSrc: "https://img.b2bpic.net/free-photo/nobody-office-with-3d-architecture-design-building-model-urban-project-empty-space-with-construction-print-blueprints-plans-property-development-sketch-technology_482257-37074.jpg",
              imageAlt: "architects working on building models"
            },
            {
              title: "Strategic Advisory",
              description: "Guiding private investors through prime land and off-plan housing opportunities.",
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-house-keys-near-real-estate-agent_23-2147797619.jpg",
              imageAlt: "real estate agent with house model"
            }
          ]}
          imageSrc="https://img.b2bpic.net/free-photo/3d-electric-car-building_23-2148972401.jpg"
          imageAlt="3d electric car and building"
          cta={{
            text: "Enquire Now",
            href: "#contact-plum-form"
          }}
        />
      </div>

      <div id="gallery" data-webild-section="GalleryWindowMerge" data-webild-section-id="GalleryWindowMerge-1" data-section="gallery" data-scene data-gallery>
        <GalleryWindowMerge
          word="HARARE"
          quote="We design spaces where architectural rigor meets everyday comfort."
          credit="Grace Murphy, lead architect"
          imageSrc="https://img.b2bpic.net/free-photo/minimalist-architecture-space_23-2151912524.jpg"
          imageAlt="Minimalist architecture space"
          items={[
            {
              title: "Ivory Gardens",
              imageSrc: "https://img.b2bpic.net/free-photo/colonial-style-house-night-scene_1150-17925.jpg",
              imageAlt: "colonial style house in night scene"
            },
            {
              title: "Avondale Ridge",
              imageSrc: "https://img.b2bpic.net/free-photo/mediterranean-villa-with-lavender-garden-stone-pathway_23-2151986063.jpg",
              imageAlt: "Mediterranean villa with lavender garden and stone pathway"
            },
            {
              title: "Highlands Enclave",
              imageSrc: "https://img.b2bpic.net/free-photo/modern-style-house-exterior-with-terrace_114579-2229.jpg",
              imageAlt: "Modern style house exterior with terrace"
            },
            {
              title: "Borrowdale Terraces",
              imageSrc: "https://img.b2bpic.net/free-photo/view-luxurious-villa-with-modern-architectural-design_23-2151694152.jpg",
              imageAlt: "View of luxurious villa with modern architectural design"
            },
            {
              title: "Ballantyne Park",
              imageSrc: "https://img.b2bpic.net/free-photo/modern-wooden-apartment-building-with-green-roof_23-2151990802.jpg",
              imageAlt: "Modern wooden apartment building with green roof"
            },
            {
              title: "Rolf Valley Heights",
              imageSrc: "https://img.b2bpic.net/free-photo/rural-patio-with-furniture-vegetation_23-2150698422.jpg",
              imageAlt: "Rural patio with furniture and vegetation"
            }
          ]}
        />
      </div>

      <div id="statement" data-webild-section="StatementPlusConcept" data-webild-section-id="StatementPlusConcept-1" data-section="statement">
        <StatementPlusConcept
          label="Featured Project"
          title="Ivory Gardens brings twenty-two luxury boutique townhouses to Marlborough Drive in Harare."
          description="Now selling off-plan with private gardens, double garages, open architectural layouts, and flexible stage payments."
        />
      </div>

      <div id="contact-plum-form" data-webild-section="ContactPlumForm" data-webild-section-id="ContactPlumForm-1" data-section="contact-plum-form">
        <ContactPlumForm
          title="Connect With Us"
          script="Contact"
          options={[
            "Off-Plan Townhouse",
            "Gated Community",
            "Private Site Visit",
            "Investor Inquiry"
          ]}
          submitText="Send Inquiry"
          labels={{
            name: "Full Name",
            email: "Email Address",
            enquiry: "Property Interest",
            message: "Message",
            sending: "Sending...",
            sent: "Message Sent",
            thanks: "Thank you. Our developments team will respond shortly."
          }}
        />
      </div>
    </>
  );
}
