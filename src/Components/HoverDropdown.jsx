import React, { useState } from 'react'
import ButtonComp from './ButtonComp';
import { useRouter } from 'next/navigation';

const HoverDropdown = ({ isMcq = null, onclick, isShow = null, label, items }) => {


    const router = useRouter();
    const clicked = (topic, isMcq) => {

        if (isMcq) {
            router.push(`/ChapterWiseQuiz/${topic}`);

        } else {
            router.push(`/ChapterWiseSubjective/${topic}`);

        }

    };

    return (
        <div className='relative inline-block z-10' onClick={onclick} >
            <ButtonComp name={label} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' />
            {isShow && (
                <div className='absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg'>
                    {items.map((item, index) => (
                        <div key={index} className='px-4 py=2'>
                            <div onClick={() => clicked(item.main, isMcq)} className='font-semibold cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1'>
                                {item.main}
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