import { useRef, useState, useEffect } from "react";
import beforeRepair from '../../assets/beforeRepair.jpg';
import afterRepair from '../../assets/afterRepair.png';

function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const containerWidthRef = useRef(0);
  const [position, setPosition] = useState(50);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    containerWidthRef.current = containerRef.current.offsetWidth;
    forceUpdate(1);

    const observer = new ResizeObserver(([entry]) => {
      containerWidthRef.current = entry.contentRect.width;
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    let percentage = ((clientX - bounds.left) / bounds.width) * 100;
    percentage = Math.min(100, Math.max(0, percentage));
    setPosition(percentage);
  };

  const startDrag = (e) => {
    e.preventDefault();
    const onMouseMove = (e) => handleMove(e.clientX);
    const stopDrag = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
  };

  const startTouch = () => {
    const onTouchMove = (e) => handleMove(e.touches[0].clientX);
    const stopTouch = () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopTouch);
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stopTouch);
  };

  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center sm:px-25 px-2 py-5">
      <h1 className="font-poppins text-3xl font-bold leading-tight text-slate-600 sm:text-4xl lg:text-4xl text-center">
        See <span className="text-[#4abafa] underline decoration-4">Our Work</span> Which Will Amaze You!
      </h1>

      <div
        ref={containerRef}
        onClick={(e) => handleMove(e.clientX)}
        className="relative w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden select-none"
        style={{ aspectRatio: "16 / 9" }}
      >
        {/* AFTER — base layer */}
        <img
          src={afterRepair}
          alt="After repair"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* BEFORE — clipped layer */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeRepair}
            alt="Before repair"
            className="absolute inset-0 h-full grayscale pointer-events-none"
            style={{
              width: `${containerWidthRef.current}px`,
              maxWidth: "none",
              objectFit: "cover",
              objectPosition: "left",
            }}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        />

        {/* Drag handle */}
        <div
          onMouseDown={startDrag}
          onTouchStart={startTouch}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${position}%` }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 5L3 10L7 15" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 5L17 10L13 15" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm pointer-events-none">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm pointer-events-none">
          After
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;