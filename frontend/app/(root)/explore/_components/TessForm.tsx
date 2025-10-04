"use client";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/lib/api-config";

export default function TessForm() {
  const tessAccuracy = 94.22

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    pl_orbper: "",
    pl_trandurh: "",
    pl_trandep: "",
    pl_rade: "",
    pl_insol: "",
    pl_eqt: "",
    st_tmag: "",
    st_dist: "",
    st_teff: "",
    st_rad: "",
    st_logg: "",
  });

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const labels: { [key: string]: string } = {
    pl_orbper: "Planet Orbital Period [days]",
    pl_trandurh: "Planet Transit Duration [hours]",
    pl_trandep: "Planet Transit Depth [ppm]",
    pl_rade: "Planet Radius [R_Earth]",
    pl_insol: "Planet Insolation [Earth flux]",
    pl_eqt: "Planet Equilibrium Temperature [K]",
    st_tmag: "TESS Magnitude",
    st_dist: "Stellar Distance [pc]",
    st_teff: "Stellar Effective Temperature [K]",
    st_rad: "Stellar Radius [R_Sun]",
    st_logg: "Stellar log(g) [cm/s²]",
  };

  // Fetch TESS accuracy on component mount
  useEffect(() => {
    const fetchAccuracy = async () => {
      try {
        const response = await fetch(getApiUrl("/accuracy/tess"));
        const data = await response.json();
        if (data.accuracy !== undefined) {
          setAccuracy(data.accuracy);
        }
      } catch (err) {
        console.error("Failed to fetch TESS accuracy:", err);
      }
    };

    fetchAccuracy();
  }, []);

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
      const response = await fetch(getApiUrl("/inference/tess"), {
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
    <h2 className="text-3xl text-white font-semibold mb-4 text-center">TESS</h2>
  </div>
  <div>
    <h3 className="text-xl text-white font-light mb-4 text-center">Model Accuracy</h3>
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
        strokeDashoffset={2 * Math.PI * 48 * (1 - tessAccuracy / 100)}
        fill="transparent"
        r="48"
        cx="64"
        cy="64"
      />
    </svg>

    {/* Center text */}
    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
      {`${tessAccuracy.toFixed(2)}%`}
    </div>
  </div>

  </div>

</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
          {Object.keys(formData).map((key) => (
            <label key={key} className="block">
              <span className="block font-medium mb-1">{labels[key]}</span>
              <input
                type="number"
                step="any"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder=""
                className="border p-2 w-full rounded"
                required
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-none border-1 border-[#1b943b] text-[#1b943b] px-4 py-2 rounded w-full"
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
