import PropTypes from 'prop-types';

function Stars({ rating }) {
  const starArray = [];

  for (let i = 0; i < Math.floor(rating); i += 1) {
    starArray.push(
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <title>star</title>
        <path d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z' />
      </svg>,
    );
  }

  if (rating % 1 > 0.75) {
    starArray.push(
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <title>star</title>
        <path d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z' />
      </svg>,
    );
  }

  if (rating % 1 > 0.25 && rating % 1 <= 0.75) {
    starArray.push(
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <title>star-half-full</title>
        <path d='M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z' />
      </svg>,
    );
  }

  for (let i = starArray.length; i < 5; i += 1) {
    starArray.push(
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <title>star-outline</title>
        <path d='M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z' />
      </svg>,
    );
  }

  return (
    <div>
      {starArray.map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
}

Stars.propTypes = {
  rating: PropTypes.number,
};

export default Stars;
