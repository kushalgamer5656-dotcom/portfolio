// Teen Patti Game Logic

// Card suits and values
const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Hand rankings (higher number = better hand)
const HAND_RANKS = {
    HIGH_CARD: 1,
    PAIR: 2,
    COLOR: 3,        // Flush
    SEQUENCE: 4,     // Straight
    PURE_SEQUENCE: 5, // Straight Flush
    TRAIL: 6         // Three of a Kind
};

// Card class to represent individual cards
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.numericValue = VALUES.indexOf(value);
    }

    toString() {
        return `${this.value}${this.suit}`;
    }

    isRed() {
        return this.suit === '♥' || this.suit === '♦';
    }
}

// Deck class to manage card deck
class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    // Create a standard 52-card deck
    initializeDeck() {
        this.cards = [];
        for (let suit of SUITS) {
            for (let value of VALUES) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    // Fisher-Yates shuffle algorithm
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Deal a specified number of cards
    deal(count) {
        return this.cards.splice(0, count);
    }
}

// Hand evaluator class
class HandEvaluator {
    constructor(cards) {
        this.cards = cards;
        this.sortedCards = [...cards].sort((a, b) => a.numericValue - b.numericValue);
    }

    // Check if all cards are of the same suit
    isColor() {
        return this.cards.every(card => card.suit === this.cards[0].suit);
    }

    // Check if cards form a sequence
    isSequence() {
        const values = this.sortedCards.map(card => card.numericValue);

        // Check for regular sequence
        if (values[1] === values[0] + 1 && values[2] === values[1] + 1) {
            return true;
        }

        // Check for A-2-3 special case
        if (values[0] === 0 && values[1] === 1 && values[2] === 12) {
            return true;
        }

        return false;
    }

    // Check if all three cards have the same value (Trail)
    isTrail() {
        return this.cards[0].numericValue === this.cards[1].numericValue &&
            this.cards[1].numericValue === this.cards[2].numericValue;
    }

    // Check if two cards have the same value (Pair)
    isPair() {
        const values = this.sortedCards.map(card => card.numericValue);
        return values[0] === values[1] || values[1] === values[2] || values[0] === values[2];
    }

    // Get the pair value for comparison
    getPairValue() {
        const values = this.sortedCards.map(card => card.numericValue);
        if (values[0] === values[1]) return values[0];
        if (values[1] === values[2]) return values[1];
        if (values[0] === values[2]) return values[0];
        return -1;
    }

    // Get high card value
    getHighCardValue() {
        return Math.max(...this.cards.map(card => card.numericValue));
    }

    // Get sum of all card values for tiebreaker
    getHandValue() {
        return this.cards.reduce((sum, card) => sum + card.numericValue, 0);
    }

    // Evaluate hand and return rank and description
    evaluate() {
        if (this.isTrail()) {
            return {
                rank: HAND_RANKS.TRAIL,
                name: 'Trail (Three of a Kind)',
                value: this.cards[0].numericValue
            };
        }

        if (this.isSequence() && this.isColor()) {
            return {
                rank: HAND_RANKS.PURE_SEQUENCE,
                name: 'Pure Sequence',
                value: this.getHighCardValue()
            };
        }

        if (this.isSequence()) {
            return {
                rank: HAND_RANKS.SEQUENCE,
                name: 'Sequence',
                value: this.getHighCardValue()
            };
        }

        if (this.isColor()) {
            return {
                rank: HAND_RANKS.COLOR,
                name: 'Color (Flush)',
                value: this.getHighCardValue()
            };
        }

        if (this.isPair()) {
            return {
                rank: HAND_RANKS.PAIR,
                name: 'Pair',
                value: this.getPairValue()
            };
        }

        return {
            rank: HAND_RANKS.HIGH_CARD,
            name: 'High Card',
            value: this.getHighCardValue()
        };
    }
}

// Game controller
class TeenPattiGame {
    constructor() {
        this.deck = null;
        this.player1Hand = [];
        this.player2Hand = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('playButton').addEventListener('click', () => this.playGame());
    }

    // Main game function
    playGame() {
        // Initialize and shuffle deck
        this.deck = new Deck();
        this.deck.shuffle();

        // Deal cards to both players
        this.player1Hand = this.deck.deal(3);
        this.player2Hand = this.deck.deal(3);

        // Display cards
        this.displayCards('player1Cards', this.player1Hand);
        this.displayCards('player2Cards', this.player2Hand);

        // Evaluate hands
        const player1Evaluation = new HandEvaluator(this.player1Hand).evaluate();
        const player2Evaluation = new HandEvaluator(this.player2Hand).evaluate();

        // Display hand ranks
        document.getElementById('player1Rank').textContent = player1Evaluation.name;
        document.getElementById('player2Rank').textContent = player2Evaluation.name;

        // Determine and display winner
        this.determineWinner(player1Evaluation, player2Evaluation);

        // Show results
        document.getElementById('gameResults').classList.remove('hidden');
    }

    // Display cards in the UI
    displayCards(elementId, cards) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.isRed() ? 'red' : 'black'}`;
            cardElement.textContent = card.toString();
            container.appendChild(cardElement);
        });
    }

    // Determine the winner based on hand evaluations
    determineWinner(player1Eval, player2Eval) {
        const winnerElement = document.getElementById('winnerAnnouncement');
        let winnerText = '';

        // Compare hand ranks
        if (player1Eval.rank > player2Eval.rank) {
            winnerText = '🏆 Player 1 Wins! 🏆';
            winnerElement.className = 'winner-announcement';
        } else if (player2Eval.rank > player1Eval.rank) {
            winnerText = '🏆 Player 2 Wins! 🏆';
            winnerElement.className = 'winner-announcement';
        } else {
            // Same rank, compare values
            if (player1Eval.value > player2Eval.value) {
                winnerText = '🏆 Player 1 Wins! 🏆';
                winnerElement.className = 'winner-announcement';
            } else if (player2Eval.value > player1Eval.value) {
                winnerText = '🏆 Player 2 Wins! 🏆';
                winnerElement.className = 'winner-announcement';
            } else {
                // Compare sum of all cards for final tiebreaker
                const player1Sum = new HandEvaluator(this.player1Hand).getHandValue();
                const player2Sum = new HandEvaluator(this.player2Hand).getHandValue();

                if (player1Sum > player2Sum) {
                    winnerText = '🏆 Player 1 Wins! 🏆';
                    winnerElement.className = 'winner-announcement';
                } else if (player2Sum > player1Sum) {
                    winnerText = '🏆 Player 2 Wins! 🏆';
                    winnerElement.className = 'winner-announcement';
                } else {
                    winnerText = '🤝 It\'s a Tie! 🤝';
                    winnerElement.className = 'winner-announcement tie';
                }
            }
        }

        winnerElement.textContent = winnerText;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TeenPattiGame();
});
