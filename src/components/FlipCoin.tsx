'use client';

import {useState} from "react";
import Image from 'next/image'

const FlipCoin = () => {
    const [coinSideHead, setCoinSideHead] = useState<boolean>(true)
    const [isEditing, setIsEditing] = useState(false)


    const randomEnumValue = () => {
        const values = Object.keys(CoinSide);
        return values[Math.floor(Math.random() * values.length)];
    }


    const setCoinSideHandler = () => {
        const enumValue: string = randomEnumValue()
        if (enumValue === 'Mynt') {
            setIsEditing(true)
            setTimeout(() => {
                setIsEditing(false)
                setCoinSideHead(true)
            }, 1500);
        } else {
            setIsEditing(true)
            setTimeout(() => {
                setIsEditing(false)
                setCoinSideHead(false)
            }, 1500);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center w-1/2 lg:w-1/3">
            <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Kast 1-kronen</h1>
            {coinSideHead && !isEditing &&
                <div>
                    <Image
                        src="kron.jpg"
                        alt="heads coin"
                        width={200}
                        height={200}
                    />
                    <p className="mt-2 flex items-center justify-center">Kron</p>
                </div>
            }
            {!coinSideHead && !isEditing &&
                <div>
                    <Image
                        src="mynt.jpg"
                        alt="tails coin"
                        width={200}
                        height={200}
                    />
                    <p className="mt-2 flex items-center justify-center">Mynt</p>
                </div>
            }
            {isEditing &&
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src="kron-mynt.gif"
                        alt="head or tails image loop"
                        width={200}
                        height={200}
                    />
                    <p className="mt-2 flex items-center justify-center">Kron eller mynt</p>
                    <button className="flex flex-row mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Kaster...
                    </button>
                </div>
            }
            {!isEditing &&
                <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={setCoinSideHandler}>Kast
                </button>
            }
        </div>
    );
};


enum CoinSide {
    Kron = "KRON",
    Mynt = "MYNT",
}

export default FlipCoin;
