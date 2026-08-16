import { useRef } from "react";
/*
 * <LogoMarquee logos={logos} />
 *
 * PROPS
 * -----
 * logos          array of { name: string, src: string }   required
 * speed          "slow" | "normal" | "fast"               default "normal"
 * label          string shown above the marquee           default "Trusted by leading teams"
 */


const SPEED = {
  slow: { row1: "40s", row2: "50s" },
  normal: { row1: "28s", row2: "36s" },
  fast: { row1: "16s", row2: "20s" },
};

function MarqueeRow({ logos, reverse = false, duration = "28s" }) {
  const rowRef = useRef(null);

  const handleEnter = () => {
    const tracks = rowRef.current?.querySelectorAll(".marquee-track");
    tracks?.forEach(t => (t.style.animationPlayState = "paused"));
  };
  const handleLeave = () => {
    const tracks = rowRef.current?.querySelectorAll(".marquee-track");
    tracks?.forEach(t => (t.style.animationPlayState = "running"));
  };

  /* We duplicate the list twice so the loop is seamless */
  const items = [...logos, ...logos];

  return (
    <div
      ref={rowRef}
      className="relative flex overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="marquee-track flex shrink-0"
        style={{
          animation: `${reverse ? "marqueeRTL" : "marqueeLTR"} ${duration} linear infinite`,
        }}
      >
        {items.map((logo, i) => (
          <LogoItem key={`a-${i}`} logo={logo} />
        ))}
      </div>
      {/* Second identical track for seamless looping */}
      <div
        className="marquee-track flex shrink-0"
        style={{
          animation: `${reverse ? "marqueeRTL" : "marqueeLTR"} ${duration} linear infinite`,
        }}
        aria-hidden="true"
      >
        {items.map((logo, i) => (
          <LogoItem key={`b-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function LogoItem({ logo }) {
  return (
    <div className="group relative flex items-center justify-center w-40 h-16 mx-2 shrink-0 cursor-pointer">
      {/* Hover background pill */}
      <span className="absolute inset-1 rounded-xl bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <img
        src={logo.src}
        alt={logo.name}
        className="
          relative w-20 max-h-20 object-contain
          opacity-40 grayscale
          group-hover:opacity-100 group-hover:grayscale-0
          group-hover:scale-105
          transition-all duration-300 ease-out
        "
        loading="lazy"
      />
    </div>
  );
}

export default function LogoMarquee({
  logos = [],
  speed = "normal",
  label = "Trusted by leading teams",
  lableDes = 'We have experience repairing appliances from all major brands you trust at home.'
}) {
  if (!logos.length) return null;

  const { row1, row2 } = SPEED[speed] ?? SPEED.normal;

  return (
    <section className="w-full overflow-hidden sm:px-30">
      {/* Keyframes injected once */}
      <style>{`
        @keyframes marqueeLTR {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRTL {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {label && (
          <p className="font-poppins text-center text-base font-medium tracking-widest uppercase underline underline-offset-4 text-gray-400 dark:text-gray-500 mb-8 select-none">
            {label}
          </p>
      )}

      <div className="flex flex-col gap-4">
        <MarqueeRow logos={logos} reverse={false} duration={row1} />
        <MarqueeRow logos={logos} reverse={true} duration={row2} />
      </div>
    </section>
  );
}
