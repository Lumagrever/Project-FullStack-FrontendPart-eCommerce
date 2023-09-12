import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';

const Products = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [visibleProductCount, setVisibleProductCount] = useState(8);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilter = (category) => {
    if (category === 'Todos') {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter((item) => item.category === category);
      setFilteredProducts(filteredProducts);
    }
    setSelectedCategory(category);
    setVisibleProductCount(8);
  };

  const handleLoadMore = () => {
    setVisibleProductCount((prevCount) => prevCount + 8);
  };

  const handleLoadLess = () => {
    setVisibleProductCount((prevCount) => Math.max(prevCount - 8, 8));
  };

  const canLoadMore = visibleProductCount < filteredProducts.length;

  return (
    <div className="py-10">
      <div id="products-section" className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">Productos</h1>
        <span className="w-20 h-[3px] bg-black"></span>
        <ul className="flex flex-wrap justify-center items-center gap-8 ml-2 mr-2">
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Todos' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Todos')}
          >
            Todos
          </li>
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Juegos' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Juegos')}
          >
            Juegos
          </li>
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Monturas' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Monturas')}
          >
            Monturas
          </li>
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Mascotas' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Mascotas')}
          >
            Mascotas
          </li>
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Transfiguraciones' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Transfiguraciones')}
          >
            Transfiguraciones
          </li>
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Servicio de Juego' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Servicio de Juego')}
          >
            Servicio de Juego
          </li>
          <li
            className={`text-base font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 ${
              selectedCategory === 'Tiempo de Juego' ? 'text-orange-600' : 'text-black'
            }`}
            onClick={() => handleFilter('Tiempo de Juego')}
          >
            Tiempo de Juego
          </li>
        </ul>
      </div>
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10">
        {filteredProducts.slice(0, visibleProductCount).map((item) => (
          <ProductsCard key={item.id} product={item} />
        ))}
      </div>
      <div className="flex justify-center">
        {canLoadMore ? (
          <button
            className="text-black font-bold text-sm rounded-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800 rounded-b-2xl py-2 px-4 mr-4"
            onClick={handleLoadMore}
          >
            Ver más
          </button>
        ) : null}
        {visibleProductCount > 8 ? (
          <button
            className="text-black font-bold text-sm bg-gradient-to-t from-orange-500 to-orange-300 hover:from-orange-600 hover:to-orange-400 border border-orange-900 active:border-yellow-800 rounded-b-2xl py-2 px-4 rounded-sm"
            onClick={handleLoadLess}
          >
            Ver menos
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Products;