/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [result, setResult] = useState<{ total: number; message: string } | null>(null);

  const calculate = () => {
    const q = parseFloat(quantity);
    const p = parseFloat(price);

    if (!isNaN(q) && !isNaN(p)) {
      const total = q * p;
      let message = '';
      if (total > 10000) {
        message = 'Good Profit!';
      }
      setResult({ total, message });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-black/5"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-500 p-2 rounded-lg text-white">
            <Calculator size={24} />
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
            Crop Price Calculator
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">
              Quantity (kg)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">
              Price per kg
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
          >
            Calculate
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 rounded-xl bg-neutral-50 border border-neutral-200 text-center"
            >
              <p className="text-neutral-500 text-sm uppercase tracking-widest mb-1">Total Price</p>
              <p className="text-4xl font-light text-neutral-900 mb-2">
                ₹{result.total.toLocaleString()}
              </p>
              {result.message && (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold">
                  <TrendingUp size={20} />
                  <span>{result.message}</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

