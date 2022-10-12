import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect, useState } from 'react';

interface ListButtonInterface {
    isCurrent?: boolean;
    handleClick: () => void;
}

const ListButton: React.FC<ListButtonInterface> = ({
    children,
    handleClick,
    isCurrent,
}) => {
    return (
        <button
            onClick={handleClick}
            className={`bg-bright-purple ${
                isCurrent ? 'bg-dark-purple' : ''
            } text-white text-center w-16 py-2 md:mx-3 mx-1 drop-shadow-lg lg:text-md text-sm hover:bg-bold-purple rounded-sm`}
        >
            {children}
        </button>
    );
};

interface ListInterface {
    data: ReactNode[];
    itemsPerPage: number;
}

const List: React.FC<ListInterface> = ({ data, itemsPerPage }) => {
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayNodes, setDisplayNodes] = useState<ReactNode[]>([]);

    useEffect(() => {
        setCurrentPage(1);
        setMaxPage(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        getNodes();
    }, [data, currentPage]);

    function getNodes() {
        const nodes: ReactNode[] = [];
        const min = (currentPage - 1) * itemsPerPage;
        const max = currentPage * itemsPerPage;
        for (let i = min; i < max; i++) {
            nodes.push(data[i]);
        }

        setDisplayNodes(nodes);
    }

    const [buttons, setButtons] = useState<number[]>([]);
    useEffect(() => {
        let buttons: number[] = [];
        if (maxPage > 1) {
            buttons = [currentPage - 1, currentPage, currentPage + 1];

            if (currentPage === 1) {
                buttons = [];
                buttons.push(currentPage);
                for (let i = currentPage + 1; i <= maxPage && i <= currentPage + 2; i++) {
                    buttons.push(i);
                }
            }
            if (currentPage === maxPage) {
                buttons = [];
                for (let i = currentPage - 2; i < currentPage; i++) {
                    if (i >= 1) {
                        buttons.push(i);
                    }
                }
                buttons.push(maxPage);
            }
        }
        setButtons(buttons);
    }, [currentPage, maxPage]);

    return (
        <>
            {displayNodes}
            <div className="flex justify-center w-full my-10 mr-40">
                {!!buttons.length && (
                    <>
                        <ListButton handleClick={() => setCurrentPage(1)}>
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </ListButton>
                        {buttons.map((page) => (
                            <ListButton
                                key={page}
                                isCurrent={currentPage === page}
                                handleClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </ListButton>
                        ))}
                        <ListButton handleClick={() => setCurrentPage(maxPage)}>
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </ListButton>
                    </>
                )}
            </div>
        </>
    );
};

export default List;
