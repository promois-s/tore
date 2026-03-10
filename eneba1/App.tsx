
import React, { useState, useEffect } from 'react';
import GiftCardForm from './components/GiftCardForm';
import LoadingOverlay from './components/LoadingOverlay';
import { ENEBA_PURCHASE_URL } from './constants';

const App: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Initial loading simulation for visual polish
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Eneba_logo_2020.png" 
          alt="Eneba" 
          className="h-12 mx-auto mb-6"
          onError={(e) => {
            // Fallback for logo
            (e.target as HTMLImageElement).src = 'https://picsum.photos/200/50?text=ENEBA';
          }}
        />
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">
          Valider une carte cadeau
        </h1>
        <p className="text-indigo-700 font-medium max-w-sm mx-auto">
          Entrez votre code cadeau Eneba pour acheter ce produit instantanément.
        </p>
      </div>

      {/* Main Form Section */}
      <section className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200 mb-8 border border-gray-100">
        <GiftCardForm />
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center space-y-4">
          <p className="text-gray-500 text-sm leading-relaxed">
            Ne vous inquiétez pas, il est très simple de payer avec le code cadeau Eneba. 
            Il vous suffit d'acheter le code et de le saisir ci-dessus. 
            Cela ne vous prendra pas plus d'une minute ou deux.
          </p>
          
          <div className="flex flex-col space-y-3 pt-4">
            <a 
              href={ENEBA_PURCHASE_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform"></span>
              <span>Pour obtenir un code de carte cadeau, cliquez ici</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            
            <a 
              href={ENEBA_PURCHASE_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform"></span>
              <span>Accéder au nouveau stock ici</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <p className="text-gray-600 font-semibold text-sm mt-6">
            Après avoir acheté le code, vous recevrez un Email contenant votre code d'activation.
          </p>
        </div>
      </section>

      {/* Footer Image */}
      <div className="w-full max-w-lg mt-4 opacity-90 grayscale hover:grayscale-0 transition-all duration-700">
        <img 
          src="https://files.catbox.moe/9oljga.jpg" 
          alt="Eneba Security" 
          className="w-full rounded-2xl shadow-sm border border-gray-200"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <footer className="mt-12 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Eneba Gift Services. Tous droits réservés.
      </footer>
    </div>
  );
};

export default App;
