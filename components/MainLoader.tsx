"use client";
import { useEffect, useRef } from "react";

export default function MainLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starRef = useRef<HTMLDivElement | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const star = starRef.current;
    if (!canvas || !star) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function drawLightCurve() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#00aaff";
      ctx.shadowColor = "#00aaff";
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const phase = x / canvas.width;
        let brightness = 1.0;

        const center = 0.5;
        const width = 0.18;
        const depth = 0.4;

        if (Math.abs(phase - center) < width) {
          const d = (Math.cos((phase - center) / width * Math.PI) + 1) / 2;
          brightness = 1 - depth * d;
        }

        const currentPhase = (tRef.current % canvas.width) / canvas.width;
        if (Math.abs(currentPhase - center) < width) {
          const d = (Math.cos((currentPhase - center) / width * Math.PI) + 1) / 2;
          star.style.filter = `brightness(${0.6 + 0.4 * d})`;
        } else {
          star.style.filter = "brightness(1)";
        }

        const y = canvas.height * 0.75 - brightness * (canvas.height * 0.2);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      tRef.current = (tRef.current + 3) % canvas.width;
      requestAnimationFrame(drawLightCurve);
    }

    drawLightCurve();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      <div
        className="system"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={starRef}
          className="star"
          style={{
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, yellow 60%, orange 90%)",
            borderRadius: "50%",
            boxShadow: "0 0 100px 40px rgba(255, 200, 0, 0.7)",
            position: "relative",
            zIndex: 1,
            transition: "filter 0.2s ease",
          }}
        ></div>
        <div
          className="planet"
          style={{
            width: "40px",
            height: "40px",
            background: "radial-gradient(circle, #444 40%, #000 90%)",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            animation: "transit 6s linear infinite",
            zIndex: 2,
          }}
        ></div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          pointerEvents: "none",
          background: "transparent",
        }}
      ></canvas>

      <style jsx>{`
        @keyframes transit {
          from {
            left: -80px;
          }
          to {
            left: calc(100% + 80px);
          }
        }
      `}</style>
    </div>
  );
}
