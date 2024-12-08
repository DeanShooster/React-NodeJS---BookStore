import { useContext } from "react";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import "./index.scss";
import { DiscordIcon, RedditIcon, XTwitterIcon } from "../../../assets";

export const MediaPlatforms = () => {
  const { dictionary } = useContext(DictionaryContext);

  return (
    <div className="media-platforms-container">
      <span>{dictionary.Header.joinNow}</span>
      <div>
        <img alt="" src={DiscordIcon} />
        <img alt="" src={RedditIcon} />
        <img alt="" src={XTwitterIcon} />
      </div>
    </div>
  );
};
