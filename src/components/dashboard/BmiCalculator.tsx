'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState('');

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / ((h / 100) * (h / 100));
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setInterpretation('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setInterpretation('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setInterpretation('Overweight');
      } else {
        setInterpretation('Obese');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button onClick={calculateBmi} className="w-full">Calculate</Button>
        {bmi !== null && (
          <div className="text-center w-full p-2 bg-muted rounded-md">
            <p className="font-bold text-2xl">{bmi.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">{interpretation}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
