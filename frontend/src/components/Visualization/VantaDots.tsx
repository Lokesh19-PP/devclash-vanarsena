import { useEffect, useRef } from 'react';

export default function VantaDots() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any = null;

    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
        if (script) {
          if (script.getAttribute('data-loaded') === 'true') {
            resolve();
          } else {
            script.addEventListener('load', () => resolve());
            script.addEventListener('error', () => reject());
          }
          return;
        }
        script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          script.setAttribute('data-loaded', 'true');
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js');
        
        if ((window as any).VANTA && (window as any).VANTA.DOTS && vantaRef.current) {
          vantaEffect = (window as any).VANTA.DOTS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xffffff,
            color2: 0xffffff,
            backgroundColor: 0x0a0a0a, // Match Tech Noir aesthetic overlay
            size: 3.60,
            spacing: 31.00,
            showLines: false // Explicitly disabling the default Vanta lines that create a central blob
          });
        }
      } catch (err) {
        console.error("Vanta load error", err);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 bg-[#0a0a0a] z-0" />;
}
