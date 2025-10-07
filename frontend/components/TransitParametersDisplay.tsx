'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TransitParameter {
  name: string;
  value: number;
  unit: string;
  description: string;
}

interface TransitParametersDisplayProps {
  parameters: {
    t0: number;
    depth: number;
    duration: number;
    baseline: number;
  };
}

export function TransitParametersDisplay({ parameters }: TransitParametersDisplayProps) {
  const parameterList: TransitParameter[] = [
    {
      name: 'Transit Midpoint (t0)',
      value: parameters.t0,
      unit: 'days',
      description: 'The time when the planet is directly in front of the star'
    },
    {
      name: 'Transit Depth',
      value: parameters.depth,
      unit: 'fraction',
      description: 'The fractional decrease in brightness during transit'
    },
    {
      name: 'Transit Duration',
      value: parameters.duration,
      unit: 'days',
      description: 'How long the transit lasts'
    },
    {
      name: 'Baseline Flux',
      value: parameters.baseline,
      unit: 'normalized',
      description: 'The normal brightness level of the star'
    }
  ];

  const formatValue = (value: number): string => {
    if (Math.abs(value) < 0.001) {
      return value.toExponential(3);
    }
    return value.toFixed(6);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-blue-600">📊</span>
          Transit Parameters
        </CardTitle>
        <CardDescription>
          Extracted parameters from trapezoidal fitting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parameterList.map((param, index) => (
            <div key={index} className="space-y-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{param.name}</h4>
                <span className="text-xs text-gray-500">{param.unit}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {formatValue(param.value)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {param.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}