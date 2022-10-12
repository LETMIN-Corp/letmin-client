interface ItemInterface {
    isActivated?: boolean;
    handleClick: () => void;
}

const PageItem: React.FC<ItemInterface> = ({ isActivated, handleClick }) => {
    return (
        <span
            onClick={handleClick}
            className={`bg-primary drop-shadow-md block rounded-full w-4 h-4 mx-1 cursor-pointer ${[
                isActivated ? 'bg-dark-purple' : '',
            ]}`}
        ></span>
    );
};

interface ComponentInterface {
    max: number;
    current: number;
    handleClick: (arg: number) => void;
}

const Pagination: React.FC<ComponentInterface> = ({ max, current, handleClick }) => {
    const pages = [];

    for (let i = 0; i <= max; i++) {
        pages.push(
            <PageItem
                key={i}
                isActivated={i === current}
                handleClick={() => handleClick(i)}
            />,
        );
    }

    return <div className="flex justify-center">{pages}</div>;
};

export default Pagination;
