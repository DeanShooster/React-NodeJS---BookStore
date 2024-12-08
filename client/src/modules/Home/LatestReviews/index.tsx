import { useCallback, useContext, useEffect, useState } from "react";
import { GetLatestReviews } from "../../../API/Home";
import { DictionaryContext } from "../../../Context/DictionaryContext";

import "./index.scss";
import { WomanReview } from "../../../assets";

import { SingleReview } from "./SingleReview";

export interface IUserReview {
  name: string;
  review: string;
  latestBookPurchased: string;
  fakeTimeStamp: string;
}

export const LatestReviews = () => {
  const { dictionary } = useContext(DictionaryContext);

  const [reviews, setReviews] = useState<IUserReview[]>([]);

  const initLatestReviews = useCallback(async () => {
    const result = await GetLatestReviews();
    if (result) setReviews(result);
  }, []);

  useEffect(() => {
    initLatestReviews();
  }, [initLatestReviews]);

  return (
    <section className="latest-reviews-section">
      <div className="woman-review-img">
        <img alt="" src={WomanReview} />
      </div>
      <div className="latest-reviews-container">
        <h2>{dictionary.Home.latestReviews}</h2>
        <div>
          {reviews.map((review: IUserReview, index: number) => {
            return <SingleReview key={index} review={review} />;
          })}
        </div>
      </div>
    </section>
  );
};
