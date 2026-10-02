import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ProductIllustration } from '../catalog/components/ProductIllustration';

type BottleSceneProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function BottleScene({ sectionRef }: BottleSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      queueMicrotask(() => setUnavailable(true));
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 100);
    camera.position.set(0, 0.15, 11);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc2c9ba, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.3);
    key.position.set(-3, 5, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xfff5e8, 1.2);
    rim.position.set(4, 1, -4);
    scene.add(rim);

    let bottle: THREE.Group | undefined;
    let frame = 0;
    let disposed = false;
    let currentTurn = 0;
    let targetTurn = 0;
    let lastFrameTime = 0;
    let baseScale = 1;
    let entryStartedAt: number | null = null;
    const modelCenter = new THREE.Vector3();
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const render = (time: number) => {
      frame = 0;
      if (bottle) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const start = Math.max(0, sectionTop - window.innerHeight * 0.2);
        const end = sectionTop + section.offsetHeight - canvas.parentElement!.offsetHeight;
        const progress = Math.min(
          1,
          Math.max(0, (window.scrollY - start) / Math.max(1, end - start)),
        );
        const tail = Math.max(0, (progress - 0.9) / 0.1);
        const easedProgress =
          progress < 0.9 ? progress : 0.9 + 0.1 * (tail + tail * tail - tail * tail * tail);
        targetTurn = motionPreference.matches ? 0 : easedProgress * Math.PI * 2;
        const elapsed = lastFrameTime ? Math.min(64, time - lastFrameTime) : 16;
        currentTurn += (targetTurn - currentTurn) * (1 - Math.exp(-elapsed / 90));
        if (Math.abs(targetTurn - currentTurn) < 0.001) currentTurn = targetTurn;
        bottle.rotation.set(-0.08, currentTurn, -0.1);

        const zoomProgress =
          entryStartedAt === null || motionPreference.matches
            ? 1
            : Math.min(1, (time - entryStartedAt) / 1400);
        const zoomEase = 1 - (1 - zoomProgress) ** 3;
        const scale = baseScale * (0.72 + 0.28 * zoomEase);
        bottle.scale.setScalar(scale);
        bottle.position.copy(modelCenter).multiplyScalar(-scale);
        if (zoomProgress === 1) entryStartedAt = null;
      }
      lastFrameTime = time;
      renderer.render(scene, camera);
      if (bottle && (currentTurn !== targetTurn || entryStartedAt !== null)) requestRender();
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const visibleHeight = 6.6;
      const aspect = width / height;
      camera.top = visibleHeight / 2;
      camera.bottom = -visibleHeight / 2;
      camera.left = (-visibleHeight * aspect) / 2;
      camera.right = (visibleHeight * aspect) / 2;
      camera.updateProjectionMatrix();
      requestRender();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('scroll', requestRender, { passive: true });
    motionPreference.addEventListener('change', requestRender);

    const loader = new GLTFLoader();
    loader.load(
      '/models/moss_mind_daily_focus_bottle.glb',
      (gltf) => {
        if (disposed) return;
        bottle = gltf.scene;
        const label = bottle.getObjectByName('Label');
        if (label instanceof THREE.Mesh && label.material instanceof THREE.MeshStandardMaterial) {
          const material = label.material.clone();
          material.color.set(0xffffff);
          if (material.map) {
            material.map = material.map.clone();
            material.map.repeat.y = -1;
            material.map.offset.y = 1;
            material.map.needsUpdate = true;
          }
          label.material = material;
        }
        const bounds = new THREE.Box3().setFromObject(bottle);
        bounds.getCenter(modelCenter);
        const height = bounds.getSize(new THREE.Vector3()).y;
        baseScale = 3 / height;
        entryStartedAt = motionPreference.matches ? null : performance.now();
        const initialScale = baseScale * (motionPreference.matches ? 1 : 0.72);
        bottle.scale.setScalar(initialScale);
        bottle.position.copy(modelCenter).multiplyScalar(-initialScale);
        scene.add(bottle);
        requestRender();
      },
      undefined,
      () => setUnavailable(true),
    );

    resize();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener('scroll', requestRender);
      motionPreference.removeEventListener('change', requestRender);
      if (frame) window.cancelAnimationFrame(frame);
      bottle?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) material.map?.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
    };
  }, [sectionRef]);

  return (
    <div
      className="about-bottle-stage"
      role="img"
      aria-label="3D Moss and Mind Daily Focus bottle that rotates as you scroll"
    >
      <div className="about-bottle-halo" aria-hidden="true" />
      <div className="about-bottle-ring about-bottle-ring-one" aria-hidden="true" />
      <div className="about-bottle-ring about-bottle-ring-two" aria-hidden="true" />
      {unavailable ? (
        <ProductIllustration className="about-bottle-fallback" name="Daily Focus" tone="sage" />
      ) : (
        <canvas ref={canvasRef} aria-hidden="true" />
      )}
      <span className="about-stage-caption">DAILY FOCUS / THE EVERYDAY EDIT</span>
      <span className="about-stage-prompt">SCROLL TO TURN THE BOTTLE &darr;</span>
    </div>
  );
}
