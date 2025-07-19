import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ProductPage() {
  const t = useTranslations('home')
  return (
<div>
  <Navbar/>
      <div className="bg-indigo-100 mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center container mx-auto px-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t('title')}
          </h1>
    <p className="text-lg text-black leading-relaxed">
     {t('p1')}
     <br />
     <br />
     {t('p2')}
    </p>
    <Link href="/features" className="p-1 border">Features</Link>
        </div>

        <div className="relative group shadow-lg rounded-xl overflow-hidden">
          <img
            src="https://www.fullstackgurupune.com/storage/blog_icons/1b94834e60fd7bc72ea07d7a9a6703de.jpeg"
            alt="Web development illustration"
            className="object-cover w-full h-96 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
</div>
  );
}
