"use client";

import { useEffect, useRef } from "react";

export default function LightCurvePage() {
  const plotRef = useRef<HTMLDivElement | null>(null);
  const planetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const limbDarkenedFlux = (
      rp: number,
      u1: number,
      u2: number,
      inTransit: boolean
    ) => {
      if (!inTransit) return 1.0;
      const area = Math.PI * rp * rp;
      const avgIntensity = 1 - u1 * 0.5 - u2 * 0.33;
      return 1 - area * avgIntensity;
    };

    const generate = () => {
      const period = parseFloat(
        (document.getElementById("period") as HTMLInputElement).value
      );
      const rp = parseFloat(
        (document.getElementById("rp") as HTMLInputElement).value
      );
      const noiseLevel = parseFloat(
        (document.getElementById("noise") as HTMLInputElement).value
      );
      const u1 = parseFloat(
        (document.getElementById("u1") as HTMLInputElement).value
      );
      const u2 = parseFloat(
        (document.getElementById("u2") as HTMLInputElement).value
      );

      (document.getElementById("periodVal") as HTMLElement).innerText =
        period.toString();
      (document.getElementById("rpVal") as HTMLElement).innerText = rp.toString();
      (document.getElementById("noiseVal") as HTMLElement).innerText =
        noiseLevel.toString();
      (document.getElementById("u1Val") as HTMLElement).innerText = u1.toString();
      (document.getElementById("u2Val") as HTMLElement).innerText = u2.toString();

      if (planetRef.current) {
        const planetSize = 200 * rp;
        planetRef.current.style.width = `${planetSize}px`;
        planetRef.current.style.height = `${planetSize}px`;
        planetRef.current.style.top = `${100 - planetSize / 2}px`;
        planetRef.current.style.animationDuration = `${period / 2}s`;
      }

      const t: number[] = [];
      const flux: number[] = [];
      for (let i = -period; i <= period; i += 0.05) {
        t.push(i);
        const inTransit = Math.abs(i) < 0.5;
        let f = limbDarkenedFlux(rp, u1, u2, inTransit);
        f += (Math.random() - 0.5) * 2 * noiseLevel;
        flux.push(f);
      }

      const Plotly = (window as any).Plotly;
      if (Plotly && plotRef.current) {
        Plotly.newPlot(
          plotRef.current,
          [
            {
              x: t,
              y: flux,
              mode: "lines",
              line: { color: "cyan" },
            },
          ],
          {
            paper_bgcolor: "black",
            plot_bgcolor: "black",
            font: { color: "white" },
            title: "Simulated Light Curve (with Limb Darkening)",
            xaxis: { title: "Time (days)" },
            yaxis: { title: "Relative Flux", range: [0.8, 1.05] },
          }
        );
      }
    };

    const bindSliders = () => {
      document
        .querySelectorAll("input[type=range]")
        .forEach((slider) =>
          slider.addEventListener("input", () => generate())
        );
    };

    const loadPlotly = async () => {
      if (typeof window !== "undefined" && !(window as any).Plotly) {
        const script = document.createElement("script");
        script.src = "https://cdn.plot.ly/plotly-latest.min.js";
        script.async = true;
        script.onload = () => {
          setTimeout(() => {
            generate();
            bindSliders();
          }, 0);
        };
        document.body.appendChild(script);
      } else {
        setTimeout(() => {
          generate();
          bindSliders();
        }, 0);
      }
    };

    loadPlotly();

    (window as any).downloadCSV = () => {
      const period = parseFloat(
        (document.getElementById("period") as HTMLInputElement).value
      );
      const rp = parseFloat(
        (document.getElementById("rp") as HTMLInputElement).value
      );
      const noiseLevel = parseFloat(
        (document.getElementById("noise") as HTMLInputElement).value
      );
      const u1 = parseFloat(
        (document.getElementById("u1") as HTMLInputElement).value
      );
      const u2 = parseFloat(
        (document.getElementById("u2") as HTMLInputElement).value
      );

      const t: number[] = [];
      const flux: number[] = [];
      for (let i = -period; i <= period; i += 0.05) {
        t.push(i);
        const inTransit = Math.abs(i) < 0.5;
        let f = limbDarkenedFlux(rp, u1, u2, inTransit);
        f += (Math.random() - 0.5) * 2 * noiseLevel;
        flux.push(f);
      }

      let csv = "time,flux\n";
      for (let i = 0; i < t.length; i++) {
        csv += `${t[i]},${flux[i]}\n`;
      }

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "light_curve.csv";
      a.click();
    };

    (window as any).downloadPNG = () => {
      const Plotly = (window as any).Plotly;
      if (Plotly && plotRef.current) {
        Plotly.downloadImage(plotRef.current, {
          format: "png",
          filename: "light_curve",
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0d0d0d] text-white p-8">
      <h1 className="mt-6 mb-4 text-3xl font-bold text-blue-400">
        🌌 Light Curve Simulator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl w-full p-5">
        {/* Controls */}
        <div className="bg-[#1a1a1a] p-5 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Parameters</h2>

          {[
            { id: "period", label: "Period (days)", min: 1, max: 10, step: 0.1, valId: "periodVal", defaultVal: 5 },
            { id: "rp", label: "Rp/Rs", min: 0.05, max: 0.3, step: 0.01, valId: "rpVal", defaultVal: 0.1 },
            { id: "noise", label: "Noise Level", min: 0, max: 0.05, step: 0.005, valId: "noiseVal", defaultVal: 0 },
            { id: "u1", label: "Limb darkening u1", min: 0, max: 1, step: 0.05, valId: "u1Val", defaultVal: 0.3 },
            { id: "u2", label: "Limb darkening u2", min: 0, max: 1, step: 0.05, valId: "u2Val", defaultVal: 0.2 },
          ].map(({ id, label, min, max, step, valId, defaultVal }) => (
            <div key={id} className="mb-4">
              <label className="block mb-1">
                {label}: <span id={valId}>{defaultVal}</span>
              </label>
              <input
                type="range"
                id={id}
                min={min}
                max={max}
                step={step}
                defaultValue={defaultVal}
                className="w-full h-2 rounded-lg appearance-none bg-gray-700 accent-blue-600 cursor-pointer"
                style={{ accentColor: "#2563eb" }}
              />
            </div>
          ))}

          {/* Buttons aligned side by side */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => (window as any).downloadCSV()}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:opacity-75 font-bold"
            >
              ⬇ Download CSV
            </button>
            <button
              onClick={() => (window as any).downloadPNG()}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:opacity-75 font-bold"
            >
              ⬇ Download PNG
            </button>
          </div>
        </div>

        {/* Plot + Animation */}
        <div className="col-span-2 bg-[#1a1a1a] p-5 rounded-2xl shadow-lg">
          <div ref={plotRef} className="w-full h-[400px]" />
          <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-700 mx-auto mt-8 overflow-hidden">
            <div
              ref={planetRef}
              id="planet"
              className="absolute bg-blue-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
