import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';


const MAX_RATING = 5;
describe('Component: RatingStar', () => {
  it('should render correctly', () => {
    const rating = 2;
    render(
      <div>
        <RatingStars rating={rating} />
      </div>
    );

    expect(screen.getAllByAltText('star-rating icon').length).toBe(MAX_RATING);
    expect(screen.getAllByAltText('star-rating icon')[0]).toHaveAttribute('src', '/img/sprite/icon-full-star.svg');
    expect(screen.getAllByAltText('star-rating icon')[1]).toHaveAttribute('src', '/img/sprite/icon-full-star.svg');
    expect(screen.getAllByAltText('star-rating icon')[2]).toHaveAttribute('src', '/img/sprite/icon-star.svg');
    expect(screen.getAllByAltText('star-rating icon')[3]).toHaveAttribute('src', '/img/sprite/icon-star.svg');
    expect(screen.getAllByAltText('star-rating icon')[4]).toHaveAttribute('src', '/img/sprite/icon-star.svg');
  });
});
