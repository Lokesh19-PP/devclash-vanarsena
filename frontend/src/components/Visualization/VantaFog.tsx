import { useEffect, useRef } from 'react';

export default function VantaFog() {
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
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js');
        
        if ((window as any).VANTA && vantaRef.current) {
          vantaEffect = (window as any).VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xb8b8b8,
            midtoneColor: 0xffffff,
            lowlightColor: 0x8755a4,
            baseColor: 0x0a0a0a,
            blurFactor: 0.6,
            speed: 1.5,
            zoom: 1.0
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

  return <div ref={vantaRef} className="absolute inset-0 bg-[#0a0a0a] -z-10" />;
}
