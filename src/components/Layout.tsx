import { Outlet } from "react-router-dom";
import NavbarSealCorner from "@/components/navbars/NavbarSealCorner";
import FooterPlumPhone from "@/components/sections/footer/FooterPlumPhone";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="solid" data-card="filled" data-pattern="hairlines">
      <header data-webild-section="Header">
        <NavbarSealCorner
          brand="UMATI Property Developments"
          cta={{
            text: "Enquire",
            href: "#contact-plum-form"
          }}
        />
      </header>
      <main className="flex-grow" data-button="solid" data-card="filled" data-pattern="hairlines">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterPlumPhone
          brand="UMATI Property Developments"
          phone="+263 77 309 8491"
          email="sales@umatidevelopments.co.zw"
          address={[
            "22 Ridge Road",
            "Avondale, Harare, Zimbabwe"
          ]}
          columns={[
            {
              title: "Navigation",
              links: [
                {
                  text: "Home",
                  href: "#hero"
                },
                {
                  text: "About Us",
                  href: "#about"
                },
                {
                  text: "Core Pillars",
                  href: "#services"
                }
              ]
            },
            {
              title: "Developments",
              links: [
                {
                  text: "Our Portfolio",
                  href: "#gallery"
                },
                {
                  text: "Ivory Gardens",
                  href: "#statement"
                },
                {
                  text: "Schedule Visit",
                  href: "#contact-plum-form"
                }
              ]
            },
            {
              title: "Connect",
              links: [
                {
                  text: "WhatsApp Sales",
                  href: "https://wa.me/263773098491"
                },
                {
                  text: "Inquire Online",
                  href: "#contact-plum-form"
                }
              ]
            }
          ]}
          legal="© 2026 UMATI Property Developments. All rights reserved."
          toTopText="Back to top"
        />
      </footer>
    </div>
  );
}
