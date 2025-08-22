import { useState } from 'react';
import styled from '@emotion/styled';

// A small, self-contained Emotion/TSX rewrite of https://codepen.io/Avean/pen/QwjyXrr
// Use this component directly in a page to preview the effect.

const Glass = styled.div`
  position: relative;
  width: 320px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 8px 30px rgba(10, 10, 10, 0.35),
    inset 0 -8px 40px rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px) saturate(1.12);
  cursor: pointer;
`;

const DistortLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  /* subtle layered textures so the SVG displacement has something to push */
  background-image:
    radial-gradient(
      1200px 200px at 10% 10%,
      rgba(255, 255, 255, 0.06),
      transparent 10%
    ),
    radial-gradient(
      800px 160px at 90% 80%,
      rgba(0, 0, 0, 0.06),
      transparent 8%
    ),
    linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.04));
  mix-blend-mode: overlay;
  filter: url(#glass-distortion);
  opacity: 1;

  /* stronger micro-texture layer to give displacement more to act on */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(0, 0, 0, 0.02) 100%
    );
    mix-blend-mode: overlay;
    filter: url(#glass-distortion);
    opacity: 0.9;
    pointer-events: none;
  }
`;

const Gloss = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;

  /* edge highlight */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    padding: 1px;
    background: linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(0, 0, 0, 0.14) 50%,
      rgba(255, 255, 255, 0.12) 100%
    );
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0) content-box;
    mask-composite: exclude;
    opacity: 0.9;
  }
`;

const Label = styled.span`
  position: relative;
  z-index: 10;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 20px;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06),
    0 6px 30px rgba(0, 0, 0, 0.45);
`;

const HiddenSVG = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
`;

export const CodepenLiquidGlass = () => {
  const initial = { baseFrequency: 0.035, numOctaves: 3, scale: 10 };
  const [clicks, setClicks] = useState(0);

  const baseFrequency = (initial.baseFrequency + clicks * 0.01).toFixed(3);
  const numOctaves = initial.numOctaves + clicks;
  const scale = initial.scale + clicks;

  return (
    <>
      <HiddenSVG aria-hidden>
        <filter id="glass-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            result="turbulence"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </HiddenSVG>

      <Glass
        onClick={() => setClicks((c) => c + 1)}
        title="Click to increase distortion"
      >
        <DistortLayer aria-hidden />
        <Gloss aria-hidden />
        <Label>Glass?</Label>
      </Glass>
    </>
  );
};

export default CodepenLiquidGlass;
