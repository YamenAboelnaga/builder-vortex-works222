import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Star,
  Instagram,
  Twitter,
  Search,
  Download,
  Chrome,
  Smartphone,
  Copy,
  Sun,
  Moon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Type declaration for spline-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url?: string;
      };
    }
  }
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// High-quality fashion/streetwear images from Cosmos.so for VOID APPAREL
const fashionImages = [
  {
    id: 1,
    aspect: "3/4",
    src: "https://www.cosmos.so/wp-content/uploads/2023/06/exo-3-400x400.jpg",
    alt: "Cosmos Image 1",
  },
  {
    id: 2,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex11-340x510.jpg",
    alt: "Cosmos Image 2",
  },
  {
    id: 3,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex15-344x430.png",
    alt: "Cosmos Image 3",
  },
  {
    id: 4,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex7-320x400.jpg",
    alt: "Cosmos Image 4",
  },
  {
    id: 5,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex31-340x340.jpg",
    alt: "Cosmos Image 5",
  },
  {
    id: 6,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex10-344x430.jpeg",
    alt: "Cosmos Image 6",
  },
  {
    id: 7,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex25-344x430.jpeg",
    alt: "Cosmos Image 7",
  },
  {
    id: 8,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex14-344x430.jpeg",
    alt: "Cosmos Image 8",
  },
  {
    id: 9,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex24-320x400.jpg",
    alt: "Cosmos Image 9",
  },
  {
    id: 10,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/04/0d5ed09ca7e335591428e4cb7db5f67c-340x340.png",
    alt: "Cosmos Image 10",
  },
  {
    id: 11,
    aspect: "3/4",
    src: "https://www.cosmos.so/wp-content/uploads/2023/03/05cf024683b67bc12b6d9c104197c0e5-340x510.png",
    alt: "Cosmos Image 11",
  },
  {
    id: 12,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/06/issy-2-344x430.jpg",
    alt: "Cosmos Image 12",
  },
  {
    id: 13,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/04/aa43c6e335f87bb97678e7ec397dfd9c-344x430.png",
    alt: "Cosmos Image 13",
  },
  {
    id: 14,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/04/b83087f110bbee59badcb69f0a188a99-340x340.png",
    alt: "Cosmos Image 14",
  },
  {
    id: 15,
    aspect: "4/5",
    src: "https://www.cosmos.so/wp-content/uploads/2023/04/35602dfd11feffb565361144ae168c1d-344x430.png",
    alt: "Cosmos Image 15",
  },
  {
    id: 16,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2024/04/film-340x340.jpeg",
    alt: "Cosmos Image 16",
  },
  {
    id: 17,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/06/excerpts-5-340x340.jpg",
    alt: "Cosmos Image 17",
  },
  {
    id: 18,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/06/exo-3-340x340.jpg",
    alt: "Cosmos Image 18",
  },
  {
    id: 19,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2024/04/editorial-1-340x340.jpg",
    alt: "Cosmos Image 19",
  },
  {
    id: 20,
    aspect: "3/4",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex1-340x510.jpg",
    alt: "Cosmos Image 20",
  },
  {
    id: 21,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex16-340x340.png",
    alt: "Cosmos Image 21",
  },
  {
    id: 22,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex24-340x340.jpg",
    alt: "Cosmos Image 22",
  },
  {
    id: 23,
    aspect: "3/4",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex11-267x400.jpg",
    alt: "Cosmos Image 23",
  },
  {
    id: 24,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/05/vortex31-266x266.jpg",
    alt: "Cosmos Image 24",
  },
  {
    id: 25,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/04/0d5ed09ca7e335591428e4cb7db5f67c-266x266.png",
    alt: "Cosmos Image 25",
  },
  {
    id: 26,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2024/04/film-266x266.jpeg",
    alt: "Cosmos Image 26",
  },
  {
    id: 27,
    aspect: "1/1",
    src: "https://www.cosmos.so/wp-content/uploads/2023/06/exo-3-266x266.jpg",
    alt: "Cosmos Image 27",
  },
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [showExtensionMenu, setShowExtensionMenu] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);

  const heroRef = useRef(null);
  const mainGridRef = useRef(null);
  const extensionRef = useRef(null);
  const curationRef = useRef(null);
  const aiTaggingRef = useRef(null);
  const searchRef = useRef(null);
  const collectionsRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const isMainGridInView = useInView(mainGridRef, { once: false, amount: 0.3 });
  const isExtensionInView = useInView(extensionRef, {
    once: false,
    amount: 0.3,
  });
  const isCurationInView = useInView(curationRef, { once: false, amount: 0.3 });
  const isAiTaggingInView = useInView(aiTaggingRef, {
    once: false,
    amount: 0.3,
  });
  const isSearchInView = useInView(searchRef, { once: false, amount: 0.3 });
  const isCollectionsInView = useInView(collectionsRef, {
    once: false,
    amount: 0.3,
  });
  const isCtaInView = useInView(ctaRef, { once: false, amount: 0.3 });

  const dynamicTexts = [
    "visionaries",
    "minimalists",
    "authenticity",
    "expression",
    "philosophy",
    "identity",
  ];

  const saveTexts = [
    "fits",
    "styles",
    "pieces",
    "looks",
    "outfits",
    "inspiration",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExtensionMenu(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    // Professional Hero to Main Grid "swallowing" transition
    const heroSection = heroRef.current;
    const mainGridSection = mainGridRef.current;

    if (heroSection && mainGridSection) {
      // Set initial perfect states
      gsap.set(mainGridSection, {
        scale: 0.1,
        opacity: 0,
        transformOrigin: "center center",
        zIndex: 1,
        visibility: "visible",
      });

      gsap.set(heroSection, {
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
        zIndex: 50,
        visibility: "visible",
      });

      // Create smooth transition timeline
      const heroToMain = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(heroSection, { zIndex: -1, visibility: "hidden" });
          gsap.set(mainGridSection, {
            zIndex: 50,
            position: "relative",
            top: "auto",
            left: "auto",
            width: "auto",
            height: "auto",
          });
        },
        onReverseComplete: () => {
          gsap.set(heroSection, { zIndex: 50, visibility: "visible" });
          gsap.set(mainGridSection, {
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          });
        },
      });

      // Smooth hero swallowing and emergence (bidirectional)
      heroToMain.fromTo(
        heroSection,
        {
          scale: 1,
          opacity: 1,
          transformOrigin: "center center",
        },
        {
          scale: 0.01,
          opacity: 0,
          duration: 1.5,
          ease: "easeInOut",
          transformOrigin: "center center",
        },
        0,
      );

      // Smooth main grid swallowing and emergence (bidirectional)
      heroToMain.fromTo(
        mainGridSection,
        {
          scale: 0.1,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "easeOut",
          transformOrigin: "center center",
        },
        0.1,
      );

      // Custom scroll handler for controlled transitions
      let isTransitioning = false;
      let currentSection = "hero"; // Track current section

      // Update timeline callbacks
      heroToMain.eventCallback("onStart", () => {
        isTransitioning = true;
      });

      heroToMain.eventCallback("onComplete", () => {
        isTransitioning = false;
        currentSection = "main";
        gsap.set(heroSection, { zIndex: -1, visibility: "hidden" });
        gsap.set(mainGridSection, {
          zIndex: 1,
          position: "relative",
        });
        // Scroll to exact beginning of section 2 content
        setTimeout(() => {
          const mainGridTop = mainGridSection.offsetTop;
          window.scrollTo(0, mainGridTop);
        }, 100);
      });

      heroToMain.eventCallback("onReverseComplete", () => {
        isTransitioning = false;
        currentSection = "hero";
        gsap.set(heroSection, { zIndex: 50, visibility: "visible" });
        gsap.set(mainGridSection, {
          zIndex: 1,
          position: "relative",
        });
        // Reset to top
        window.scrollTo(0, 0);
      });

      // Custom wheel handler for precise control
      const handleWheel = (e: WheelEvent) => {
        if (isTransitioning) {
          e.preventDefault();
          return;
        }

        // Hero section - any scroll down triggers transition
        if (currentSection === "hero" && e.deltaY > 0) {
          e.preventDefault();
          heroToMain.play();
          return;
        }

        // Section 2 beginning - scroll up triggers reverse (only at exact beginning)
        const mainGridTop = mainGridSection.offsetTop;
        if (
          currentSection === "main" &&
          Math.abs(window.scrollY - mainGridTop) < 50 &&
          e.deltaY < 0
        ) {
          e.preventDefault();
          heroToMain.reverse();
          return;
        }
      };

      // Add wheel listener
      document.addEventListener("wheel", handleWheel, { passive: false });

      // Store cleanup
      (window as any).heroCleanup = () => {
        document.removeEventListener("wheel", handleWheel);
      };
    }

    // Normal scroll behavior for remaining sections after main grid
    const extensionSection = extensionRef.current;
    const curationSection = curationRef.current;
    const aiTaggingSection = aiTaggingRef.current;
    const searchSection = searchRef.current;
    const collectionsSection = collectionsRef.current;
    const ctaSection = ctaRef.current;

    // Ensure all sections after main grid have normal behavior
    [
      extensionSection,
      curationSection,
      aiTaggingSection,
      searchSection,
      collectionsSection,
      ctaSection,
    ].forEach((section) => {
      if (section) {
        gsap.set(section, {
          scale: 1,
          opacity: 1,
          transformOrigin: "center center",
          clearProps: "all", // Clear any previous transforms
        });

        // Simple entrance animation for each section
        gsap.fromTo(
          section,
          {
            y: 100,
            opacity: 0.7,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "easeOut",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    // Floating images animation
    gsap.utils.toArray(".floating-card").forEach((card: any, i) => {
      gsap.to(card, {
        y: -50 + Math.random() * 100,
        x: -25 + Math.random() * 50,
        rotation: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    // Parallax effect for background elements
    gsap.utils.toArray(".parallax-element").forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // Clean up hero scroll handler
      if ((window as any).heroCleanup) {
        (window as any).heroCleanup();
      }
    };
  }, []);

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <motion.div
                className="text-xl font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                VOID
              </motion.div>
              <nav className="hidden md:flex space-x-6">
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Manifesto
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Collections
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Discover
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-700 text-sm"
              >
                <span className="text-xs">{isDarkMode ? "Dark" : "Light"}</span>
                {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
              </button>

              <button className="hidden md:block px-4 py-2 text-sm border border-gray-700 rounded-full hover:bg-gray-800 transition-colors">
                Log In
              </button>
              <button className="px-4 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                Sign Up
              </button>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="container mx-auto px-6 py-8 space-y-6">
              <a
                href="#"
                className="block text-lg hover:text-gray-300 transition-colors"
              >
                Manifesto
              </a>
              <a
                href="#"
                className="block text-lg hover:text-gray-300 transition-colors"
              >
                Collections
              </a>
              <a
                href="#"
                className="block text-lg hover:text-gray-300 transition-colors"
              >
                Discover
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Fixed position initially */}
      <section
        ref={heroRef}
        className="hero-section fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden bg-black z-50"
        style={{ height: "100vh" }}
      >
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <spline-viewer
            url="https://prod.spline.design/gsXU3caWIXytfLwp/scene.splinecode"
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Floating Fashion Images - Enhanced Cosmos Style */}
        <motion.div className="absolute inset-0 z-1" style={{ y: y1 }}>
          {/* Large prominent fashion cards - Cosmos Style with Visible Content */}
          {[
            {
              x: "3%",
              y: "12%",
              width: 120,
              height: 180,
              rotation: -15,
              imageIndex: 0,
              content: "Fashion Portrait",
            },
            {
              x: "78%",
              y: "65%",
              width: 110,
              height: 170,
              rotation: 12,
              imageIndex: 1,
              content: "Urban Look",
            },
            {
              x: "75%",
              y: "15%",
              width: 100,
              height: 150,
              rotation: -8,
              imageIndex: 2,
              content: "Editorial",
            },
          ].map((card, i) => (
            <motion.div
              key={`fashion-card-${i}`}
              className="floating-card absolute rounded-xl overflow-hidden shadow-2xl cursor-pointer"
              style={{
                left: card.x,
                top: card.y,
                width: `${card.width}px`,
                height: `${card.height}px`,
                transform: `rotate(${card.rotation}deg)`,
                zIndex: 1,
              }}
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              animate={{
                opacity: [0.8, 1, 0.85],
                scale: [0.9, 1.1, 0.95],
                y: [0, -30, 0],
                rotate: [card.rotation, card.rotation + 8, card.rotation],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.25,
                zIndex: 50,
                rotate: 0,
                transition: { duration: 0.3 },
              }}
            >
              <img
                src={fashionImages[card.imageIndex % fashionImages.length].src}
                alt={fashionImages[card.imageIndex % fashionImages.length].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                    <Instagram size={20} />
                  </div>
                  <div className="text-sm font-medium opacity-90">
                    {card.content}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram size={16} className="text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            </motion.div>
          ))}

          {/* Quote card like in Cosmos */}
          <motion.div
            className="absolute w-56 h-40 bg-black/80 backdrop-blur-sm rounded-xl border border-gray-700 flex items-center justify-center"
            style={{
              left: "55%",
              top: "35%",
              transform: "rotate(3deg)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.9, 1, 0.9],
              scale: [0.95, 1.05, 0.95],
              rotate: [5, 8, 5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 50,
              transition: { duration: 0.3 },
            }}
          >
            <div className="p-6 text-center">
              <p className="text-white text-base font-light italic leading-relaxed">
                "Style is more about being yourself."
              </p>
              <p className="text-gray-400 mt-3 text-xs">— Oscar de la Renta</p>
            </div>
            <div className="absolute bottom-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Twitter size={12} className="text-white" />
            </div>
          </motion.div>

          {/* Medium-sized floating cards */}
          {[
            {
              x: "8%",
              y: "72%",
              width: 60,
              height: 85,
              rotation: 20,
              imageIndex: 6,
            },
            {
              x: "35%",
              y: "78%",
              width: 65,
              height: 90,
              rotation: -15,
              imageIndex: 7,
            },
          ].map((card, i) => (
            <motion.div
              key={`medium-card-${i}`}
              className="absolute rounded-md overflow-hidden shadow-lg opacity-60"
              style={{
                left: card.x,
                top: card.y,
                width: `${card.width}px`,
                height: `${card.height}px`,
                transform: `rotate(${card.rotation}deg)`,
                zIndex: 1,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [card.rotation, card.rotation + 10, card.rotation],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5 + 2,
                ease: "easeInOut",
              }}
            >
              <img
                src={fashionImages[card.imageIndex % fashionImages.length].src}
                alt={fashionImages[card.imageIndex % fashionImages.length].alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        {/* CSS Animations */}
        <style>{`
          @keyframes float {
            0%,
            100% {
              transform: rotate(0deg) scale(1);
            }
            33% {
              transform: rotate(1deg) scale(1.02);
            }
            66% {
              transform: rotate(-1deg) scale(0.98);
            }
          }

          html,
          body {
            overflow-x: hidden;
            margin: 0;
            padding: 0;
          }

          .hero-section {
            will-change: transform, opacity;
            transform-origin: center center;
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 50;
            background: black;
          }

          .next-section {
            will-change: transform, opacity;
            transform-origin: center center;
            position: relative;
            z-index: 1;
            background: black;
            width: 100vw;
            min-height: 100vh;
          }

          .floating-card {
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
          }

          .parallax-element {
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
          }

                    /* Mobile Responsive Styles */
          @media (max-width: 768px) {
            /* Main text always on top */
            .hero-section .text-center {
              z-index: 100 !important;
              position: relative;
            }

            .hero-section h1,
            .hero-section .flex {
              z-index: 100 !important;
              position: relative;
            }

            /* Floating cards mobile adjustments */
            .floating-card {
              transform: scale(0.7) !important;
              z-index: 1 !important;
            }

            /* Large cards positioning */
            .floating-card:nth-child(1) {
              left: 2% !important;
              top: 8% !important;
            }

            .floating-card:nth-child(2) {
              left: 70% !important;
              top: 65% !important;
            }

            .floating-card:nth-child(3) {
              left: 68% !important;
              top: 10% !important;
            }

            /* Quote card mobile positioning */
            .hero-section div[style*="left: 55%"] {
              left: 45% !important;
              top: 25% !important;
              width: 180px !important;
              height: 110px !important;
              transform: scale(0.75) rotate(3deg) !important;
              z-index: 1 !important;
            }

            /* Orange icon mobile positioning */
            .hero-section div[style*="bottom: 4px"] {
              bottom: 8px !important;
              right: 8px !important;
              width: 60px !important;
              height: 60px !important;
              z-index: 1 !important;
            }

            /* Medium cards positioning adjustment */
            div[style*="left: 8%"] {
              left: 5% !important;
              top: 75% !important;
            }

            div[style*="left: 35%"] {
              left: 30% !important;
              top: 80% !important;
            }

            /* Particles reduced on mobile */
            .hero-section .absolute.w-1 {
              opacity: 0.2;
            }

            /* Main grid section mobile */
            .grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 1rem !important;
            }

            /* Text sizing mobile */
            .text-6xl {
              font-size: 3rem !important;
            }

            .text-8xl {
              font-size: 4rem !important;
            }

            .text-9xl {
              font-size: 5rem !important;
            }
          }

          @media (max-width: 480px) {
            /* Even smaller mobile adjustments */
            .floating-card {
              transform: scale(0.6) !important;
            }

            .hero-section div[style*="left: 55%"],
            .hero-section div[style*="left: 45%"] {
              width: 140px !important;
              height: 90px !important;
              transform: scale(0.65) rotate(3deg) !important;
            }

            .hero-section div[style*="bottom: 4px"] {
              width: 50px !important;
              height: 50px !important;
            }

            /* Text sizing extra small */
            .text-6xl {
              font-size: 2.5rem !important;
            }

            .text-8xl {
              font-size: 3rem !important;
            }

            .text-9xl {
              font-size: 3.5rem !important;
            }

            /* Grid single column on very small screens */
            .grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Main Content - Always on top with higher z-index */}
        <div className="text-center z-[100] px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ position: "relative", zIndex: 100 }}
          >
            {/* VOID Text with Enhanced Typography */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6 text-white"
              style={{
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
                position: "relative",
                zIndex: 100,
              }}
              animate={{
                textShadow: [
                  "0 0 30px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 30px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              VOID
            </motion.h1>

            {/* Tagline with Dynamic Text */}
            <div className="flex flex-col md:flex-row items-center justify-center text-lg md:text-xl text-gray-200 space-y-2 md:space-y-0 md:space-x-2">
              <span>The space between</span>
              <motion.div
                className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-gray-500 rounded-lg inline-block min-w-[140px] text-white font-medium"
                key={currentText}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ position: "relative", zIndex: 100 }}
              >
                {dynamicTexts[currentText]}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Fixed Orange Icon to Cover Built with Spline Text */}
        <motion.div
          className="absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center z-50"
          animate={{
            rotate: [12, 20, 12],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: { duration: 0.3 },
          }}
        >
          <Instagram size={18} className="text-white" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 hidden md:block">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-300 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Grid Section - Extension Content */}
      <section
        ref={mainGridRef}
        className="min-h-screen bg-black relative"
        style={{
          height: "100vh",
        }}
      >
        <div className="container mx-auto relative">
          {/* Extension grid background */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ y: y3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
              {fashionImages.slice(0, 16).map((img, i) => (
                <motion.div
                  key={`ext-${img.id}`}
                  className="rounded-lg shadow-lg relative overflow-hidden group cursor-pointer"
                  style={{ aspectRatio: img.aspect }}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Instagram size={14} className="text-white" />
                  </div>

                  {/* Extension Context Menu for highlighted item */}
                  {i === 5 && showExtensionMenu && (
                    <motion.div
                      className="absolute top-1/2 right-full mr-4 bg-gray-800 rounded-lg shadow-xl p-4 w-64 z-20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-sm text-gray-300 space-y-2">
                        <div className="hover:text-white cursor-pointer py-1">
                          Open Image in New Tab
                        </div>
                        <div className="hover:text-white cursor-pointer py-1">
                          Save Image As
                        </div>
                        <div className="hover:text-white cursor-pointer py-1">
                          Copy Image
                        </div>
                        <div className="hover:text-white cursor-pointer py-1 flex items-center text-white">
                          <div className="w-4 h-4 bg-white rounded mr-2 flex items-center justify-center">
                            <span className="text-black text-xs font-bold">
                              V
                            </span>
                          </div>
                          Save To VOID
                        </div>
                        <div className="hover:text-white cursor-pointer py-1">
                          Inspect
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Central Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 text-white">
                Curate your
                <br />
                authentic voice
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-12">
                Where philosophy meets fashion, where your true self emerges
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <motion.a
                  href="https://wa.me/+201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 border border-gray-600 rounded-lg text-sm hover:bg-gray-800 hover:border-white transition-all cursor-pointer text-white group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <div className="text-left">
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      Connect with us
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://instagram.com/void.apparel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 border border-gray-600 rounded-lg text-sm hover:bg-gray-800 hover:border-white transition-all cursor-pointer text-white group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Instagram</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      Follow our journey
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href="#collections"
                  className="flex items-center px-6 py-3 border border-gray-600 rounded-lg text-sm hover:bg-gray-800 hover:border-white transition-all cursor-pointer text-white group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star size={20} className="mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Collections</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      Explore our world
                    </div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacer to ensure normal scrolling after main grid */}
      <div style={{ height: "200vh" }}></div>

      {/* Curation Section - Now the first normal scrolling section */}
      <section ref={curationRef} className="min-h-screen py-20 px-6 bg-black">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
              Define your identity
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              VOID represents the space between conformity and self-expression.
              Create your unique aesthetic through carefully curated pieces that
              speak to your authentic self.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {fashionImages.slice(0, 4).map((img, i) => (
              <motion.div
                key={`curation-${img.id}`}
                className="rounded-lg shadow-lg relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: img.aspect }}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Instagram size={14} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tagging Section */}
      <section ref={aiTaggingRef} className="min-h-screen py-20 px-6 bg-black">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center max-w-7xl mx-auto">
            {/* Video with AI Tags */}
            <motion.div
              className="max-w-[25%] relative w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <video
                src="https://www.cosmos.so/wp-content/uploads/2023/06/Cosmos-Scan-Compressed_trimmed.mp4"
                muted
                playsInline
                autoPlay
                loop
                className="w-full object-contain rounded-lg"
              />

              {/* Floating AI Tags */}
              <div className="absolute inset-0">
                {[
                  { text: "issey miyake", left: "80%", top: "16%", delay: 0.2 },
                  { text: "70s fashion", left: "47%", top: "26%", delay: 0.4 },
                  { text: "movement", left: "-5%", top: "35%", delay: 0.6 },
                  { text: "fashion", left: "10%", top: "49%", delay: 0.8 },
                  {
                    text: "fashion design",
                    left: "67%",
                    top: "60%",
                    delay: 1.0,
                  },
                  { text: "dress", left: "34%", top: "80%", delay: 1.2 },
                ].map((tag, i) => (
                  <motion.div
                    key={tag.text}
                    className="absolute"
                    style={{ left: tag.left, top: tag.top }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tag.delay, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="backdrop-blur-md bg-black/50 rounded-full px-4 py-2 text-white text-sm whitespace-nowrap border border-gray-600/30">
                      {tag.text}
                    </div>
                  </motion.div>
                ))}

                {/* Color Palette Tag */}
                <motion.div
                  className="absolute"
                  style={{ left: "85%", top: "72%" }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="backdrop-blur-md bg-black/50 rounded-full px-4 py-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-200 rounded-full"></div>
                    <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-stone-800 rounded-full"></div>
                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="flex flex-col items-start ml-[8.33333%] max-w-[25%] pl-8 w-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-white text-left leading-tight">
                <span className="block">Magic</span>
                <span className="block">tagging</span>
                <span className="block">with</span>
                <span className="block">AI</span>
              </h2>
              <div className="text-lg text-gray-300 leading-relaxed text-left">
                <p className="mb-2">VOID understands the language of style.</p>
                <p className="mb-2">
                  Our intelligent system recognizes fashion
                </p>
                <p>elements that define your unique aesthetic.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section ref={searchRef} className="min-h-screen py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Explore
                <br />
                the void
                <br />
                within
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Discover pieces that resonate with your inner aesthetic. VOID is
                your gateway to authentic self-expression through carefully
                curated fashion statements.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
                <Search size={20} className="text-gray-400" />
                <span className="text-lg">minimal aesthetics</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {fashionImages.slice(0, 6).map((img, i) => (
                  <motion.div
                    key={`search-${img.id}`}
                    className="rounded-lg aspect-square relative overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
                      <Instagram size={12} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections Showcase */}
      <section
        ref={collectionsRef}
        className="min-h-screen py-20 px-6 bg-black relative overflow-hidden"
      >
        {/* Floating particles background */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6 text-white">
              Enter the VOID
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Where fashion meets philosophy. Embrace the space between trends
              and timelessness, where authentic style is born.
            </p>
          </motion.div>

          {/* Draggable collections slider */}
          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-8 min-w-max px-6">
              {[
                {
                  title: "Void Essentials",
                  author: "@void.official",
                  gradient: "from-gray-900 to-black",
                  followers: "2.3K",
                },
                {
                  title: "Minimal Void",
                  author: "@void.minimal",
                  gradient: "from-stone-700 to-slate-900",
                  followers: "1.8K",
                },
                {
                  title: "Urban Void",
                  author: "@void.urban",
                  gradient: "from-zinc-800 to-neutral-900",
                  followers: "3.1K",
                },
                {
                  title: "Void Philosophy",
                  author: "@void.philosophy",
                  gradient: "from-slate-800 to-gray-900",
                  followers: "1.5K",
                },
              ].map((collection, i) => (
                <motion.div
                  key={collection.title}
                  className="flex-shrink-0 w-80 cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-full aspect-square bg-gradient-to-br ${collection.gradient} rounded-xl mb-4 relative overflow-hidden group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-xl" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm opacity-80">
                        {collection.followers} Followers
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Star size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">
                    {collection.title}
                  </h3>
                  <div className="flex items-center text-gray-400">
                    <span className="text-sm">By {collection.author}</span>
                    <div className="w-4 h-4 bg-blue-500 rounded-full ml-2 flex items-center justify-center">
                      <Star size={10} className="text-white fill-current" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="min-h-screen py-20 px-6 bg-black relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-white">
                Available on web
                <br />
                and mobile
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Find style inspiration, anywhere it strikes. VOID works
                seamlessly across all your devices.
              </p>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                  <Download size={20} />
                  <span>Download App</span>
                </button>
                <button className="flex items-center space-x-3 px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Search size={20} />
                  <span>Try Web App</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center space-x-6">
                {/* Mobile mockup */}
                <div className="relative">
                  <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-b-xl"></div>
                      <div className="p-4 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-white font-medium">VOID</div>
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <img
                              key={i}
                              src={
                                fashionImages[(i + 15) % fashionImages.length]
                                  .src
                              }
                              alt={
                                fashionImages[(i + 15) % fashionImages.length]
                                  .alt
                              }
                              className="rounded-lg object-cover w-full h-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop mockup */}
                <div className="relative hidden md:block">
                  <div className="w-80 h-60 bg-gray-800 rounded-lg p-1 shadow-2xl">
                    <div className="w-full h-full bg-black rounded-md overflow-hidden relative">
                      <div className="p-3 h-full">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 h-full">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <img
                              key={i}
                              src={
                                fashionImages[(i + 21) % fashionImages.length]
                                  .src
                              }
                              alt={
                                fashionImages[(i + 21) % fashionImages.length]
                                  .alt
                              }
                              className="rounded object-cover w-full h-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-400 mb-12">
              Trusted by fashion enthusiasts and creative minds worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center max-w-3xl mx-auto">
              {[
                { name: "MINIMAL", gradient: "from-gray-700 to-gray-900" },
                { name: "AUTHENTIC", gradient: "from-stone-700 to-zinc-900" },
                { name: "TIMELESS", gradient: "from-slate-700 to-gray-900" },
              ].map((concept, i) => (
                <motion.div
                  key={concept.name}
                  className={`p-8 bg-gradient-to-br ${concept.gradient} rounded-lg text-white font-light text-xl opacity-80 hover:opacity-100 transition-all cursor-pointer border border-gray-700 hover:border-gray-500`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.8, scale: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                >
                  {concept.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="min-h-screen py-20 px-6 relative">
        {/* 3D Rocks Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-12 md:w-24 md:h-18 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full opacity-40"
              style={{
                left: `${20 + i * 10}%`,
                top: `${60 + Math.sin(i) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-400 mb-4">
              Enter the space between what was and what could be.
            </p>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-12">
              Embrace the VOID
            </h3>
            <button className="px-8 py-4 bg-white text-black rounded-lg text-lg hover:bg-gray-200 transition-colors font-medium">
              Explore Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-medium mb-4">VOID</h4>
              <p className="text-gray-400">
                Where fashion transcends trends and becomes philosophy.
              </p>
            </div>
            <div>
              <h5 className="font-medium mb-4 text-gray-300">Explore</h5>
              <div className="space-y-2">
                <a
                  href="#collections"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Collections
                </a>
                <a
                  href="#philosophy"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Philosophy
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4 text-gray-300">Legal</h5>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4 text-gray-300">Updates</h5>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <motion.div
              className="text-2xl font-light text-gray-400 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              VOID APPAREL
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
