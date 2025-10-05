'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LightCurveMLResultsProps {
  prediction: any; // The full inference_results object
  inputParameters: {
    t0: number;
    depth: number;
    duration: number;
    baseline: number;
  };
}

export function LightCurveMLResults({ prediction, inputParameters }: LightCurveMLResultsProps) {
  // Handle different response formats from the ML API
  let exoplanetProbability = 0.5;
  let notExoplanetProbability = 0.5;
  
  try {
    console.log('🔍 Raw prediction data:', prediction);
    
    // Check for the expected format: { output_probability: [{"0": prob0, "1": prob1}] }
    if (prediction && prediction.output_probability && Array.isArray(prediction.output_probability)) {
      const probData = prediction.output_probability[0];
      if (probData && typeof probData === 'object') {
        notExoplanetProbability = parseFloat(probData['0'] || '0.5');
        exoplanetProbability = parseFloat(probData['1'] || '0.5');
        console.log('✅ Parsed probabilities:', { notExoplanet: notExoplanetProbability, exoplanet: exoplanetProbability });
      }
    }
    // Fallback: check if it's a direct array format
    else if (Array.isArray(prediction) && prediction.length > 0) {
      const probabilities = prediction[0];
      if (Array.isArray(probabilities) && probabilities.length >= 2) {
        notExoplanetProbability = probabilities[0];
        exoplanetProbability = probabilities[1];
        console.log('✅ Parsed array probabilities:', { notExoplanet: notExoplanetProbability, exoplanet: exoplanetProbability });
      }
    }
    // Another fallback: check for direct probability object
    else if (prediction && typeof prediction === 'object') {
      if ('0' in prediction && '1' in prediction) {
        notExoplanetProbability = parseFloat(prediction['0']);
        exoplanetProbability = parseFloat(prediction['1']);
        console.log('✅ Parsed direct probabilities:', { notExoplanet: notExoplanetProbability, exoplanet: exoplanetProbability });
      }
    }
  } catch (error) {
    console.error('❌ Error parsing prediction data:', error);
    console.log('📊 Prediction data:', prediction);
    // Use default values of 50/50
  }
  
  const isExoplanet = exoplanetProbability > notExoplanetProbability;
  const confidence = Math.max(exoplanetProbability, notExoplanetProbability) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-purple-600">🤖</span>
          Machine Learning Prediction
        </CardTitle>
        <CardDescription>
          ML model analysis based on extracted transit parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prediction Result */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <Badge 
              variant={isExoplanet ? "default" : "destructive"}
              className={`text-lg px-4 py-2 ${
                isExoplanet 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isExoplanet ? '✓ Exoplanet Candidate' : '✗ False Positive'}
            </Badge>
          </div>
          
          <div className="text-2xl font-bold">
            {confidence.toFixed(1)}% Confidence
          </div>
        </div>

        {/* Confidence Bars */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Exoplanet Probability</span>
              <span>{(exoplanetProbability * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${exoplanetProbability * 100}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>False Positive Probability</span>
              <span>{(notExoplanetProbability * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${notExoplanetProbability * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Input Parameters Summary */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-3 text-sm">Input Parameters Used:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-medium">Transit Midpoint:</span>
              <br />
              <span className="text-gray-600">{inputParameters.t0.toFixed(6)} days</span>
            </div>
            <div>
              <span className="font-medium">Transit Depth:</span>
              <br />
              <span className="text-gray-600">{inputParameters.depth.toFixed(6)}</span>
            </div>
            <div>
              <span className="font-medium">Duration:</span>
              <br />
              <span className="text-gray-600">{inputParameters.duration.toFixed(6)} days</span>
            </div>
            <div>
              <span className="font-medium">Baseline:</span>
              <br />
              <span className="text-gray-600">{inputParameters.baseline.toFixed(6)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}