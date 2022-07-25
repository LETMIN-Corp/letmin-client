import { ReactNode, useEffect, useState } from "react";

interface ListButtonInterface {
    handleClick: () => void,
}

const ListButton : React.FC<ListButtonInterface> = ({ children, handleClick }) => {
    return (
        <button onClick={ handleClick } className='bg-bright-purple text-white text-center w-16 py-2 md:mx-3 mx-1 drop-shadow-lg lg:text-md text-sm hover:bg-bold-purple rounded-sm'>
            { children }
        </button>
    );
}

interface ListInterface {
    data: ReactNode[],
    itemsPerPage: number,
}

const List : React.FC<ListInterface> = ({ data, itemsPerPage }) => {
    const maxPage = Math.ceil(data.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayNodes, setDisplayNodes] = useState<ReactNode[]>([]);

    useEffect(() => {
        let nodes : ReactNode[] = [];
        let min = (currentPage - 1) * itemsPerPage;
        let max = currentPage * itemsPerPage
        for(let i = min; i < max; i++) {
            nodes.push(data[i]);
        }

        setDisplayNodes(nodes);
    }, [currentPage]);

    return (
        <>
            {
                displayNodes
            }
            <div className='flex justify-center w-full my-10 mr-40'>
                <ListButton handleClick={ () => setCurrentPage(1) }>
                    <i className="fa-solid fa-chevron-left"></i>
                </ListButton>
                <ListButton handleClick={ () => setCurrentPage(maxPage) }>
                    <i className="fa-solid fa-chevron-right"></i>
                </ListButton>
            </div>
        </>
    );
}

export default List;
