import { ReactNode } from 'react';
import styled from '@emotion/styled';

const GlassContainer = styled.div`
  --corner-radius: 24px;
  --base-strength: 14px;
  --extra-blur: 2px;
  --softness: 12px;
  --tint-amount: 0;
  --tint-saturation: 2;
  --tint-hue: 180deg;
  --contrast: 1;
  --brightness: 1;
  --invert: 10%;

  --total-strength: calc(var(--base-strength) + var(--extra-blur));
  --edge-width: calc(0.3px + (var(--softness) * 0.1));
  --emboss-width: calc((var(--softness) * 0.38));
  --refraction-width: calc((var(--softness) * 0.3));

  position: relative;
  overflow: visible;
  pointer-events: none;
  padding: 18px;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 20;
    display: block;
    border-radius: var(--corner-radius);
    backdrop-filter: invert(var(--invert));
  }
`;

const GlassContent = styled.div`
  position: relative;
  display: block;
  z-index: 100;
  overflow: hidden;
  border-radius: var(--corner-radius);
  pointer-events: auto;
`;

const GlassMaterial = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: visible;
  pointer-events: none;

  &:after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    z-index: 3;
    overflow: hidden;
    border-radius: var(--corner-radius);
    background-color: rgba(128, 128, 128, 0);
  }

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 11;
    display: block;
    border-radius: var(--corner-radius);
    padding: 1px;
    border: 0 solid transparent;
    background: linear-gradient(
      155deg,
      hsla(0, 0%, 100%, 0.15) 0%,
      hsla(0, 0%, 0%, 0.2) 50%,
      hsla(0, 0%, 100%, 0.15) 100%
    );
    backdrop-filter: invert(0.15) opacity(1);
    mask:
      linear-gradient(white 0 0) padding-box,
      linear-gradient(white 0 0) content-box;
    mask-composite: exclude, exclude;
  }
`;

const MaterialLayer = styled.div`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border-radius: var(--corner-radius);
  z-index: 2;
  overflow: hidden;
  margin: 2px;
  padding: 2px;
  box-sizing: border-box;
`;

// Debug version: apply visible semi-transparent colors and borders so each
// overlapping role is obvious to the viewer.
const GlassEdgeReflection = styled(MaterialLayer)`
  z-index: 4;
  /* simplified debug: clear 1px red border */
  border: 1px solid rgba(255, 0, 0, 1);
  background: rgba(255, 0, 0, 0.06);
  backdrop-filter: blur(var(--extra-blur)) brightness(1.05);
`;

const GlassEmbossReflection = styled(MaterialLayer)`
  /* simplified debug: orange outline */
  border: 1px solid rgba(255, 128, 0, 1);
  background: rgba(255, 128, 0, 0.06);
  backdrop-filter: blur(calc(var(--extra-blur) * 1.2)) brightness(1.05);
`;

const GlassRefraction = styled(MaterialLayer)`
  /* simplified debug: green thin band */
  border: 1px solid rgba(0, 200, 120, 1);
  background: rgba(0, 200, 120, 0.05);
  backdrop-filter: brightness(1.02);
`;

const GlassBlur = styled(MaterialLayer)`
  /* simplified debug: blue interior blur */
  border: 1px dashed rgba(0, 120, 255, 1);
  background: rgba(0, 120, 255, 0.04);
  backdrop-filter: blur(var(--extra-blur)) brightness(1.1);
`;

const BlendLayers = styled(MaterialLayer)`
  z-index: 3;
  border: 1px solid rgba(160, 0, 255, 1);
  background: rgba(160, 0, 255, 0.04);
  backdrop-filter: blur(calc(var(--extra-blur) * 0.8));
`;

const BlendEdge = styled(MaterialLayer)`
  z-index: 8;
  border: 1px solid rgba(240, 240, 0, 1);
  background: rgba(240, 240, 0, 0.04);
  backdrop-filter: blur(calc(var(--extra-blur) * 0.6));
`;

const Highlight = styled(MaterialLayer)`
  z-index: 12;
  display: block;
  border: 1px solid rgba(0, 200, 255, 1);
  background: rgba(0, 200, 255, 0.06);
  backdrop-filter: brightness(1.15) contrast(1.3);
`;

const Badge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  pointer-events: none;
  color: white;
  mix-blend-mode: normal;
  opacity: 0.95;
`;

type Props = {
  children?: ReactNode;
};

export const ManyMasksDebug = ({ children }: Props) => (
  <GlassContainer>
    <GlassContent>{children}</GlassContent>
    <GlassMaterial>
      <GlassEdgeReflection>
        <Badge style={{ background: 'rgba(255,0,0,0.85)', left: '8px' }}>
          Edge
        </Badge>
      </GlassEdgeReflection>
      <GlassEmbossReflection>
        <Badge style={{ background: 'rgba(255,128,0,0.85)', left: '96px' }}>
          Emboss
        </Badge>
      </GlassEmbossReflection>
      <GlassRefraction>
        <Badge style={{ background: 'rgba(0,200,120,0.9)', left: '184px' }}>
          Refraction
        </Badge>
      </GlassRefraction>
      <GlassBlur>
        <Badge style={{ background: 'rgba(0,120,255,0.9)', left: '272px' }}>
          Blur
        </Badge>
      </GlassBlur>
      <BlendLayers>
        <Badge style={{ background: 'rgba(160,0,255,0.9)', left: '360px' }}>
          Blend
        </Badge>
      </BlendLayers>
      <BlendEdge>
        <Badge
          style={{
            background: 'rgba(240,240,0,0.95)',
            color: 'black',
            left: '8px',
            top: '32px',
          }}
        >
          Edge blend
        </Badge>
      </BlendEdge>
      <Highlight>
        <Badge
          style={{
            background: 'rgba(0,200,255,0.95)',
            left: '96px',
            top: '32px',
          }}
        >
          Highlight
        </Badge>
      </Highlight>
    </GlassMaterial>
  </GlassContainer>
);

export default ManyMasksDebug;
