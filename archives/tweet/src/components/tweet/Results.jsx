import { useQuery } from "react-query";
import { useSearchContext } from "../../context/searchContext";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Results() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [URL, setURL] = useState("");
  const [oauth_token, setOauth_token] = useState("");
  const [oauth_token_secret, setOauth_token_secret] = useState("");
  const [loggedClient, setLoggedClient] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenSecret, setAccessTokenSecret] = useState("");

  const { searchTerm } = useSearchContext();

  useEffect(() => {
    async function makeAuth() {
      const resp = await axios("http://localhost:4040/");
      const { url, oauth_token, oauth_token_secret } = await resp.data;
      setURL(url);
      setOauth_token(oauth_token);
      setOauth_token_secret(oauth_token_secret);
    }
    makeAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    const resp = await axios.post("http://localhost:4040/pin", {
      ...form,
      oauth_token,
      oauth_token_secret,
    });
    const { loggedClient, accessToken, accessSecret } = await resp.data;
    setLoggedClient(loggedClient);
    setAccessToken(accessToken);
    setAccessTokenSecret(accessSecret);
  };

  return (
    <div className="p-4 flex flex-col flex-wrap gap-6">
      <p>hello</p>
      <Link
        to={`${URL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn w-fit"
      >
        Authorize the Twitter Access
      </Link>
      <form action="" className="flex flex-row gap-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="pin"
          id="pin"
          className="input"
          placeholder="SECRET PIN"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      <div>
        <h3>Logged Client</h3>
        {/* {loggedClient ?? <p>loggedClient.currentUser()</p>} */}
      </div>
    </div>
  );
}

export default Results;
