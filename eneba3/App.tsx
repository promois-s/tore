
import React, { useState, useEffect } from 'react';
import GiftCardForm from './components/GiftCardForm';
import LoadingOverlay from './components/LoadingOverlay';
import { ENEBA_PURCHASE_URL } from './constants';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header Decorative Line */}
      <div className="w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

      <main className="flex-1 w-full max-w-4xl px-6 py-12 md:py-20 flex flex-col items-center">
        {/* Branding */}
        <div className="mb-12">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Eneba_logo_2020.png" 
            alt="Eneba Logo" 
            className="h-14 md:h-16 drop-shadow-sm transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Main Interface */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-14">
            <div className="text-center max-w-lg mx-auto mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Valider votre carte
              </h1>
              <p className="text-slate-500 font-medium">
                Saisissez votre code cadeau Eneba pour finaliser votre commande en toute sécurité.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <GiftCardForm />
            </div>

            {/* Helper Section */}
            <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col items-center text-center">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">
                Guide d'achat rapide
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <a 
                  href={ENEBA_PURCHASE_URL} 
                  target="_blank" 
                  className="flex items-center justify-center p-5 rounded-2xl bg-slate-50 text-indigo-600 font-bold hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  Acheter un code
                </a>
                <a 
                  href={ENEBA_PURCHASE_URL} 
                  target="_blank" 
                  className="flex items-center justify-center p-5 rounded-2xl bg-slate-50 text-indigo-600 font-bold hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  Vérifier le stock
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Security Trust Image */}
        <div className="mt-12 w-full max-w-lg opacity-90 transition-opacity hover:opacity-100">
          <img 
            src="https://files.catbox.moe/9oljga.jpg" 
            alt="Sécurité" 
            className="w-full rounded-3xl shadow-lg border-4 border-white"
          />
        </div>
      </main>

      <footer className="w-full py-10 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Eneba Global Services &bull; 100% Sécurisé
        </p>
      </footer>
    </div>
  );
};

export default App;
