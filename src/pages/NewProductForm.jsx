import { useNavigate } from 'react-router-dom';
import backendFetch from '../helpers/backendFetch';
import styles from '../style/NewProductForm.module.css';

function NewProductForm() {
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', document.getElementById('image').files[0]);
    formData.append('title', document.getElementById('title').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('price', document.getElementById('price').value);

    formData.append(
      'description',
      document.getElementById('description').value,
    );

    const response = await backendFetch('/products', {
      method: 'POST',
      body: formData,
    });

    navigate(`/products/${response.product._id}`);
  }

  return (
    <div className={styles.wrapper}>
      <main>
        <div className={styles.newProductForm}>
          <h1>Add a New Product</h1>
          <form onSubmit={submitProduct} encType='multipart/form-data'>
            <div className={styles.field}>
              <label htmlFor='title'>Product Name</label>
              <input type='text' name='title' id='title' required />
            </div>
            <div className={styles.field}>
              <label htmlFor='category'>Category</label>
              <select name='category' id='category' required>
                <option value=''></option>
                <option value="men's clothing">Men&apos;s Clothing</option>
                <option value="women's clothing">Women&apos;s Clothing</option>
                <option value='jewelry'>Jewelry</option>
                <option value='electronics'>Electronics</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor='price'>Price </label>
              <div className={styles.price}>
                <span>$</span>
                <input
                  type='number'
                  id='price'
                  name='price'
                  min='0.01'
                  max='10000'
                  step='0.01'
                  required
                />
              </div>
            </div>
            <div className={styles.image}>
              <label htmlFor='image'>Image</label>
              <input
                type='file'
                name='image'
                id='image'
                accept='image/*'
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='description'>Description</label>
              <textarea
                name='description'
                id='description'
                cols='30'
                rows='10'
                required
              ></textarea>
            </div>
            <button className='bigButton'>Submit Product</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewProductForm;
