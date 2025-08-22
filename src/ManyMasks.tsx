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
    /* subtle global invert control */
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
    /* keep a neutral fallback color for very bright backgrounds */
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
`;

const GlassEdgeReflection = styled(MaterialLayer)`
  z-index: 4;
  margin: calc(var(--total-strength) * -1);
  border-radius: calc(var(--corner-radius) + var(--total-strength));
  backdrop-filter: blur(var(--total-strength)) brightness(1.2) saturate(1.2);
  padding: var(--edge-width);
  border: var(--total-strength) solid transparent;
  mask:
    linear-gradient(white 0 0) padding-box,
    linear-gradient(white 0 0) content-box;
  mask-composite: exclude, exclude;
`;

const GlassEmbossReflection = styled(MaterialLayer)`
  backdrop-filter: blur(calc(var(--total-strength) * 1.5)) invert(0.25)
    brightness(1.11) saturate(1.2) hue-rotate(-10deg) contrast(2.3);
  padding: var(--emboss-width);
  border: 0 solid transparent;
  mask:
    linear-gradient(white 0 0) padding-box,
    linear-gradient(white 0 0) content-box;
  mask-composite: exclude, exclude;
`;

const GlassRefraction = styled(MaterialLayer)`
  backdrop-filter: invert(0.1) brightness(1.2) contrast(1.5);
  padding: var(--refraction-width);
  border: calc(var(--emboss-width)) solid transparent;
  mask:
    linear-gradient(white 0 0) padding-box,
    linear-gradient(white 0 0) content-box;
  mask-composite: exclude, exclude;
`;

const GlassBlur = styled(MaterialLayer)`
  backdrop-filter: blur(var(--extra-blur)) brightness(1.25);
  border-radius: calc(
    var(--corner-radius) - (var(--emboss-width) + var(--refraction-width))
  );
  margin: calc(var(--emboss-width) + var(--refraction-width));
`;

const BlendLayers = styled(MaterialLayer)`
  z-index: 3;
  backdrop-filter: blur(
    calc((var(--softness) * 0.2) + (var(--extra-blur) * 0.2))
  );
`;

const BlendEdge = styled(MaterialLayer)`
  z-index: 8;
  backdrop-filter: blur(calc(var(--edge-width) * 0.4)) contrast(1.6)
    saturate(1.5);
`;

const Highlight = styled(MaterialLayer)`
  z-index: 12;
  display: block;
  border-radius: var(--corner-radius);
  padding: 1px;
  border: 0 solid transparent;
  backdrop-filter: brightness(1.2) contrast(1.6) saturate(1.2) opacity(1);
  mask:
    linear-gradient(white 0 0) padding-box,
    linear-gradient(white 0 0) content-box;
  mask-composite: exclude, exclude;
`;

// const Tint = styled(MaterialLayer)`
//   z-index: 5; /* above edge/refraction, below blend-edge & highlight */
//   pointer-events: none;
//   background: linear-gradient(
//     135deg,
//     hsla(
//         var(--tint-hue),
//         calc(60% * var(--tint-saturation)),
//         60%,
//         calc(var(--tint-amount))
//       )
//       0%,
//     transparent 60%
//   );
//   mix-blend-mode: overlay;
//   opacity: calc(var(--tint-amount));
//   backdrop-filter: saturate(var(--tint-saturation)) hue-rotate(var(--tint-hue));
// `;

// const Contrast = styled(MaterialLayer)`
//   z-index: 9; /* just under highlight so highlights remain crisp */
//   pointer-events: none;
//   backdrop-filter: contrast(var(--contrast));
//   opacity: 1;
// `;

// const Brightness = styled(MaterialLayer)`
//   z-index: 11; /* just below the highlight */
//   pointer-events: none;
//   backdrop-filter: brightness(var(--brightness));
//   opacity: 1;
// `;

type Props = {
  children?: ReactNode;
};

export const ManyMasks = ({ children }: Props) => (
  <GlassContainer>
    <GlassContent>{children}</GlassContent>
    <GlassMaterial>
      <GlassEdgeReflection />
      <GlassEmbossReflection />
      <GlassRefraction />
      <GlassBlur />
      <BlendLayers />
      <BlendEdge />
      <Highlight />
      {/* <Tint />
      <Contrast />
      <Brightness /> */}
    </GlassMaterial>
  </GlassContainer>
);

export default ManyMasks;
