import PropTypes from 'prop-types';
import styles from '../style/QuantityInput.module.css';

function QuantityInput({ quantity, setQuantity }) {
  function handleQuantityChange(e) {
    if (e.target.value === '') {
      setQuantity('');
    }

    const newQuantity = Number(e.target.value);

    if (!Number.isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  }

  return (
    <div className={styles.quantity}>
      <button
        type='button'
        disabled={quantity <= 0}
        onClick={() => setQuantity(quantity - 1)}
      >
        <span className='material-symbols-outlined'>remove</span>
      </button>
      <input
        type='tel'
        name='quantity'
        id='quantity'
        value={quantity}
        onChange={handleQuantityChange}
        maxLength={2}
      />
      <button
        type='button'
        disabled={quantity >= 99}
        onClick={() => setQuantity(quantity + 1)}
      >
        <span className='material-symbols-outlined'>add</span>
      </button>
    </div>
  );
}

QuantityInput.propTypes = {
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
};

export default QuantityInput;
