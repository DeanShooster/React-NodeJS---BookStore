import { BookStore } from "./BookStore";
import { LatestReviews } from "./LatestReviews";
import { Spotlight } from "./Spotlight";
import { Trending } from "./Trending";

export const Home = () => {
  return (
    <div>
      <Spotlight />
      <Trending />
      <LatestReviews />
      <BookStore />
    </div>
  );
};
