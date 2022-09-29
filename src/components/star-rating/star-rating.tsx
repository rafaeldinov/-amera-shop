type Props = {
  rating: number;
}

export default function StarRating({rating}: Props): JSX.Element {
  const STARS_COUNT = 5;
  return (<>{Array.from(Array(STARS_COUNT), (_, index) => <img src={(index < rating) ? '/img/sprite/icon-full-star.svg' : '/img/sprite/icon-star.svg'} alt="star-rating icon" width="17" height="16" aria-hidden="true" key={index} />)}</>);
}
