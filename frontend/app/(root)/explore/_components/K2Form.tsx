"use client";
import { useState } from "react";

export default function K2Form() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    sy_snum: "",
    sy_pnum: "",
    discoverymethod: "",
    disc_facility: "",
    soltype: "",
    pl_controv_flag: "",
    pl_orbper: "",
    ttv_flag: "",
    st_rad: "",
    sy_dist: "",
    sy_vmag: "",
    sy_kmag: "",
    sy_gaiamag: "",
  });

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const labels: { [key: string]: string } = {
    sy_snum: "Number of Stars in System",
    sy_pnum: "number of Planets in System",
    discoverymethod: "Discovery Method",
    disc_facility: "Discovery Facility",
    soltype: "Solution Type",
    pl_controv_flag: "Controversial Flag",
    pl_orbper: "Planet Orbital Period [days]",
    ttv_flag: "transit Time Variations Flag",
    st_rad: "Stellar Radius [Solar Radius]",
    sy_dist: "System Distance [pc]",
    sy_vmag: "V (Johnson) Magnitude",
    sy_kmag: "Ks (2MASS) Magnitude",
    sy_gaiamag: "Gaia magnitude",
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
      const response = await fetch("http://127.0.0.1:8000/inference/k2", {
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
      <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder={labels[key]}
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
