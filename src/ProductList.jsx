
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night and adds greenery to your home.', cost: 15 },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'A beautiful and easy-to-grow indoor plant.', cost: 12 },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'A lovely flowering plant for indoor spaces.', cost: 18 },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds a fresh, natural look to your home.', cost: 20 },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'A strong indoor plant with attractive leaves.', cost: 17 },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'A popular plant with useful natural gel.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop', description: 'Known for its calming fragrance.', cost: 20 },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop', description: 'A beautiful plant with a sweet fragrance.', cost: 18 },
      { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'An aromatic herb often used in cooking.', cost: 15 },
      { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'A refreshing herb used in drinks and food.', cost: 12 },
      { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'A fragrant herb with a citrus scent.', cost: 14 },
      { name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'A colourful flowering plant with a lovely scent.', cost: 22 },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { name: 'Oregano', image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg', description: 'An aromatic herb that can help deter some insects.', cost: 10 },
      { name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', description: 'A colourful flower popular in gardens.', cost: 8 },
      { name: 'Geraniums', image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg', description: 'A fragrant flowering plant for your garden.', cost: 20 },
      { name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'A useful herb that can help deter flies.', cost: 9 },
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop', description: 'A fragrant plant that can help deter some insects.', cost: 20 },
      { name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg', description: 'A fragrant herb that attracts cats.', cost: 13 },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Known for its soothing natural gel.', cost: 14 },
      { name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'A colourful flowering garden plant.', cost: 16 },
      { name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'A refreshing aromatic herb.', cost: 13 },
      { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'A fragrant herb traditionally used in teas.', cost: 14 },
      { name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'A flowering herb often used to make tea.', cost: 15 },
      { name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'A bright flower traditionally used in skincare.', cost: 12 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop', description: 'A hardy plant that needs little attention.', cost: 25 },
      { name: 'Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'A popular trailing plant that is easy to grow.', cost: 10 },
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'A resilient plant that needs little watering.', cost: 15 },
      { name: 'Cast Iron Plant', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg', description: 'A hardy plant that tolerates low light.', cost: 20 },
      { name: 'Succulents', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'Water-saving plants with unique shapes.', cost: 18 },
      { name: 'Aglaonema', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg', description: 'A colourful indoor plant that is easy to care for.', cost: 22 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const handleAddToCart = (plant, category) => {
    const id = `${category}-${plant.name}`;

    dispatch(
      addItem({
        ...plant,
        id,
        category,
      })
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <div className="tag">
          <div className="luxury">
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </div>

        <div className="nav-links">
          <button onClick={onHomeClick}>Home</button>
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map(group => (
            <section key={group.category} className="plant-category">
              <h2>{group.category}</h2>

              <div className="plant-list">
                {group.plants.map(plant => {
                  const id = `${group.category}-${plant.name}`;
                  const alreadyAdded = cart.some(item => item.id === id);

                  return (
                    <article className="plant-card" key={id}>
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <h4>${plant.cost.toFixed(2)}</h4>

                      <button
                        onClick={() => handleAddToCart(plant, group.category)}
                        disabled={alreadyAdded}
                      >
                        {alreadyAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
