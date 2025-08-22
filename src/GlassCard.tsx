import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// Emotion/TSX rewrite of the provided HTML/CSS "Liquid Glass Card" snippet
// Single-file component that you can import and render in the app for preview.

const floatDistort = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const HiddenSVG = styled.svg`
  display: none;
`;

const Card = styled.div`
  --bg-color: rgba(255, 255, 255, 0.05);
  --highlight: rgba(255, 255, 255, 0.25);
  --text: #ffffff;

  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
`;

const FilterLayer = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 1;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* only blur/backdrop here now; the displacement filter will be applied to the texture layer */
`;

const DistortionOverlay = styled.div`
  position: absolute;
  inset: -35px;
  border-radius: inherit;
  background:
    radial-gradient(
      circle at 20% 30%,
      rgba(255, 255, 255, 0.06) 0%,
      purple,
      transparent 80%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(255, 255, 255, 0.06) 0%,
      transparent 80%
    );
  background-size: 300% 300%;
  animation: ${floatDistort} 10s infinite ease-in-out;
  mix-blend-mode: overlay;
  z-index: 3; /* sit above the milky overlay so displacement is visible */
  /* apply displacement filter to the animated texture so it visibly warps */
  filter: url(#glass-distortion) saturate(1.2) brightness(1.15);
  pointer-events: none;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 2;
  background: var(--bg-color);
`;

const Specular = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: 4;
  box-shadow: inset 1px 1px 1px var(--highlight);
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 5;
  padding: 20px;
  color: var(--text);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: 600;
`;

const Desc = styled.p`
  margin: 0;
  opacity: 0.8;
`;

export const GlassCard = () => (
  <>
    <HiddenSVG aria-hidden>
      <filter id="glass-distortion">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.008"
          numOctaves="2"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
      </filter>
    </HiddenSVG>

    <Card>
      <FilterLayer />
      <DistortionOverlay />
      <Overlay />
      <Specular />
      <Content>
        <Title>Liquid Glass Card</Title>
        <Desc>Modern glassmorphism with distortion effects</Desc>
      </Content>
    </Card>
  </>
);

export default GlassCard;
