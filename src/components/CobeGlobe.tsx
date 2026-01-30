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
      mapBrightness: 12,
      baseColor: [0.1, 0.1, 0.2], // Dark purple base to blend with lightening
      markerColor: [1, 0.4, 0.6], // Pinkish
      glowColor: [0.7, 0.4, 1], // Purple glow
      opacity: 1,
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
        { location: [33.4484, -112.0740], size: 0.03 }, // Phoenix
        { location: [42.3601, -71.0589], size: 0.03 }, // Boston
        { location: [45.5017, -73.5673], size: 0.03 }, // Montreal
        { location: [29.7604, -95.3698], size: 0.03 }, // Houston
        { location: [32.7767, -96.7970], size: 0.03 }, // Dallas

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
        { location: [55.6761, 12.5683], size: 0.03 }, // Copenhagen
        { location: [59.9139, 10.7522], size: 0.03 }, // Oslo
        { location: [53.3498, -6.2603], size: 0.03 }, // Dublin
        { location: [41.3851, 2.1734], size: 0.04 }, // Barcelona
        { location: [48.1351, 11.5820], size: 0.03 }, // Munich
        { location: [52.2297, 21.0122], size: 0.03 }, // Warsaw
        { location: [45.4642, 9.1900], size: 0.03 }, // Milan
        { location: [50.8503, 4.3517], size: 0.03 }, // Brussels
        { location: [60.1699, 24.9384], size: 0.03 }, // Helsinki

        // Asia / Pacific
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
        { location: [37.5665, 126.9780], size: 0.04 }, // Seoul
        { location: [22.3193, 114.1694], size: 0.04 }, // Hong Kong
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [34.6937, 135.5023], size: 0.03 }, // Osaka
        { location: [25.0330, 121.5654], size: 0.03 }, // Taipei
        { location: [13.7563, 100.5018], size: 0.03 }, // Bangkok
        { location: [35.1796, 136.9066], size: 0.03 }, // Nagoya
        
        // Australia & Oceania
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [-37.8136, 144.9631], size: 0.03 }, // Melbourne
        { location: [-27.4698, 153.0251], size: 0.03 }, // Brisbane
        { location: [-36.8485, 174.7633], size: 0.03 }, // Auckland
        { location: [-31.9505, 115.8605], size: 0.03 }, // Perth
        
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
    <div className="w-full h-full flex items-center justify-center relative" role="img" aria-label="Interactive 3D globe showing global presence across 30+ countries">
       <div className="absolute inset-0 z-10 pointer-events-none" />
       <canvas
        ref={canvasRef}
        role="presentation"
        aria-hidden="true"
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
