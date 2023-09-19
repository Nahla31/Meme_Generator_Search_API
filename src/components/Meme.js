import { useState } from "react";
import axios from "axios";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
  });
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/home/${query}`);
      setSearchResult(response.data);
      console.log(response.data.length);
      response.data.length > 1
        ? setRandomIndex(Math.floor(Math.random() * response.data.length))
        : setRandomIndex(100);
    } catch (error) {
      console.error("Error searching for images:", error);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          id="search-input"
          placeholder="Enter search query"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search--button">
          Search
        </button>
        <input
          type="text"
          name="topText"
          placeholder="Top text"
          className="form--input"
          value={FormData.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="bottom text"
          className="form--input"
          value={FormData.bottomText}
          onChange={handleChange}
        />
      </div>
      {searchResult.length > 0 ? (
        <div className="meme">
          {searchResult.length > 1 ? (
            <img
              className="meme--image"
              key={searchResult[randomIndex].public_id}
              src={searchResult[randomIndex].secure_url}
              alt={searchResult[randomIndex].public_id}
            />
          ) : (
            <img
              className="meme--image"
              key={searchResult[0].public_id}
              src={searchResult[0].secure_url}
              alt={searchResult[0].public_id}
            />
          )}
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      ) : (
        <p className="image--text">
          Waiting for image.. please enter your search query
        </p>
      )}
    </main>
  );
}
