import React from 'react'
import ButtonComp from './ButtonComp'

const CardComp = ({ image = null, cardTitle = null, isNews = false, descriptin = null, isUserNews = null }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {isNews ? <>
                {image ? <><img className="w-full h-48 object-cover" src={image} alt="Card Image" /></> : <><img className="w-full h-48 object-cover" src="https://via.placeholder.com/300x200" alt="Card Image" /></>}
                <div className="p-4" >
                    <h2 className="text-xl font-semibold text-gray-800">{cardTitle}</h2>
                    <p className="mt-2 text-gray-600">{descriptin}</p>

                    <div className=''>
                        <ButtonComp className='m-1' name='Edit' />
                        <ButtonComp name='Delete' />


                    </div>
                </div>
            </> : null}
            {isUserNews ? <>
                {image ? <><img className="w-full h-48 object-cover" src={image} alt="Card Image" /></> : <><img className="w-full h-48 object-cover" src="https://via.placeholder.com/300x200" alt="Card Image" /></>}
                <div className="p-4" >
                    <h2 className="text-xl font-semibold text-gray-800">{cardTitle}</h2>
                    <p className="mt-2 text-gray-600">{descriptin}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Learn More
                    </button>
                </div>
            </> : null}
        </div >

    )
}

export default CardComp