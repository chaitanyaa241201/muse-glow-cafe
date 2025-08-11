import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const sections = [
  { id: "menu", label: "Menu" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const useRevealOnScroll = () => {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            (entry.target as HTMLElement).classList.add("animate-enter");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glow">
      <nav className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-display text-xl md:text-2xl tracking-tight story-link">Morning Muse</a>
          <div className="hidden md:flex items-center gap-6">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm story-link text-foreground/80 hover:text-foreground">
                {s.label}
              </a>
            ))}
            <a href="#contact"><Button variant="neon" size="sm">Reserve</Button></a>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center" aria-label="Morning Muse hero">
      <div
        ref={ref}
        className="absolute inset-0 [--mx:50%] [--my:50%]"
        style={{
          backgroundImage:
            "radial-gradient(400px 400px at var(--mx) var(--my), hsl(var(--accent) / 0.20), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/morning-muse/images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="reveal max-w-2xl">
          <p className="uppercase tracking-[.2em] text-sm text-muted-foreground mb-3">Cozy • Artisan • Fresh</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
            Morning Muse Café
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            A warm corner for crafted coffee, flaky pastries, and unhurried mornings.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#menu"><Button variant="neon" className="animate-neon">View Menu</Button></a>
            <a href="#contact"><Button variant="outline">Order Ahead</Button></a>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => (
  <section id="menu" className="py-20 md:py-28" aria-labelledby="menu-heading">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="reveal text-center mb-12">
        <h2 id="menu-heading" className="font-display text-3xl md:text-4xl mb-3">Our Menu</h2>
        <p className="text-muted-foreground">Signature drinks and fresh bakes, served all day.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "Espresso", desc: "Rich and bold, classic shot", price: "$3.00" },
          { name: "Cappuccino", desc: "Silky foam, perfect balance", price: "$4.50" },
          { name: "Hazelnut Latte", desc: "Nutty, creamy and smooth", price: "$5.00" },
          { name: "Croissant", desc: "Buttery layers, baked daily", price: "$3.50" },
          { name: "Blueberry Muffin", desc: "Bursting with berries", price: "$3.75" },
          { name: "Avocado Toast", desc: "Sourdough, chili flakes", price: "$7.50" },
        ].map((item) => (
          <article key={item.name} className="reveal glass p-6 hover-scale">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <span className="text-primary font-semibold">{item.price}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28" aria-labelledby="about-heading">
    <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
      <div className="reveal order-2 md:order-1">
        <h2 id="about-heading" className="font-display text-3xl md:text-4xl mb-3">About Us</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Morning Muse is a neighborhood café inspired by slow mornings and
          meaningful moments. We roast ethically sourced beans and bake fresh, every day.
        </p>
        <p className="text-muted-foreground">
          Whether you crave a quiet corner or a lively chat at the bar, our space is
          designed to welcome you with warmth, aroma, and friendly faces.
        </p>
      </div>
      <div className="reveal order-1 md:order-2">
        <img src="/morning-muse/images/g2.jpg" alt="Cozy seating at Morning Muse Café" className="w-full h-80 md:h-full object-cover rounded-lg hover-scale" loading="lazy" />
      </div>
    </div>
  </section>
);

const GallerySection = () => (
  <section id="gallery" className="py-20 md:py-28" aria-labelledby="gallery-heading">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="reveal text-center mb-12">
        <h2 id="gallery-heading" className="font-display text-3xl md:text-4xl mb-3">Gallery</h2>
        <p className="text-muted-foreground">A glimpse into our daily brews and bakes.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((i) => (
          <img
            key={i}
            src={`/morning-muse/images/g${i}.jpg`}
            alt={`Morning Muse café photo ${i}`}
            className="reveal w-full aspect-[4/3] object-cover rounded-lg hover-scale"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28" aria-labelledby="contact-heading">
    <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-start">
      <div className="reveal">
        <h2 id="contact-heading" className="font-display text-3xl md:text-4xl mb-3">Contact</h2>
        <p className="text-muted-foreground mb-6">123 Brew Lane, Riverside • Open daily 7am – 6pm</p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <Input placeholder="Your name" aria-label="Your name" />
          <Input type="email" placeholder="Your email" aria-label="Your email" />
          <Textarea placeholder="Message" aria-label="Message" className="min-h-32" />
          <Button type="submit" variant="neon">Send Message</Button>
        </form>
      </div>
      <div className="reveal">
        <div className="glass p-6">
          <h3 className="font-medium mb-2">Get in touch</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Prefer email or a quick call? We’d love to hear from you.
          </p>
          <ul className="space-y-2 text-sm">
            <li><a className="story-link" href="mailto:hello@morningmuse.cafe">hello@morningmuse.cafe</a></li>
            <li><a className="story-link" href="tel:+11234567890">+1 (123) 456-7890</a></li>
            <li>@morningmusecafe</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 border-t">
    <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <p>&copy; {new Date().getFullYear()} Morning Muse Café</p>
      <nav className="flex items-center gap-6">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="story-link text-foreground/80 hover:text-foreground">{s.label}</a>
        ))}
      </nav>
    </div>
  </footer>
);

const Index = () => {
  useRevealOnScroll();
  return (
    <div className="min-h-screen bg-background" id="top">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
