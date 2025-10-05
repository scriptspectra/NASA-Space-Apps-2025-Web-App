"use client";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/lib/api-config";

export default function TessForm() {
  const tessAccuracy = 95.48

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    pl_orbper: "",
    pl_trandurh: "",
    pl_trandep: "",
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
    setResult(""); // Clear previous results

    const values = Object.values(formData).map((v) => parseFloat(v));

    if (values.some((v) => isNaN(v))) {
      alert("Please fill all fields with valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = getApiUrl("/inference/tess");
      // Create a 2D array with a single sample as required by the model
      const features = [values];  // Wrap values in an array to make it 2D
      console.log("Sending request to:", apiUrl);
      console.log("Input features shape:", `${features.length}x${features[0].length}`);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            features: features,  // Send the 2D array
          },
        }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (data.status === "success") {
        setResult(JSON.stringify(data.outputs, null, 2));
      } else {
        setResult(`Error: ${data.detail || data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setResult(`❌ Error: ${error instanceof Error ? error.message : "Failed to connect to API"}`);
    }

    setLoading(false);
  };

  return (
  <div className="p-4 max-w-xl mx-auto w-full">
<div className="flex gap-4 mb-5 w-full items-center p-4 justify-between mx-auto dark:bg-black bg-[#cecbbb] text-white dark:text-black rounded-2xl shadow-lg">
  <div className="flex justify-start flex-col">
    <h3 className="text-xl dark:text-white text-black font-light mb-4 text-center">Model Accuracy</h3>
    <h2 className="text-3xl dark:text-white text-black font-semibold mb-4 text-center">TESS</h2>
  </div>
  <div>
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
        className="dark:text-[#1b943b] text-[#163e96] transform -rotate-90 origin-center transition-all duration-1000"
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
    <div className="absolute inset-0 flex items-center justify-center text-black dark:text-white font-bold text-xl">
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
        <div className="mt-6 p-6 border rounded-lg bg-white dark:bg-[#1F1F1F] shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Prediction Result</h3>
          {(() => {
            try {
              const data = JSON.parse(result);
              const label = data.label[0];
              const probabilities = data.probabilities[0];
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg">
                    <span className="font-medium">Prediction:</span>
                    <span className={`font-bold ${label === 1 ? 'text-[#1b943b]' : 'text-red-500'}`}>
                      {label === 1 ? 'Confirmed Exoplanet' : 'False Positive'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Confidence Scores:</h4>
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span>Confirmed Exoplanet</span>
                          <span className="font-mono">{(probabilities["1"] * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1b943b] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${probabilities["1"] * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span>False Positive</span>
                          <span className="font-mono">{(probabilities["0"] * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${probabilities["0"] * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } catch (error) {
              return (
                <div className="text-red-500">
                  {result}
                </div>
              );
            }
          })()}
        </div>
      )}
    </div>
  );
}
