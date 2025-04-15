import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Quote() {
  const [quote, setQuote] = useState({
    text: "Life is a succession of lessons which must be lived to be understood.",
    author: "Ralph Waldo Emerson",
    category: "inspirational",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const API_URL = `https://api.api-ninjas.com/v1/quotes`;

  const API_KEY = "AvlA9plF2WCvDlIRjWwlVElVhCSNyEXrBbJ7XQHN";
  async function fetchQuote() {
    try {
      const res = await fetch(API_URL, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error("Invalid category or request failed.");
      }

      const data = await res.json();

      if (!data.length) {
        throw new Error("No quote found.");
      }

      const quoteObj = data[0];

      setQuote({
        text: quoteObj.quote,
        author: quoteObj.author,
        category: quoteObj.category,
      });
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg(
        "Oops! Couldn’t fetch a new quote. Please try a different category."
      );
      console.error(error);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  function getQuote() {
    fetchQuote();
  }

  function handleCopy() {
    const fullQuote = `"${quote.text}" — ${quote.author}`;
    navigator.clipboard
      .writeText(fullQuote)
      .then(() => {
        toast.success(" Quote copied to clipboard!");
      })
      .catch(() => {
        toast.error("❌ Could'nt copy quote to clipboard!");
      });
  }

  return (
    <div className="quote-container">
      <h1 className="quote-text">{quote.text}</h1>
      <h3 className="quote-author">~ {quote.author}</h3>
      {/* <h3 className="quote-category">- {quote.category.toUpperCase([0])}</h3> */}
      <h3 className="quote-category">
        - {quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}
      </h3>

      {errorMsg && <p className="error">{errorMsg}</p>}
      <button className="quote-button" onClick={getQuote}>
        {" "}
        Get Quote
      </button>
      <button onClick={handleCopy} className="copy-button">
        Copy Quote
      </button>
      <ToastContainer />
    </div>
  );
}
