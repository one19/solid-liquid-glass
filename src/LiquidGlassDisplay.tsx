import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

type LiquidGlassDisplayProps = {
  width?: number;
  height?: number;
  className?: string;
};

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const STAR_COUNT = 18;
const CIRCLE_COUNT = 8;

const drawStar = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  n: number,
  inset: number,
  color: string,
) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - r);
  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r);
  }
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
};

const LiquidGlassContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LiquidGlassRoot = styled.div`
  position: relative;
  width: 900px;
  height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LiquidGlassBG = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const LiquidGlassCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

type LiquidGlassDisplayAllProps = LiquidGlassDisplayProps & {
  children?: React.ReactNode;
};

export const LiquidGlassDisplay = ({
  width = 800,
  height = 500,
  className,
  children,
}: LiquidGlassDisplayAllProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circles = useRef(
    Array.from({ length: CIRCLE_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(40, 120),
      dx: randomBetween(-0.2, 0.2),
      dy: randomBetween(-0.2, 0.2),
      color: `rgba(255,255,255,${randomBetween(0.04, 0.12)})`,
      blur: randomBetween(12, 32),
    })),
  );
  const stars = useRef(
    Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(10, 28),
      dx: randomBetween(-0.12, 0.12),
      dy: randomBetween(-0.12, 0.12),
      n: Math.floor(randomBetween(5, 7)),
      inset: randomBetween(0.4, 0.7),
      color: `#fff`,
      alpha: randomBetween(0.12, 0.28),
    })),
  );

  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Draw circles
      for (const c of circles.current) {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.shadowColor = c.color;
        ctx.shadowBlur = c.blur;
        ctx.fill();
        ctx.restore();
        c.x += c.dx;
        c.y += c.dy;
        if (c.x < -c.r) c.x = width + c.r;
        if (c.x > width + c.r) c.x = -c.r;
        if (c.y < -c.r) c.y = height + c.r;
        if (c.y > height + c.r) c.y = -c.r;
      }
      // Draw stars
      for (const s of stars.current) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        drawStar(ctx, s.x, s.y, s.r, s.n, s.inset, s.color);
        ctx.restore();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < -s.r) s.x = width + s.r;
        if (s.x > width + s.r) s.x = -s.r;
        if (s.y < -s.r) s.y = height + s.r;
        if (s.y > height + s.r) s.y = -s.r;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <LiquidGlassRoot className={className}>
      <LiquidGlassBG>
        <LiquidGlassCanvas ref={canvasRef} width={width} height={height} />
      </LiquidGlassBG>
      {children && <LiquidGlassContent>{children}</LiquidGlassContent>}
    </LiquidGlassRoot>
  );
};
