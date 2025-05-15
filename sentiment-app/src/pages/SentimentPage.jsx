import React, { useState } from 'react';

function SentimentPage() {
    const [tweet, setTweet] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!tweet.trim()) return;
        setLoading(true);
        try {
            const response = await fetch('https://sentiment-analysis-naive.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tweet }),
            });

            const data = await response.json();
            setResult(data.sentiment);
        } catch (error) {
            setResult('Error analyzing sentiment.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                .bg-image {
                    background-image: url('/image.jpg');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: -2;
                }

                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
                    animation: gradientShift 15s ease infinite;
                    z-index: -1;
                }

                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.5); }
                    50% { box-shadow: 0 0 25px rgba(99, 102, 241, 0.8); }
                }

                .page-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    width: 100vw;
                    padding: 2rem;
                    position: relative;
                    z-index: 1;
                }

                .main-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    max-width: 800px;
                    width: 100%;
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .header {
                    font-size: clamp(1.75rem, 5vw, 2.5rem);
                    font-weight: 700;
                    color: white;
                    margin-bottom: 2rem;
                    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }

                .text-area {
                    width: 100%;
                    max-width: 600px;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    backdrop-filter: blur(8px);
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    font-size: 1rem;
                    border: none;
                    resize: none;
                    margin-bottom: 1.5rem;
                    transition: background 0.3s ease;
                }

                .text-area:focus {
                    outline: none;
                    background: rgba(255, 255, 255, 0.25);
                }

                .analyze-btn {
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    font-weight: 600;
                    padding: 0.75rem 2rem;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 1rem;
                    cursor: pointer;
                    animation: glow 2s ease-in-out infinite;
                    transition: transform 0.3s ease;
                }

                .analyze-btn:hover {
                    transform: scale(1.05);
                }

                .result-display {
                    margin-top: 2rem;
                    padding: 1.5rem 2rem;
                    border-radius: 1rem;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    color: white;
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                .positive {
                    color: #10b981;
                    text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
                }

                .negative {
                    color: #ef4444;
                    text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
                }
                `}
            </style>

            <div className="bg-image" />
            <div className="overlay" />
            <div className="page-wrapper">
                <div className="main-container">
                    <h1 className="header">Let's Analyze Your Statement</h1>

                    <textarea
                        rows="4"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        placeholder="Type your sentence here..."
                        className="text-area"
                    />

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="analyze-btn"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </span>
                        ) : (
                            'Analyze Sentiment'
                        )}
                    </button>

                    {result && (
                        <div className={`result-display ${result === 'Positive' ? 'positive' : 'negative'}`}>
                            <h2 className="text-2xl font-bold mb-2">
                                {result === 'Positive' ? '😊 Positive' : '😞 Negative'}
                            </h2>
                            <p className="text-lg">
                                {result === 'Positive' ? 'This sounds positive!' : 'This sounds negative.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SentimentPage;
