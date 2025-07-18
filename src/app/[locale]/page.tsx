
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocale } from 'next-intl';

interface LocalizedString {
  en: string;
  hi?: string;
  [key: string]: string | undefined; 
}
type Product = {
  _id: string;
  name?: LocalizedString;
  features?: LocalizedString;
};

export default function Home() {
  const [features, setFeatures] = useState<Product[]>([]);
  const locale = useLocale();
  const translate = (text?: LocalizedString) => text?.[locale] ?? text?.en ?? "";

  useEffect(() => {
    axios.get('/api/features')
      .then((res) => {
        setFeatures(res.data);
      })
      .catch((err) => {
        console.error('Error fetching features:', err);
      });
  }, []);
  return (
    <div className="bg-indigo-100 mx-auto px-6 py-16">
       <div className="grid md:grid-cols-2 gap-12 items-center container mx-auto px-10">
     {features.map(feature => (
        <div key={feature._id} >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
         {translate(feature.name)}
          </h1>
    <div className="flex flex-col gap-5">
   {translate(feature.features)?.split('.').map((line, i) =>
  line.trim() ? <p key={i}>{line.trim()}.</p> : null
)}

</div>

        </div>
     ))}
     
        <div className="relative group shadow-lg rounded-xl overflow-hidden">
          <img
            src="https://www.fullstackgurupune.com/storage/blog_icons/1b94834e60fd7bc72ea07d7a9a6703de.jpeg"
            alt="Web development"
            className="object-cover w-full h-96 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
