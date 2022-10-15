import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';


const MAX_RATING = 5;
describe('Component: RatingStar', () => {
  it('should render correctly', () => {
    const rating = MAX_RATING;

    render(
      <div>
        <RatingStars rating={rating} />
      </div>
    );

    expect(screen.getAllByTestId(/stars/i)).toBeInTheDocument();
  });
});
