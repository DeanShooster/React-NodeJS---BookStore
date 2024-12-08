import "./index.scss";

import { Logo } from "./Logo";
import { MediaPlatforms } from "./MediaPlatforms";
import { SearchBook } from "./SearchBook";
import { User } from "./User";

export const Header = () => {
  return (
    <header>
      <Logo />
      <SearchBook />
      <MediaPlatforms />
      <User />
    </header>
  );
};
