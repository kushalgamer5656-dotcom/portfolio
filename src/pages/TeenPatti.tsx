import React, { useState, useEffect } from 'react';

// Card suits and values
const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Hand rankings
const HAND_RANKS = {
    HIGH_CARD: 1,
    PAIR: 2,
    COLOR: 3,
    SEQUENCE: 4,
    PURE_SEQUENCE: 5,
    TRAIL: 6
};

interface Card {
    suit: string;
    value: string;
    numericValue: number;
}

interface HandEvaluation {
    rank: number;
    name: string;
    value: number;
}

const TeenPatti: React.FC = () => {
    const [player1Hand, setPlayer1Hand] = useState<Card[]>([]);
    const [player2Hand, setPlayer2Hand] = useState<Card[]>([]);
    const [player1Revealed, setPlayer1Revealed] = useState<boolean[]>([false, false, false]);
    const [player2Revealed, setPlayer2Revealed] = useState<boolean[]>([false, false, false]);
    const [showDeck, setShowDeck] = useState(false);
    const [dealingCards, setDealingCards] = useState(false);
    const [player1Eval, setPlayer1Eval] = useState<HandEvaluation | null>(null);
    const [player2Eval, setPlayer2Eval] = useState<HandEvaluation | null>(null);
    const [winner, setWinner] = useState<string>('');
    const [showWinner, setShowWinner] = useState(false);

    // Create a card
    const createCard = (suit: string, value: string): Card => ({
        suit,
        value,
        numericValue: VALUES.indexOf(value)
    });

    // Create and shuffle deck
    const createDeck = (): Card[] => {
        const deck: Card[] = [];
        for (let suit of SUITS) {
            for (let value of VALUES) {
                deck.push(createCard(suit, value));
            }
        }
        // Fisher-Yates shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    };

    // Check if card is red
    const isRed = (card: Card): boolean => card.suit === '♥' || card.suit === '♦';

    // Hand evaluation functions
    const isColor = (cards: Card[]): boolean => {
        return cards.every(card => card.suit === cards[0].suit);
    };

    const isSequence = (cards: Card[]): boolean => {
        const sorted = [...cards].sort((a, b) => a.numericValue - b.numericValue);
        const values = sorted.map(c => c.numericValue);

        if (values[1] === values[0] + 1 && values[2] === values[1] + 1) return true;
        if (values[0] === 0 && values[1] === 1 && values[2] === 12) return true;

        return false;
    };

    const isTrail = (cards: Card[]): boolean => {
        return cards[0].numericValue === cards[1].numericValue &&
            cards[1].numericValue === cards[2].numericValue;
    };

    const isPair = (cards: Card[]): boolean => {
        const sorted = [...cards].sort((a, b) => a.numericValue - b.numericValue);
        const values = sorted.map(c => c.numericValue);
        return values[0] === values[1] || values[1] === values[2] || values[0] === values[2];
    };

    const getPairValue = (cards: Card[]): number => {
        const sorted = [...cards].sort((a, b) => a.numericValue - b.numericValue);
        const values = sorted.map(c => c.numericValue);
        if (values[0] === values[1]) return values[0];
        if (values[1] === values[2]) return values[1];
        if (values[0] === values[2]) return values[0];
        return -1;
    };

    const getHighCardValue = (cards: Card[]): number => {
        return Math.max(...cards.map(c => c.numericValue));
    };

    const getHandValue = (cards: Card[]): number => {
        return cards.reduce((sum, card) => sum + card.numericValue, 0);
    };

    const evaluateHand = (cards: Card[]): HandEvaluation => {
        if (isTrail(cards)) {
            return { rank: HAND_RANKS.TRAIL, name: 'Trail (Three of a Kind)', value: cards[0].numericValue };
        }
        if (isSequence(cards) && isColor(cards)) {
            return { rank: HAND_RANKS.PURE_SEQUENCE, name: 'Pure Sequence', value: getHighCardValue(cards) };
        }
        if (isSequence(cards)) {
            return { rank: HAND_RANKS.SEQUENCE, name: 'Sequence', value: getHighCardValue(cards) };
        }
        if (isColor(cards)) {
            return { rank: HAND_RANKS.COLOR, name: 'Color (Flush)', value: getHighCardValue(cards) };
        }
        if (isPair(cards)) {
            return { rank: HAND_RANKS.PAIR, name: 'Pair', value: getPairValue(cards) };
        }
        return { rank: HAND_RANKS.HIGH_CARD, name: 'High Card', value: getHighCardValue(cards) };
    };

    const determineWinner = (p1Eval: HandEvaluation, p2Eval: HandEvaluation, p1Hand: Card[], p2Hand: Card[]): string => {
        if (p1Eval.rank > p2Eval.rank) return 'Player 1 Wins! 🏆';
        if (p2Eval.rank > p1Eval.rank) return 'Player 2 Wins! 🏆';

        if (p1Eval.value > p2Eval.value) return 'Player 1 Wins! 🏆';
        if (p2Eval.value > p1Eval.value) return 'Player 2 Wins! 🏆';

        const p1Sum = getHandValue(p1Hand);
        const p2Sum = getHandValue(p2Hand);

        if (p1Sum > p2Sum) return 'Player 1 Wins! 🏆';
        if (p2Sum > p1Sum) return 'Player 2 Wins! 🏆';

        return "It's a Tie! 🤝";
    };

    const playGame = async () => {
        // Reset game state
        setShowDeck(true);
        setDealingCards(true);
        setPlayer1Revealed([false, false, false]);
        setPlayer2Revealed([false, false, false]);
        setPlayer1Eval(null);
        setPlayer2Eval(null);
        setWinner('');
        setShowWinner(false);

        const deck = createDeck();
        const p1Hand = deck.slice(0, 3);
        const p2Hand = deck.slice(3, 6);

        // Simulate card dealing animation
        await new Promise(resolve => setTimeout(resolve, 500));
        setPlayer1Hand(p1Hand);
        setPlayer2Hand(p2Hand);
        setDealingCards(false);
        setShowDeck(false);

        // Auto-reveal Player 1 cards one by one
        await new Promise(resolve => setTimeout(resolve, 800));
        setPlayer1Revealed([true, false, false]);
        await new Promise(resolve => setTimeout(resolve, 400));
        setPlayer1Revealed([true, true, false]);
        await new Promise(resolve => setTimeout(resolve, 400));
        setPlayer1Revealed([true, true, true]);

        // Evaluate Player 1 hand
        const p1Eval = evaluateHand(p1Hand);
        setPlayer1Eval(p1Eval);

        // Store hands for later evaluation
        setPlayer2Hand(p2Hand);
    };

    const revealPlayer2Card = (index: number) => {
        if (player2Revealed[index]) return;

        const newRevealed = [...player2Revealed];
        newRevealed[index] = true;
        setPlayer2Revealed(newRevealed);

        // Check if all Player 2 cards are revealed
        if (newRevealed.every(r => r)) {
            // Evaluate Player 2 hand and determine winner
            setTimeout(() => {
                const p2Eval = evaluateHand(player2Hand);
                setPlayer2Eval(p2Eval);

                if (player1Eval) {
                    const result = determineWinner(player1Eval, p2Eval, player1Hand, player2Hand);
                    setWinner(result);
                    setShowWinner(true);
                }
            }, 500);
        }
    };

    return (
        <section id="teenpatti" className="min-h-screen flex items-center justify-center py-20 px-4 bg-cyber-black relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-primary/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl w-full relative z-10">
                {/* Title */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                        Teen Patti <span className="text-cyber-primary">Game</span>
                    </h1>
                    <p className="text-gray-400 text-lg">A Digital Implementation of the Classic Card Game</p>
                </div>

                {/* Play Button */}
                <div className="text-center mb-16">
                    <button
                        onClick={playGame}
                        className="px-12 py-4 bg-cyber-primary text-black font-bold text-xl rounded-full hover:bg-white hover:scale-105 transition-all duration-300 uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    >
                        {winner ? 'Play Again' : 'Deal Cards'}
                    </button>
                </div>

                {/* Deck Animation */}
                {showDeck && (
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-block bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-2xl font-bold">
                            🃏 Dealing...
                        </div>
                    </div>
                )}

                {/* Game Area - Side by Side */}
                {player1Hand.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Player 1 Section */}
                        <div className="bg-[#0a0b10] border border-white/10 rounded-2xl p-8 shadow-2xl">
                            <h2 className="text-2xl font-bold text-cyber-primary mb-8 text-center uppercase tracking-widest">Player 1</h2>

                            {/* Player 1 Cards */}
                            <div className="flex gap-4 justify-center mb-8">
                                {player1Hand.map((card, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative transition-all duration-500 ${player1Revealed[idx] ? 'animate-card-flip' : ''
                                            }`}
                                        style={{
                                            animationDelay: `${idx * 200}ms`
                                        }}
                                    >
                                        {player1Revealed[idx] ? (
                                            <div
                                                className={`bg-white rounded-xl px-4 py-6 text-4xl font-bold w-24 h-36 flex flex-col items-center justify-between shadow-xl transform hover:-translate-y-2 transition-transform ${isRed(card) ? 'text-red-600' : 'text-gray-900'
                                                    }`}
                                            >
                                                <div className="text-lg self-start">{card.value}</div>
                                                <div className="text-4xl">{card.suit}</div>
                                                <div className="text-lg self-end rotate-180">{card.value}</div>
                                            </div>
                                        ) : (
                                            <div className="bg-gradient-to-tr from-gray-800 to-gray-900 border border-gray-700 rounded-xl w-24 h-36 flex items-center justify-center shadow-xl">
                                                <span className="text-4xl opacity-20">♠</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Player 1 Hand Rank */}
                            {player1Eval && (
                                <div className="text-center text-xl font-bold text-cyber-primary bg-cyber-primary/20 py-4 rounded-lg border border-cyber-primary/50 animate-fade-in">
                                    {player1Eval.name}
                                </div>
                            )}
                        </div>

                        {/* Player 2 Section */}
                        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm border-2 border-cyber-secondary/50 rounded-2xl p-6 shadow-2xl animate-fade-in">
                            <h2 className="text-3xl font-bold text-cyber-secondary mb-6 text-center">Player 2</h2>

                            {/* Player 2 Cards - Click to Reveal */}
                            <div className="flex gap-4 justify-center mb-6">
                                {player2Hand.map((card, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => revealPlayer2Card(idx)}
                                        className={`relative cursor-pointer transition-all duration-500 ${player2Revealed[idx] ? 'animate-card-flip' : 'hover:scale-110'
                                            }`}
                                    >
                                        {player2Revealed[idx] ? (
                                            <div
                                                className={`bg-white border-4 border-gray-800 rounded-xl px-6 py-8 text-4xl font-bold w-24 h-32 flex items-center justify-center shadow-xl ${isRed(card) ? 'text-red-600' : 'text-gray-900'
                                                    }`}
                                            >
                                                <div className="text-center">
                                                    <div>{card.value}</div>
                                                    <div>{card.suit}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-gradient-to-br from-purple-600 to-blue-600 border-4 border-purple-800 rounded-xl w-24 h-32 flex items-center justify-center shadow-xl relative">
                                                <span className="text-6xl">🃏</span>
                                                <div className="absolute -top-2 -right-2 bg-cyber-secondary text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                                    Click!
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Player 2 Hand Rank */}
                            {player2Eval && (
                                <div className="text-center text-xl font-bold text-cyber-secondary bg-cyber-secondary/20 py-4 rounded-lg border border-cyber-secondary/50 animate-fade-in">
                                    {player2Eval.name}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Winner Announcement */}
                {showWinner && (
                    <div className={`text-center py-8 rounded-2xl text-4xl font-bold shadow-2xl animate-bounce-in ${winner.includes('Tie')
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        }`}>
                        {winner}
                    </div>
                )}

                {/* Game Rules */}
                <div className="mt-16 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Hand Rankings (Highest to Lowest)</h3>
                    <ol className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="text-cyber-primary font-bold">1.</span>
                            <span><strong className="text-white">Trail</strong> - Three of a Kind (e.g., K♠ K♥ K♦)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-cyber-primary font-bold">2.</span>
                            <span><strong className="text-white">Pure Sequence</strong> - Sequential cards of same suit (e.g., 5♠ 6♠ 7♠)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-cyber-primary font-bold">3.</span>
                            <span><strong className="text-white">Sequence</strong> - Sequential cards of any suit (e.g., 5♠ 6♥ 7♦)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-cyber-primary font-bold">4.</span>
                            <span><strong className="text-white">Color</strong> - All cards same suit (e.g., 2♠ 7♠ K♠)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-cyber-primary font-bold">5.</span>
                            <span><strong className="text-white">Pair</strong> - Two cards same value (e.g., 9♠ 9♥ K♦)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-cyber-primary font-bold">6.</span>
                            <span><strong className="text-white">High Card</strong> - Highest card wins</span>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default TeenPatti;
