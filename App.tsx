import React from 'react';

const App: React.FC = () => {
    const logos = [
        "https://i.postimg.cc/HxTWJgHh/20251028-164413.png",
        "https://i.postimg.cc/SsYdzwrV/20251028-164252.png",
        "https://i.postimg.cc/nzfj0gxy/20251028-164547.png",
        "https://i.postimg.cc/BvHtLpFh/20251028-164355.png"
    ];

    const handleLogoClick = (index: number) => {
        if (index === 0) {
            const url = "https://kgggrj.vercel.app/";
            // This URL scheme attempts to open the link directly in Chrome.
            // Using encodeURIComponent is a good practice for URLs.
            window.location.href = `googlechrome://navigate?url=${encodeURIComponent(url)}`;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
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
            <footer className="text-center mt-8 text-gray-500 text-sm">
                <p>Designed for devices where the default browser has issues with modern websites.</p>
            </footer>
        </div>
    );
};

export default App;
