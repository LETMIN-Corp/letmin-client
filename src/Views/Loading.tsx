import { useEffect, useState } from "react";

const Cube : React.FC = () => {
    return (
        <div className='bg-primary w-5 h-5 mx-1 rounded-full'></div>
    );
}

export const Loading : React.FC = () => {
    const [percentage, setPercentage] = useState(0);
    const [percentageArray, setPercentageArray] = useState([]);

    useEffect(() => {
        let counter = setTimeout(() => {
            setPercentage(percentage + 1)
        }, 500);
        setPercentageArray([...percentageArray, percentage]);
        if(percentage > 10) {
            setPercentage(0);
            setPercentageArray([]);
            clearTimeout(counter);
        }
    }, [percentage]);

    return (
        <div className='bg-primary w-screen h-screen flex items-center justify-center'>
            <div className='bg-white flex items-center justify-center rounded-md w-3/12 py-5'>
                {
                    percentageArray.map((key) => <Cube key={key} />)
                }
            </div>
        </div>
    )
};

//  default Loading;
