import React, { useState } from 'react'
import ButtonComp from './ButtonComp';
import { useRouter } from 'next/navigation';


const HoverDropdown = ({ isMcq = null, onclick, isShow = null, label, items, className }) => {



    const router = useRouter();
    const clicked = (topic, topicName, isMcq) => {

        if (isMcq) {
            console.log("topic", topic);
            // console.log("name", topicName)
            // router.push(`/ChapterWiseQuiz/${topic}&topicName=${topicName}`);
            router.push(`/ChapterWiseQuiz/${encodeURIComponent(topic)}&topicName=${encodeURIComponent(topicName)}`);

        } else {
            router.push(`/ChapterWiseSubjective/${topic}`);

        }

    };

    return (
        <div className='relative inline-block z-10 cursor-pointer' onClick={onclick} >
            <p className={`${className}`}>{label}</p>
            {isShow && (
                <div className='absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg'>
                    {items.map((item, index) => (

                        <div key={index} className='px-4 py=2'>
                            <div onClick={() => clicked(item.id, item.categoryName, isMcq)} className='font-semibold cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1'>
                                {item.categoryName}
                            </div>
                            {item.subItems && (
                                <div className='ml-4 mt-1'>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <div key={subIndex} className='cursor-pointer hover:bg-gray-100 ox-2 py-1 rounded-md'>
                                            {subItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default HoverDropdown