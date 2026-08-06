"use client";

import { useEffect, useRef, useState } from "react";

type MatrixSettings = {
  speed: number;
  density: number;
  opacity: number;
  trailLength: number;
  reducedMotion: boolean;
};

type MatrixDrop = {
  x: number;
  y: number;
  speed: number;
  character: string;
  brightness: number;
  trail: number[];
};

const STORAGE_KEY = "portfolio:rain";
const SETTINGS_EVENT = "rain-settings";
const FONT_SIZE = 16;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/+*#$%&@";

const defaultSettings: MatrixSettings = {
  speed: 1,
  density: 0.6,
  opacity: 0.55,
  trailLength: 8,
  reducedMotion: false,
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

function sanitizeSettings(value: Partial<MatrixSettings>): MatrixSettings {
  return {
    speed: clamp(typeof value.speed === "number" ? value.speed : defaultSettings.speed, 0.2, 3),
    density: clamp(typeof value.density === "number" ? value.density : defaultSettings.density, 0.2, 1),
    opacity: clamp(typeof value.opacity === "number" ? value.opacity : defaultSettings.opacity, 0, 1),
    trailLength: Math.round(clamp(
      typeof value.trailLength === "number" ? value.trailLength : defaultSettings.trailLength,
      0,
      20,
    )),
    reducedMotion:
      typeof value.reducedMotion === "boolean"
        ? value.reducedMotion
        : defaultSettings.reducedMotion,
  };
}

function readSavedSettings(): MatrixSettings {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return sanitizeSettings(JSON.parse(saved) as Partial<MatrixSettings>);
  } catch {
    // Storage can be unavailable in privacy-focused browser contexts.
  }

  return defaultSettings;
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef<MatrixSettings>(defaultSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let previousTime = 0;
    let resumedFromPause = false;
    let columnCount = 0;
    let drops: MatrixDrop[] = [];

    const makeDrop = (): MatrixDrop => ({
      x: FONT_SIZE * Math.floor(Math.random() * columnCount),
      y: -(window.innerHeight / FONT_SIZE) * Math.random(),
      speed: 0.4 + Math.random() * 1.2,
      character: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
      brightness: 0.7 + Math.random() * 0.3,
      trail: [],
    });

    const rebuildDrops = () => {
      const dropCount = Math.max(4, Math.floor(columnCount * settingsRef.current.density));
      drops = Array.from({ length: dropCount }, makeDrop);
    };

    const resize = () => {
      const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      columnCount = Math.max(8, Math.ceil(window.innerWidth / FONT_SIZE));
      rebuildDrops();
    };

    const applySettings = (event: Event) => {
      const detail = (event as CustomEvent<Partial<MatrixSettings>>).detail;
      if (!detail) return;

      const previousDensity = settingsRef.current.density;
      settingsRef.current = sanitizeSettings({ ...settingsRef.current, ...detail });
      canvas.style.opacity = String(settingsRef.current.opacity);

      if (previousDensity !== settingsRef.current.density) rebuildDrops();
    };

    const draw = (time: number) => {
      if (!previousTime) previousTime = time;
      const elapsed = Math.min(64, time - previousTime);
      previousTime = time;

      const { reducedMotion, speed, trailLength } = settingsRef.current;
      if (reducedMotion) {
        resumedFromPause = true;
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      if (resumedFromPause) {
        resumedFromPause = false;
        previousTime = time;
      }

      context.fillStyle = "#080a0d";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = `${FONT_SIZE}px ui-monospace, "JetBrains Mono", monospace`;
      context.textBaseline = "top";

      for (let index = 0; index < drops.length; index += 1) {
        const drop = drops[index];
        drop.y += drop.speed * (elapsed / 16) * speed * 0.5;
        const headY = FONT_SIZE * drop.y;

        if (trailLength > 0) {
          drop.trail.forEach((trailY, trailIndex) => {
            const y = FONT_SIZE * trailY;
            if (y < -FONT_SIZE || y > window.innerHeight + FONT_SIZE) return;

            const alpha = Math.max(0.03, (trailIndex / drop.trail.length) * 0.4);
            context.fillStyle = `rgba(61, 139, 253, ${alpha})`;
            context.fillText(drop.character, drop.x, y);
          });
        }

        if (headY > -FONT_SIZE && headY < window.innerHeight + FONT_SIZE) {
          context.fillStyle = `rgba(111, 179, 255, ${0.75 * drop.brightness})`;
          context.fillText(drop.character, drop.x, headY);
        }

        drop.trail.push(drop.y);
        if (drop.trail.length > trailLength) drop.trail.shift();
        if (headY > window.innerHeight + 48) drops[index] = makeDrop();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const savedSettings = readSavedSettings();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    settingsRef.current = {
      ...savedSettings,
      reducedMotion: savedSettings.reducedMotion || prefersReducedMotion,
    };
    canvas.style.opacity = String(settingsRef.current.opacity);

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener(SETTINGS_EVENT, applySettings);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener(SETTINGS_EVENT, applySettings);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain-canvas" aria-hidden="true" />;
}

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formattedValue: string;
  onChange: (value: number) => void;
};

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  formattedValue,
  onChange,
}: RangeControlProps) {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <label className="matrix-range">
      <span className="matrix-range-copy">
        <span>{label}</span>
        <output>{formattedValue}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--blue) 0%, var(--blue) ${progress}%, var(--line-bright) ${progress}%, var(--line-bright) 100%)`,
        }}
        aria-label={label}
      />
    </label>
  );
}

export function MatrixControls() {
  const [settings, setSettings] = useState<MatrixSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = readSavedSettings();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialSettings = {
      ...savedSettings,
      reducedMotion: savedSettings.reducedMotion || prefersReducedMotion,
    };

    const animationFrame = window.requestAnimationFrame(() => {
      setSettings(initialSettings);
      window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: initialSettings }));
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const updateSettings = (partial: Partial<MatrixSettings>) => {
    const nextSettings = sanitizeSettings({ ...settings, ...partial });
    setSettings(nextSettings);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
    } catch {
      // The controls remain functional even when storage is unavailable.
    }

    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: nextSettings }));
  };

  return (
    <div className="matrix-controls">
      <div className="matrix-switch-row">
        <span>rain.reduced-motion</span>
        <button
          type="button"
          role="switch"
          aria-checked={settings.reducedMotion}
          aria-label="Reduce motion"
          className={settings.reducedMotion ? "matrix-switch is-active" : "matrix-switch"}
          onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
        >
          <span />
        </button>
      </div>

      <RangeControl
        label="rain.speed"
        value={settings.speed}
        min={0.2}
        max={3}
        step={0.1}
        formattedValue={`${settings.speed.toFixed(1)}x`}
        onChange={(speed) => updateSettings({ speed })}
      />
      <RangeControl
        label="rain.density"
        value={settings.density}
        min={0.2}
        max={1}
        step={0.05}
        formattedValue={`${Math.round(settings.density * 100)}%`}
        onChange={(density) => updateSettings({ density })}
      />
      <RangeControl
        label="rain.opacity"
        value={settings.opacity}
        min={0}
        max={1}
        step={0.05}
        formattedValue={`${Math.round(settings.opacity * 100)}%`}
        onChange={(opacity) => updateSettings({ opacity })}
      />
      <RangeControl
        label="rain.trail-length"
        value={settings.trailLength}
        min={0}
        max={20}
        step={1}
        formattedValue={settings.trailLength === 0 ? "off" : `${settings.trailLength} chars`}
        onChange={(trailLength) => updateSettings({ trailLength })}
      />
    </div>
  );
}
