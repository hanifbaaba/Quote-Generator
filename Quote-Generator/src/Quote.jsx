import { useEffect, useState } from "react";

export default function Quote() {
  const [quote, setQuote] = useState({
    text: "Life is a succession of lessons which must be lived to be understood.",
    author: "Ralph Waldo Emerson",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const API_URL = "https://api.api-ninjas.com/v1/quotes";
  const API_KEY = "GjPcFqohZlHh++lJrN7uZg==9YA7FXQC2TiUhme1";
  async function fetchQuote() {
    try {
      const res = await fetch(API_URL, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      const data = await res.json();
      const quoteObj = data[0];
      setQuote({
        text: quoteObj.quote || quoteObj.contentObj,
        author: quoteObj.author,
        category: quoteObj.category,
      });
    } catch (error) {
      setErrorMsg("Oops! Couldn’t fetch a new quote. Please try again.");
    }
  }
  useEffect(() => {
    fetchQuote();
  }, []);

  function getQuote() {
    fetchQuote();
  }

  return (
    <div className="quote-container">
      <h1 className="quote-text">{quote.text}</h1>
      <h3 className="quote-author">~ {quote.author}</h3>
      <h3 className="quote-category">- {quote.category}</h3>
      <button className="quote-button" onClick={getQuote}>
        {" "}
        Get Quote
      </button>
    </div>
  );
}

//  "Oops! Couldn’t fetch a new quote. Please try again."
