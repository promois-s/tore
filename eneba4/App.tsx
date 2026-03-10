
import React, { useState, useEffect } from 'react';
import GiftCardForm from './components/GiftCardForm';
import LoadingOverlay from './components/LoadingOverlay';
import { ENEBA_PURCHASE_URL } from './constants';

const App: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Elegant intro delay to ensure all assets are ready and provide a premium feel
    const timer = setTimeout(() => setIsInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <LoadingOverlay message="Préparation de votre session sécurisée..." />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Header Background */}
      <div className="w-full bg-indigo-600 h-1 md:h-2"></div>

      <main className="flex-1 w-full max-w-4xl px-4 py-8 md:py-16 flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-10 transform hover:scale-105 transition-transform duration-300">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Eneba_logo_2020.png" 
            alt="Eneba" 
            className="h-14 md:h-16 mx-auto drop-shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x60?text=ENEBA';
            }}
          />
        </div>

        {/* Content Card */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-indigo-50/50 overflow-hidden">
          <div className="p-8 md:p-14 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Valider une carte cadeau
            </h1>
            <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 leading-relaxed font-medium">
              Entrez votre code cadeau Eneba pour débloquer votre produit instantanément.
            </p>

            <div className="max-w-md mx-auto">
              <GiftCardForm />
            </div>

            {/* Support/Info Links */}
            <div className="mt-12 pt-10 border-t border-slate-50 space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed italic">
                Paiement sécurisé. Votre code sera vérifié instantanément par nos serveurs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href={ENEBA_PURCHASE_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 rounded-2xl bg-slate-50 text-indigo-600 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
                >
                  <span className="mr-2">Acheter un code</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href={ENEBA_PURCHASE_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 rounded-2xl bg-slate-50 text-indigo-600 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
                >
                  <span className="mr-2">Vérifier le stock</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Accent Bottom Bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        </div>

        {/* Security / Proof Image Section */}
        <div className="mt-12 w-full max-w-lg opacity-80 hover:opacity-100 transition-opacity duration-500">
          <img 
            src="https://files.catbox.moe/9oljga.jpg" 
            alt="Eneba Secure Verification" 
            className="w-full rounded-3xl shadow-lg border border-white"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ENEBA GLOBAL SERVICES &bull; SECURED BY SSL
      </footer>
    </div>
  );
};

export default App;
