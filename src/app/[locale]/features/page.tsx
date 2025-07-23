'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  Link from 'next/link';
import { useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';

interface LocalizedString {
  en: string;
  hi?: string;
  [key: string]: string | undefined; 
}
type Product = {
  _id: string;
  image?: string;
  name?: LocalizedString;
  link: String;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const locale = useLocale();
    const translate = (text?: LocalizedString) => text?.[locale] ?? text?.en ?? "";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/products'); 
        setProducts(response.data);
      } catch (err) {
      }
    }

    fetchProducts();
  }, []);
  return (
 <div>
  <Navbar/>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto p-4 md:p-10">

      {products.map(product =>(
         <div key={product._id} className="border rounded-lg p-4 shadow-sm flex flex-col items-center ">
        {/* <img src={product.image} alt={'Product Image'} className="w-full h-72 object-center rounded" /> */}

         {product.link ? (
        <Link href="#" className="text-xl font-semibold mt-4">{translate(product.name)}</Link>
         ): (
        <Link href="#" className="text-xl font-semibold mt-4">{translate(product.name)}</Link>
         )}

      </div>
      ))}
      
    </div>
 </div>
  );
};

export default Products;



