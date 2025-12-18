import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
        if (canvasRef.current) {
            width = canvasRef.current.offsetWidth;
        }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.4, 0.6], // Pinkish
      glowColor: [1, 1, 1],
      opacity: 1, // Optional opacity
      markers: [
        // North America
        { location: [37.7595, -122.4367], size: 0.03 }, // SF
        { location: [40.7128, -74.0060], size: 0.05 }, // NYC
        { location: [34.0522, -118.2437], size: 0.03 }, // LA
        { location: [47.6062, -122.3321], size: 0.04 }, // Seattle
        { location: [25.7617, -80.1918], size: 0.03 }, // Miami
        { location: [41.8781, -87.6298], size: 0.04 }, // Chicago
        { location: [43.6532, -79.3832], size: 0.03 }, // Toronto
        { location: [49.2827, -123.1207], size: 0.03 }, // Vancouver
        { location: [39.7392, -104.9903], size: 0.03 }, // Denver
        { location: [30.2672, -97.7431], size: 0.03 }, // Austin

        // Europe (Excluding East/Ukraine/Russia)
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [48.8566, 2.3522], size: 0.05 }, // Paris
        { location: [52.5200, 13.4050], size: 0.04 }, // Berlin
        { location: [41.9028, 12.4964], size: 0.03 }, // Rome
        { location: [40.4168, -3.7038], size: 0.03 }, // Madrid
        { location: [52.3676, 4.9041], size: 0.04 }, // Amsterdam
        { location: [50.0755, 14.4378], size: 0.06 }, // Prague (Home!)
        { location: [48.1486, 17.1077], size: 0.04 }, // Bratislava
        { location: [47.3769, 8.5417], size: 0.04 }, // Zurich
        { location: [59.3293, 18.0686], size: 0.03 }, // Stockholm
        { location: [48.2082, 16.3738], size: 0.04 }, // Vienna

        // Asia / Pacific
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
        { location: [37.5665, 126.9780], size: 0.04 }, // Seoul
        { location: [22.3193, 114.1694], size: 0.04 }, // Hong Kong
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        
        // Australia
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [-37.8136, 144.9631], size: 0.03 }, // Melbourne
        
        // Middle East 
        { location: [25.2048, 55.2708], size: 0.03 }, // Dubai
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi + r.get();
        phi += 0.002; // 30% slower rotation
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => canvasRef.current!.style.opacity = '1');
    return () => { 
        globe.destroy();
        window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
       <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
       <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({ r: delta / 200 });
            }
        }}
        onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({ r: delta / 100 });
            }
        }}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1, cursor: 'grab', opacity: 0, transition: 'opacity 1s ease' }}
      />
    </div>
  );
}
