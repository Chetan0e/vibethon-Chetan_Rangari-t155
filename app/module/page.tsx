"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import AIMentor from "@/components/AIMentor";
import { addXP } from "@/lib/auth";

export default function Module() {
  const [x, setX] = useState(5);
  const prediction = x * 2 + 3;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setX(Number(e.target.value));
    addXP(1);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Linear Regression 📊
          </h1>
          <p className="text-gray-600">Understanding the foundation of machine learning</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="neon-glow">
              <h2 className="text-2xl font-bold mb-4">What is Linear Regression?</h2>
              <p className="text-gray-700 leading-relaxed">
                Linear Regression is a supervised learning algorithm used to predict a continuous 
                target variable based on one or more input features. It finds the best-fit line 
                that minimizes the difference between predicted and actual values.
              </p>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">Key Concepts:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Simple Linear Regression:</strong> One input feature</li>
                  <li><strong>Multiple Linear Regression:</strong> Multiple input features</li>
                  <li><strong>Best Fit Line:</strong> Minimizes the sum of squared errors</li>
                  <li><strong>Equation:</strong> y = mx + b (where m is slope, b is intercept)</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Real-World Applications:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>House price prediction</li>
                  <li>Sales forecasting</li>
                  <li>Stock price analysis</li>
                  <li>Temperature prediction</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="neon-glow-green">
              <h2 className="text-2xl font-bold mb-4">Interactive Demo</h2>
              <p className="text-gray-600 mb-6">
                Adjust the input value to see how the prediction changes in real-time.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">
                    Input (x): {x}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={x}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Prediction (y = 2x + 3):</p>
                  <p className="text-4xl font-bold gradient-text">
                    {prediction.toFixed(2)}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Formula:</strong> y = 2 × {x} + 3 = {prediction.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <AIMentor />
        </div>
      </div>
    </>
  );
}
