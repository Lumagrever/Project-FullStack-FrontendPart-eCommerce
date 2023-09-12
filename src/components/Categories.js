{/* 
import React, { useState } from 'react';
import {products} from '/.productsJson';


const categories = () => {

    const [productsData, setProductsData] = useState(products)
    // MANEJADOR DE FILTROS
    const handleFilter = (e) => {
      const filterValue = e.target.value
        if(filterValue === "Tazas") {
          const filteredProducts = products.filter((item) => item.category === "Tazas")
  
          setProductsData(filteredProducts)
        }
        if(filterValue === "Pijamas") {
          const filteredProducts = products.filter((item) => item.category === "Pijamas")
  
          setProductsData(filteredProducts)
        }
        if(filterValue === "Remeras") {
          const filteredProducts = products.filter((item) => item.category === "Remeras")
  
          setProductsData(filteredProducts)
        }
        if(filterValue === "Buzos") {
          const filteredProducts = products.filter((item) => item.category === "Buzos")
  
          setProductsData(filteredProducts)
        }
        console.log(productsData)
    }

return (
  <div className="flex items-center gap-8">
    <ul className="flex items-center gap-8">
      <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" onChange={handleFilter}>Juegos</li>
      <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" onChange={handleFilter}>Monturas</li>
      <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" onChange={handleFilter}>Mascotas</li>
      <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" onChange={handleFilter}>Transfiguraciones</li>
      <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" onChange={handleFilter}>Servicio de Juego</li>
      <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300" onChange={handleFilter}>Tiempo de Juego</li>
    </ul>
  </div>
)
};

export default categories;
*/}