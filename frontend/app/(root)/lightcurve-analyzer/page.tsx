'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FitsUpload } from '@/components/FitsUpload';
import { TransitParametersDisplay } from '@/components/TransitParametersDisplay';
import { LightCurveMLResults } from '@/components/LightCurveMLResults';
import MainLoader from '@/components/MainLoader';
import { Download, Image, TrendingUp, Brain, CheckCircle } from 'lucide-react';

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  icon: any;
}

interface TransitParameters {
  t0: number;
  depth: number;
  duration: number;
  baseline: number;
}

interface MLInferenceResult {
  prediction: number[][];
  input_parameters: TransitParameters;
}

export default function LightCurveAnalyzerPage() {
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [lightCurveImage, setLightCurveImage] = useState<string | null>(null);
  const [transitParameters, setTransitParameters] = useState<TransitParameters | null>(null);
  const [mlResults, setMLResults] = useState<MLInferenceResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeProcessingSteps = (): ProcessingStep[] => [
    {
      id: 'upload',
      title: 'FITS File Processing',
      description: 'Analyzing pixel data and generating light curve',
      status: 'pending',
      icon: Image
    },
    {
      id: 'parameters',
      title: 'Transit Parameter Extraction',
      description: 'Fitting trapezoidal model to extract transit properties',
      status: 'pending',
      icon: TrendingUp
    },
    {
      id: 'inference',
      title: 'ML Model Inference',
      description: 'Predicting exoplanet probability using machine learning',
      status: 'pending',
      icon: Brain
    }
  ];

  const updateStepStatus = (stepId: string, status: ProcessingStep['status']) => {
    setProcessingSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const resetAnalysis = () => {
    setCurrentTaskId(null);
    setProcessingSteps(initializeProcessingSteps());
    setLightCurveImage(null);
    setTransitParameters(null);
    setMLResults(null);
    setIsProcessing(false);
    setError(null);
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      setProcessingSteps(initializeProcessingSteps());
      
      // Step 1: Upload and process FITS file
      updateStepStatus('upload', 'processing');
      
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/lightcurve/upload-fits', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload FITS file');
      }

      const uploadResult = await uploadResponse.json();
      const taskId = uploadResult.task_id;
      setCurrentTaskId(taskId);
      
      updateStepStatus('upload', 'completed');

      // Get the folded light curve image
      const imageResponse = await fetch(`/api/lightcurve/folded-image/${taskId}`);
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setLightCurveImage(imageUrl);
      }

      // Step 2: Extract transit parameters
      updateStepStatus('parameters', 'processing');
      
      const paramsResponse = await fetch(`/api/lightcurve/transit-parameters/${taskId}`, {
        method: 'POST',
      });

      if (!paramsResponse.ok) {
        throw new Error('Failed to extract transit parameters');
      }

      const paramsResult = await paramsResponse.json();
      setTransitParameters(paramsResult.parameters);
      updateStepStatus('parameters', 'completed');

      // Step 3: Run ML inference
      updateStepStatus('inference', 'processing');
      
      const inferenceResponse = await fetch(`/api/lightcurve/ml-inference/${taskId}`, {
        method: 'POST',
      });

      if (!inferenceResponse.ok) {
        throw new Error('Failed to run ML inference');
      }

      const inferenceResult = await inferenceResponse.json();
      setMLResults(inferenceResult.inference_results);
      updateStepStatus('inference', 'completed');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Mark current step as error
      const currentStep = processingSteps.find(step => step.status === 'processing');
      if (currentStep) {
        updateStepStatus(currentStep.id, 'error');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (lightCurveImage) {
      const link = document.createElement('a');
      link.href = lightCurveImage;
      link.download = 'folded_lightcurve.png';
      link.click();
    }
  };

  const getStatusColor = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500 animate-pulse';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing': return <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'error': return <div className="h-4 w-4 bg-red-600 rounded-full" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Light Curve Analyzer</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload FITS pixel files to generate light curves, extract transit parameters, 
          and use machine learning to predict exoplanet candidates.
        </p>
      </div>

      {error && (
        <Card className="border-red-500 bg-red-50 dark:bg-red-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
              <span className="text-xl">⚠️</span>
              <span className="font-medium">Error: {error}</span>
            </div>
            <Button 
              onClick={resetAnalysis} 
              variant="outline" 
              className="mt-4"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Upload FITS File</CardTitle>
          <CardDescription>
            Upload a .fits pixel file from Kepler, TESS, or similar space telescopes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FitsUpload 
            onFileUpload={handleFileUpload}
            isUploading={isProcessing}
            disabled={isProcessing}
          />
        </CardContent>
      </Card>

      {/* Processing Steps */}
      {processingSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Progress</CardTitle>
            <CardDescription>
              Real-time status of the light curve analysis pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <step.icon className="h-5 w-5" />
                      <h4 className="font-medium">{step.title}</h4>
                      <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Light Curve Image */}
      {lightCurveImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Folded Light Curve</span>
              <Button onClick={downloadImage} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardTitle>
            <CardDescription>
              Phase-folded light curve showing the transit signal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img 
                src={lightCurveImage} 
                alt="Folded Light Curve" 
                className="max-w-full h-auto rounded-lg border"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transit Parameters */}
      {transitParameters && (
        <TransitParametersDisplay parameters={transitParameters} />
      )}

      {/* ML Results */}
      {mlResults && transitParameters && (
        <LightCurveMLResults 
          prediction={mlResults.prediction}
          inputParameters={transitParameters}
        />
      )}

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center space-y-4">
            <MainLoader />
            <p className="text-lg font-medium">Processing your FITS file...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This may take a few minutes depending on file size
            </p>
          </div>
        </div>
      )}
    </div>
  );
}