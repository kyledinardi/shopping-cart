import PropTypes from 'prop-types';

function Stars({ rating }) {
  const starArray = [];

  for (let i = 0; i < Math.floor(rating); i += 1) {
    starArray.push(
      <span
        className='material-symbols-outlined'
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        star
      </span>,
    );
  }

  if (rating % 1 > 0.75) {
    starArray.push(<span className='material-symbols-outlined'>star</span>);
  }

  if (rating % 1 > 0.25 && rating % 1 <= 0.75) {
    starArray.push(
      <span className='material-symbols-outlined'>star_half</span>,
    );
  }

  for (let i = starArray.length; i < 5; i += 1) {
    starArray.push(<span className='material-symbols-outlined'>star</span>);
  }

  return (
    <div>
      {starArray.map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
}

Stars.propTypes = { rating: PropTypes.number };
export default Stars;
