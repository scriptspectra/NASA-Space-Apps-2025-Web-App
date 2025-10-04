"use client";
import { useState } from "react";
import { getApiUrl } from "@/lib/api-config";

export default function KeplerForm() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    koi_period: "",
    koi_time0bk: "",
    koi_impact: "",
    koi_duration: "",
    koi_depth: "",
    koi_model_snr: "",
    koi_prad: "",
    koi_teq: "",
    koi_insol: "",
    koi_steff: "",
    koi_slogg: "",
    koi_srad: "",
    koi_kepmag: "",
  });

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const keplerAccuracy = 96.97

  const labels: { [key: string]: string } = {
    koi_period: "Orbital Period [days]",
    koi_time0bk: "Transit Epoch [BKJD]",
    koi_impact: "Impact Parameter",
    koi_duration: "Transit Duration [hrs]",
    koi_depth: "Transit Depth [ppm]",
    koi_model_snr: "Transit Signal-to-Noise Ratio",
    koi_prad: "Planetary Radius [Earth radii]",
    koi_teq: "Equilibrium Temperature [K]",
    koi_insol: "Insolation Flux [Earth flux]",
    koi_steff: "Stellar Effective Temperature [K]",
    koi_slogg: "Stellar Surface Gravity [log10(cm/s**2)]",
    koi_srad: "Stellar Radius [Solar radii]",
    koi_kepmag: "Kepler Magnitude",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const values = Object.values(formData).map((v) => parseFloat(v));

    if (values.some((v) => isNaN(v))) {
      alert("Please fill all fields with valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(getApiUrl("/inference/kepler"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputs: {
            features: [values],
          },
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (data.status === "success") {
        setResult(JSON.stringify(data.outputs, null, 2));
      } else {
        setResult(`Error: ${data.detail || data.error}`);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setResult("❌ Error connecting to API");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto w-full">
<div className="flex gap-4 mb-5 w-full items-center p-4 justify-between mx-auto bg-black rounded-2xl shadow-lg">
  <div className="flex justify-start flex-col">
    <h2 className="text-3xl text-white font-semibold mb-4 text-center">Kepler</h2>
  </div>
  <div className="flex gap-4 items-center">
  <h2 className="font-light text-xl text-white mb-4 text-center">Model Accuracy</h2>
  <div className="relative w-32 h-32">
    {/* Background circle */}
    <svg className="w-32 h-32">
      <circle
        className="text-gray-700"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r="48"
        cx="64"
        cy="64"
      />
      {/* Progress circle */}
      <circle
        className="text-[#1b943b] transform -rotate-90 origin-center transition-all duration-1000"
        strokeWidth="8"
        stroke="currentColor"
        strokeDasharray={2 * Math.PI * 48}
        strokeDashoffset={2 * Math.PI * 48 * (1 - keplerAccuracy / 100)}
        fill="transparent"
        r="48"
        cx="64"
        cy="64"
      />
    </svg>

    {/* Center text */}
    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
      {`${keplerAccuracy.toFixed(2)}%`}
    </div>
  </div>
  </div>
</div>
      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <label key={key} className="block">
              <span className="block font-medium mb-1">{labels[key]}</span>
              <input
                type="number"
                step="any"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder=''
                className="border p-2 w-full rounded"
                required
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-none border-1 border-[#D4481E] text-[#D4481E] px-4 py-2 rounded w-full"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded whitespace-pre-wrap">
          <strong>Prediction Result:</strong>
          <pre className="mt-2 text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
}
