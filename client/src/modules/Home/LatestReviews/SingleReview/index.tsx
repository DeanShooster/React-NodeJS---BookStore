import "./index.scss";

import { IUserReview } from "..";

interface ISingleReview {
  review: IUserReview;
}

export const SingleReview = ({ review }: ISingleReview) => {
  return (
    <div className="user-review-wrapper">
      <time>{review.fakeTimeStamp}</time>
      <p>{review.name}</p>
      <hr />
      <p>{review.review}</p>
      <span>{review.latestBookPurchased}</span>
    </div>
  );
};
