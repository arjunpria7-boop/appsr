import React, { useState, useEffect } from 'react';

// --- Data & Constants ---
const CODES: Record<string, string> = {
    '1': 'https://kgggrj.vercel.app/',
    '2': 'https://a-v1-0.vercel.app/',
    '3': 'https://jadwal-pasaran-opal.vercel.app/',
    '4': 'https://pola1.vercel.app/',
    '5': 'https://arjun-analis.vercel.app/',
    '6': 'https://kalkulator-invest.vercel.app/',
    '12': 'https://hokky-mas-arj-v1-2.vercel.app/'
};

const GUIDE_INFO = [
    { key: '1', desc: 'KGGGRJ App' },
    { key: '2', desc: 'A V1 App' },
    { key: '3', desc: 'Jadwal Pasaran' },
    { key: '4', desc: 'Pola 1 App' },
    { key: '5', desc: 'Arjun Analis' },
    { key: '6', desc: 'Investment Calculator' },
    { key: '12', desc: 'Hokky Mas Arj V1.2' },
];

const MAX_LENGTH = 16;

// --- Helper Components ---

const KeypadButton = ({
  value,
  label,
  className,
  onClick,
}: {
  value: string;
  label: React.ReactNode;
  className?: string;
  onClick: (key: string) => void;
}) => (
  <button className={`keypad-btn ${className || ''}`} data-key={value} aria-label={value} onClick={() => onClick(value)}>
    {label}
  </button>
);

// --- Main App Component ---

const App: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [calculationPerformed, setCalculationPerformed] = useState<boolean>(false);

    const [fallbackModal, setFallbackModal] = useState<{ show: boolean; url: string }>({ show: false, url: '' });
    const [infoModal, setInfoModal] = useState<boolean>(false);

    const resetState = () => {
        setInput('');
        setCalculationPerformed(false);
    };

    const handleKeyPress = (key: string) => {
        switch (key) {
            case 'C':
                resetState();
                break;
            case 'backspace':
                setCalculationPerformed(false); // Allow editing
                setInput(prev => prev.slice(0, -1));
                break;
            case '?':
                setInfoModal(true);
                break;
            case 'enter':
                handleEnter();
                break;
            default:
                if (input.length >= MAX_LENGTH) return;
                
                const isOperator = /[+\-*/%]/.test(key);

                if (key === '.') {
                    const operatorsRegex = /[+\-*/%]/;
                    const parts = input.split(operatorsRegex);
                    const currentNumber = parts[parts.length - 1];
                    if (!currentNumber.includes('.')) {
                        setInput(prev => prev + key);
                    }
                } else { // Is a number or operator
                    if (calculationPerformed && !isOperator) {
                        setInput(key);
                    } else {
                        // Prevent stacking operators
                        if (isOperator && /[+\-*/%]$/.test(input)) {
                             setInput(prev => prev.slice(0,-1) + key);
                        } else {
                            setInput(prev => prev + key);
                        }
                    }
                }
                setCalculationPerformed(false);
                break;
        }
    };
    
    const handleEnter = () => {
        if (!input) return;
        const isCalculation = /[+\-*/%]/.test(input);

        if (isCalculation) {
            try {
                // Prevent calculation on trailing operator e.g. "5+"
                if (/[+\-*/%]$/.test(input)) {
                    setInput('Error');
                    setTimeout(resetState, 1000);
                    return;
                }
                const result = new Function(`return ${input.replace('×', '*').replace('÷', '/')}`)();
                const finalResult = String(parseFloat(result.toPrecision(12)));
                setInput(finalResult);
                setCalculationPerformed(true);
            } catch (error) {
                setInput('Error');
                setTimeout(resetState, 1000);
            }
        } else {
            if (input === '511') {
                setInfoModal(true);
                resetState();
            } else if (CODES[input]) {
                const url = CODES[input];
                setFallbackModal({ show: true, url });
                const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
                window.location.href = intentUrl;
                resetState();
            } else {
                setInput('Error');
                setTimeout(resetState, 1000);
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fallbackModal.url).then(() => {
            // Can add a visual confirmation if needed
        });
    };
    
    return (
        <div className="container">
            <main className="card">
                <div className="password-container">
                    <div id="password-display" className="password-display" aria-live="polite">
                        {input || '0'}
                    </div>
                </div>
                <div id="keypad" className="keypad">
                    {/* Row 1 */}
                    <KeypadButton value="C" label="C" className="function" onClick={handleKeyPress} />
                    <KeypadButton value="backspace" label="⌫" className="function" onClick={handleKeyPress} />
                    <KeypadButton value="%" label="%" className="operator" onClick={handleKeyPress} />
                    <KeypadButton value="/" label="÷" className="operator" onClick={handleKeyPress} />

                    {/* Row 2 */}
                    <KeypadButton value="7" label="7" onClick={handleKeyPress} />
                    <KeypadButton value="8" label="8" onClick={handleKeyPress} />
                    <KeypadButton value="9" label="9" onClick={handleKeyPress} />
                    <KeypadButton value="*" label="×" className="operator" onClick={handleKeyPress} />
                    
                    {/* Row 3 */}
                    <KeypadButton value="4" label="4" onClick={handleKeyPress} />
                    <KeypadButton value="5" label="5" onClick={handleKeyPress} />
                    <KeypadButton value="6" label="6" onClick={handleKeyPress} />
                    <KeypadButton value="-" label="-" className="operator" onClick={handleKeyPress} />
                    
                    {/* Row 4 */}
                    <KeypadButton value="1" label="1" onClick={handleKeyPress} />
                    <KeypadButton value="2" label="2" onClick={handleKeyPress} />
                    <KeypadButton value="3" label="3" onClick={handleKeyPress} />
                    <KeypadButton value="+" label="+" className="operator" onClick={handleKeyPress} />

                    {/* Row 5 */}
                    <KeypadButton value="?" label="?" className="function" onClick={handleKeyPress} />
                    <KeypadButton value="0" label="0" onClick={handleKeyPress} />
                    <KeypadButton value="." label="." onClick={handleKeyPress} />
                    <KeypadButton value="enter" label="=" className="equals-btn" onClick={handleKeyPress} />
                </div>
            </main>

            <div id="fallback-modal" className={`modal-overlay ${fallbackModal.show ? 'show' : ''}`}>
                <div className="modal-content">
                    <h2>Link Ready</h2>
                    <p>If the link didn't open, copy it below.</p>
                    <div className="url-display">{fallbackModal.url}</div>
                    <button onClick={handleCopy} className="modal-button copy">Copy Link</button>
                    <button onClick={() => setFallbackModal({ show: false, url: '' })} className="modal-button close">Close</button>
                </div>
            </div>

            <div id="info-modal" className={`modal-overlay ${infoModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <h2>Key Guide</h2>
                    <p>Use codes to open links. (Code: 511)</p>
                    <ul className="info-list">
                        {GUIDE_INFO.map(item => (
                            <li key={item.key}><strong>Key {item.key}:</strong><span>{item.desc}</span></li>
                        ))}
                    </ul>
                    <button onClick={() => setInfoModal(false)} className="modal-button close">Close</button>
                </div>
            </div>
        </div>
    );
};

export default App;
