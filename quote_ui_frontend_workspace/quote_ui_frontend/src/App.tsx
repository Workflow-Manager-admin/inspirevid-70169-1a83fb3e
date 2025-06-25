/* global window, localStorage */
import React, { useState } from "react";

// PUBLIC_INTERFACE
export interface Quote {
  text: string;
  author: string;
}

// PUBLIC_INTERFACE
const QUOTES: Quote[] = [
  // 100+ curated inspirational quotes
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "The best way to predict your future is to create it.", author: "Peter Drucker" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
  { text: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "Limit your “always” and your “nevers.”", author: "Amy Poehler" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Go as far as you can see; when you get there, you’ll be able to see further.", author: "Thomas Carlyle" },
  { text: "Try not to become a man of success, but rather become a man of value.", author: "Albert Einstein" },
  { text: "Life is 10% what happens to me and 90% of how I react to it.", author: "Charles R. Swindoll" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", author: "Henry Ford" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Go confidently in the direction of your dreams! Live the life you’ve imagined.", author: "Henry David Thoreau" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { text: "The harder I work, the luckier I get.", author: "Samuel Goldwyn" },
  { text: "Everything has beauty, but not everyone can see.", author: "Confucius" },
  { text: "The best dreams happen when you’re awake.", author: "Cherie Gilderbloom" },
  { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { text: "We become what we think about.", author: "Earl Nightingale" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Light tomorrow with today.", author: "Elizabeth Barrett Browning" },
  { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
  { text: "The biggest adventure you can take is to live the life of your dreams.", author: "Oprah Winfrey" },
  { text: "It’s never too late to be what you might have been.", author: "George Eliot" },
  { text: "You must do the thing you think you cannot do.", author: "Eleanor Roosevelt" },
  { text: "Magic is believing in yourself, if you can do that, you can make anything happen.", author: "Johann Wolfgang von Goethe" },
  { text: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford" },
  { text: "Only those who dare to fail greatly can ever achieve greatly.", author: "Robert F. Kennedy" },
  { text: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis" },
  { text: "Nothing is impossible, the word itself says, 'I'm possible!'", author: "Audrey Hepburn" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "When one door of happiness closes, another opens.", author: "Helen Keller" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats" },
  { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "I can, therefore I am.", author: "Simone Weil" },
  { text: "Never bend your head. Always hold it high. Look the world straight in the eye.", author: "Helen Keller" },
  { text: "Success is going from failure to failure without loss of enthusiasm.", author: "Winston Churchill" },
  { text: "To avoid criticism: do nothing, say nothing, be nothing.", author: "Elbert Hubbard" },
  { text: "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears.", author: "Chantal Sutherland" },
  { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "Opportunities are usually disguised as hard work, so most people don’t recognize them.", author: "Ann Landers" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  // Add more if necessary for expansion...
];

// Styling Constants
const COLORS = {
  background: "#171923",
  card: "#23263a",
  text: "#f5f6fa",
  primary: "#3f51b5",
  secondary: "#f50057",
  accent: "#00bcd4",
  surface: "#21213b",
  buttonText: "#f5f6fa",
  cardShadow: "rgba(0,0,0,0.4)",
};

const LAYOUT = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column" as "column",
};

const HEADER_STYLE: React.CSSProperties = {
  color: COLORS.primary,
  fontWeight: "bold",
  fontSize: "2.7rem",
  marginBottom: "0.2em",
  textAlign: "center",
  fontFamily: "Inter, SF Pro Text, Helvetica, Arial, sans-serif",
};
const DESC_STYLE: React.CSSProperties = {
  color: COLORS.text,
  fontSize: "1.1rem",
  marginBottom: "2.5em",
  fontWeight: 400,
  opacity: 0.85,
  textAlign: "center",
  maxWidth: 560,
};

const QUOTE_CARD_STYLE: React.CSSProperties = {
  background: COLORS.card,
  color: COLORS.text,
  borderRadius: 18,
  padding: "2.2em 2.6em",
  boxShadow: `0px 8px 32px ${COLORS.cardShadow}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "box-shadow 0.2s",
  marginBottom: "2.3em",
  minWidth: 350,
  maxWidth: 480,
  position: "relative",
};

const QUOTE_MARK: React.CSSProperties = {
  fontSize: "2.5rem",
  color: COLORS.accent,
  fontWeight: 900,
  alignSelf: "flex-start",
  lineHeight: "1em",
};

const QUOTE_TEXT: React.CSSProperties = {
  fontSize: "1.45rem",
  lineHeight: 1.55,
  margin: "1em 0 1.4em 0",
  textAlign: "center" as "center",
  fontFamily: "Georgia, serif",
};

const QUOTE_AUTHOR: React.CSSProperties = {
  color: COLORS.secondary,
  fontWeight: 600,
  fontSize: "1.12rem",
  textAlign: "right",
  alignSelf: "flex-end",
  fontFamily: "Inter, Arial, sans-serif",
};

const BTN = {
  base: {
    background: COLORS.primary,
    color: COLORS.buttonText,
    border: "none",
    borderRadius: 10,
    padding: "0.9em 2.1em",
    fontWeight: 600,
    fontSize: "1.15rem",
    cursor: "pointer",
    outline: "none",
    margin: "0 0.5em",
    boxShadow: "0px 1.5px 4px rgba(0,0,0,0.12)",
    letterSpacing: 0.01,
    transition: "background .18s, transform .13s",
    fontFamily: "Inter, SF Pro Text, Helvetica, Arial, sans-serif",
  } as React.CSSProperties,
  hover: {
    background: COLORS.accent,
  },
  secondary: {
    background: COLORS.secondary,
  },
};

// PUBLIC_INTERFACE
const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [showRender, setShowRender] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [renderBtnHover, setRenderBtnHover] = useState(false);

  // Generate a random quote from the list
  // PUBLIC_INTERFACE
  const handleGenerateQuote = () => {
    const idx = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[idx]);
    setShowRender(false);
  };

  // After quote is displayed, reveal the render button
  // PUBLIC_INTERFACE
  const handleRevealRender = () => {
    setShowRender(true);
    // store in localStorage for later use if desired
    if (quote) {
      window.localStorage.setItem(
        "selectedQuote",
        JSON.stringify(quote)
      );
    }
  };

  // PUBLIC_INTERFACE
  const handleRenderVideo = () => {
    // Video generator is in: /video, pass via URL or use localStorage
    let navUrl = "/video";
    if (quote) {
      navUrl = `/video?quote=${encodeURIComponent(quote.text)}&author=${encodeURIComponent(quote.author)}`;
      // Also write to localStorage for redundancy with cross-page reading
      localStorage.setItem("selectedQuote", JSON.stringify(quote));
    }
    window.location.href = navUrl;
  };

  return (
    <div
      style={{
        ...LAYOUT,
        background: COLORS.background,
      }}
    >
      <div>
        <h1 style={HEADER_STYLE}>Inspirational Quotes</h1>
        <div style={DESC_STYLE}>
          Discover a curated collection of powerful inspirational quotes. Draw motivation, reflect, and then instantly generate a video with your chosen quote.
        </div>
      </div>

      {!quote && (
        <button
          style={{ ...BTN.base, ...(btnHover ? BTN.hover : {}) }}
          onClick={handleGenerateQuote}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          data-testid="generate-quote"
        >
          Generate Random Quote
        </button>
      )}

      {quote && (
        <div style={QUOTE_CARD_STYLE}>
          <div style={QUOTE_MARK}>&ldquo;</div>
          <div style={QUOTE_TEXT}>{quote.text}</div>
          <div style={QUOTE_AUTHOR}>— {quote.author}</div>
          {!showRender && (
            <button
              style={{ ...BTN.base, ...BTN.secondary, ...(renderBtnHover ? BTN.hover : {}) }}
              onClick={handleRevealRender}
              onMouseEnter={() => setRenderBtnHover(true)}
              onMouseLeave={() => setRenderBtnHover(false)}
              data-testid="show-render"
            >
              Reveal Render Video
            </button>
          )}
          {showRender && (
            <button
              style={{ ...BTN.base, background: COLORS.accent, color: '#171923', ...(renderBtnHover ? BTN.secondary : {}) }}
              onClick={handleRenderVideo}
              onMouseEnter={() => setRenderBtnHover(true)}
              onMouseLeave={() => setRenderBtnHover(false)}
              data-testid="render-video"
            >
              Render Video
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
