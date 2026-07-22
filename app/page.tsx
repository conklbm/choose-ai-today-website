import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CommunitySignup from "@/components/CommunitySignup";
import Services from "@/components/Services";
import About from "@/components/About";
import OtherMeetups from "@/components/OtherMeetups";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/copy";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.domain,
  description: SITE.description,
  areaServed: { "@type": "City", name: "Mobile", containedInPlace: "Alabama" },
  knowsAbout: ["Artificial Intelligence", "AI Consulting", "AI Training"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <CommunitySignup />
        <Services />
        <About />
        <ContactForm />
        <OtherMeetups />
      </main>
      <Footer />
    </>
  );
}
