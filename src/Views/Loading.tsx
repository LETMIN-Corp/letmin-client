import LoadingGif from '../Assets/loading.gif';

const Loading : React.FC = () => {

    return (
        <div>
            <img src={ LoadingGif } alt="...loading" style={{ width: '200px', margin: ' 40px auto', display: 'block' }}/>
        </div>
    )
};

export default Loading;
