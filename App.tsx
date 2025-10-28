import React, { useState } from 'react';

const App: React.FC = () => {
    const logos = [
        "https://i.postimg.cc/HxTWJgHh/20251028-164413.png",
        "https://i.postimg.cc/SsYdzwrV/20251028-164252.png",
        "https://i.postimg.cc/nzfj0gxy/20251028-164547.png",
        "https://i.postimg.cc/BvHtLpFh/20251028-164355.png"
    ];
    
    const [showLink, setShowLink] = useState(false);
    const [copied, setCopied] = useState(false);
    const url = "https://kgggrj.vercel.app/";

    const handleLogoClick = (index: number) => {
        if (index === 0) {
            // Show the fallback UI immediately. This way, if the intent fails,
            // the user has an immediate next step.
            setShowLink(true);
            setCopied(false);

            // Use Android Intent URL. This is much more reliable on Android devices
            // for opening a link in a specific application like Chrome.
            const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
            window.location.href = intentUrl;
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans relative">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-cyan-400">Chrome Link Opener</h1>
                <p className="text-gray-400 mt-2">Tap the first icon to open the link in Chrome.</p>
            </header>
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="grid grid-cols-2 gap-8">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            onClick={() => handleLogoClick(index)}
                            className={`flex justify-center items-center bg-gray-700/50 p-4 rounded-lg transform hover:scale-110 transition-transform duration-300 ease-in-out ${index === 0 ? 'cursor-pointer ring-2 ring-cyan-500 hover:ring-cyan-300' : 'cursor-default opacity-50'}`}
                            role={index === 0 ? "button" : undefined}
                            tabIndex={index === 0 ? 0 : -1}
                            aria-label={index === 0 ? "Open Link in Chrome" : `Logo ${index + 1} (inactive)`}
                        >
                             <img src={logo} alt={`Logo ${index + 1}`} className="h-24 w-auto object-contain" />
                        </div>
                    ))}
                </div>
            </div>
            
            {showLink && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" aria-modal="true" role="dialog">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-sm text-center">
                        <h2 className="text-xl font-bold text-cyan-400 mb-2">Link Ready</h2>
                        <p className="text-gray-400 mb-4">If Chrome didn't open, copy the link below and paste it into your Chrome browser.</p>
                        
                        <div className="bg-gray-900 rounded-lg p-3 text-cyan-300 break-words mb-4" aria-label="Link to copy">
                            {url}
                        </div>

                        <button
                            onClick={handleCopy}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mb-3"
                        >
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>

                        <button
                            onClick={() => setShowLink(false)}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                             aria-label="Close dialog"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <footer className="text-center mt-8 text-gray-500 text-sm">
                <p>Designed for devices where the default browser has issues with modern websites.</p>
            </footer>
        </div>
    );
};

export default App;