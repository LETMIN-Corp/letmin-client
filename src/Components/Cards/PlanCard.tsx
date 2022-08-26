import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ComponentInterface {
    card : {
        title: string,
        description: string,
        price: string,
        text: string,
        features: string[],
        handleClick?: () => void,
    },
    selected?: boolean,
}

const PlanCard : React.FC<ComponentInterface> = ({ card, selected }) => {
    return (
        <div className={`${[selected ? 'growth-animation' : '']} bg-white my-12 xl:w-4/12 max-w-md mx-auto lg:mx-8 drop-shadow-xl cursor-pointer rounded-lg`} onClick={ card.handleClick }>
            <div className='text-center px-5 py-4 text-xl xl:text-2xl font-bold bg-primary text-white rounded-t-lg'>
                <div>{ card.title }</div>
                <div>{ card.price }</div>
            </div>
            <div className='px-5 py-5'>
                {
                    card.features.map((feature, key) => (
                        <div key={ key } className='flex items-center my-4'>
                            <FontAwesomeIcon icon={ faCircleCheck } className='text-2xl xl:text-4xl mr-3 text-green' />
                            <span className='xl:text-lg'>{ feature }</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PlanCard;
