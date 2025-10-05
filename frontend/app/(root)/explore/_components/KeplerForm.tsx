"use client";
import { useState } from "react";
import { getApiUrl } from "@/lib/api-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CSVUpload } from "@/components/CSVUpload";
import { InferenceResultsTable } from "@/components/InferenceResultsTable";

export default function KeplerForm() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    koi_period: "",
    koi_time0bk: "",
    koi_impact: "",
    koi_duration: "",
    koi_depth: "",
    koi_model_snr: "",
    koi_steff: "",
    koi_slogg: "",
    koi_srad: "",
    koi_kepmag: "",
  });

  const [result, setResult] = useState<string>("");
  const [batchResults, setBatchResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const keplerAccuracy = 97.34;

  const labels: { [key: string]: string } = {
    koi_period: "Orbital Period [days]",
    koi_time0bk: "Transit Epoch [BKJD]",
    koi_impact: "Impact Parameter",
    koi_duration: "Transit Duration [hrs]",
    koi_depth: "Transit Depth [ppm]",
    koi_model_snr: "Transit Signal-to-Noise Ratio",
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

  const handleCSVData = async (data: Array<Record<string, string>>) => {
    setLoading(true);
    setBatchResults([]);

    try {
      // Process each row from the CSV
      const results = await Promise.all(
        data.map(async (row) => {
          // Convert the row values to the format expected by the API
          const values = Object.keys(formData).map(
            (key) => parseFloat(row[key] || "0")
          );

          const response = await fetch(getApiUrl("/inference/kepler"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              inputs: {
                features: [values],
              },
            }),
          });

          const result = await response.json();
          return {
            input: row,
            output: result.outputs,
          };
        })
      );

      setBatchResults(results);
    } catch (error) {
      console.error("❌ Batch processing error:", error);
      alert("Error processing CSV data. Please check the console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto w-full">
<div className="flex gap-4 mb-5 w-full items-center p-4 justify-between mx-auto dark:bg-black bg-[#cecbbb] rounded-2xl shadow-lg">
  <div className="flex justify-start flex-col">
  <h2 className="font-light text-xl dark:text-white text-black mb-4 text-center">Model Accuracy</h2>
    <h2 className="text-3xl dark:text-white text-black font-semibold mb-4 text-center ">Kepler</h2>
  </div>
  <div className="flex gap-4 items-center">
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
        strokeDashoffset={2 * Math.PI * 48 * (1 - keplerAccuracy / 100)}
        fill="transparent"
        r="48"
        cx="64"
        cy="64"
      />
    </svg>

    {/* Center text */}
    <div className="absolute inset-0 flex items-center justify-center dark:text-white text-black font-bold text-xl">
      {`${keplerAccuracy.toFixed(2)}%`}
    </div>
  </div>
  </div>
</div>
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="form" className="w-full">
            Input Form
          </TabsTrigger>
          <TabsTrigger value="csv" className="w-full">
            CSV Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
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
              className="bg-none border-1 border-[#2563EB] text-[#2563EB] px-4 py-2 rounded w-full"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </form>
        </TabsContent>

        <TabsContent value="csv">
          <div className="space-y-6">
            <CSVUpload
              onDataParsed={handleCSVData}
              expectedHeaders={Object.keys(formData)}
            />
            {loading && <div className="text-center">Processing CSV data...</div>}
            {batchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Batch Results</h3>
                <InferenceResultsTable
                  results={batchResults}
                  modelType="kepler"
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

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
                    <span className={`font-bold ${label === 1 ? 'text-[#2563EB]' : 'text-red-500'}`}>
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
                            className="bg-[#2563EB] h-2 rounded-full transition-all duration-500"
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

                  <div className="mt-4 p-4 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      This prediction is based on the Kepler model with {keplerAccuracy.toFixed(2)}% accuracy.
                    </p>
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
