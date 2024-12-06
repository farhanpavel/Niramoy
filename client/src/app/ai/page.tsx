"use client"
import ChipSection from '@/components/ai/page';
import Image from 'next/image';
import React from 'react';

const AIPromptPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Image src="/images/logo.png" height={200} width={200} alt="AI Logo" className="w-36 h-36" />
            <p className="mt-5 text-lg text-center">
                আপনার সমস্যাগুলো বলুন, নীরাময় আপনাদের সহায়তায় আছ।
            </p>
            <div className="mt-5"/>
            <input 
                type="text" 
                placeholder="আপনার সমস্যাগুলো লিখুন..." 
                className="w-[70vw] mx-28 mt-5 p-5 rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E81046]" 
            />
            <button className="mt-5 px-10 py-3 rounded-full bg-[#E81046] text-white cursor-pointer">
                জমা দিন
            </button>
            <div className="mt-6"/>
            <ChipSection />
        </div>
    );
};

export default AIPromptPage;