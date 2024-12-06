"use client"
import React from 'react';
import { Smile, Heart, Brain, MessageCircle, HelpCircle } from 'lucide-react';

const chips = [
    { label: "মানসিক চাপের সমাধান", icon: <Brain size={20} /> },
    { label: "নিজের অনুভূতি প্রকাশ করুন", icon: <Heart size={20} /> },
    { label: "পরামর্শ নিন", icon: <Smile size={20} /> },
    { label: "আপনার গল্প বলুন", icon: <MessageCircle size={20} /> },
    { label: "সহায়তা প্রয়োজন", icon: <HelpCircle size={20} /> },
];

const ChipSection = () => {
    return (
        <div className="flex flex-wrap gap-4 p-4">
            {chips.map((chip, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 text-primary bg-white border border-primary rounded-full shadow hover:bg-[#E81046] hover:text-white cursor-pointer transition"
                    style={{ borderColor: '#E81046', color: '#E81046' }}
                >
                    <div className="hover:text-white">{chip.icon}</div>
                    <span className="text-sm font-medium hover:text-white">{chip.label}</span>
                </div>
            ))}
        </div>
    );
};

export default ChipSection;
