import './index.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthState } from './Contexts/AuthContextProvider';

ReactDOM.render(
    <BrowserRouter>
        <AuthState>
            <App />
        </AuthState>
    </BrowserRouter>,
    document.getElementById('root'),
);
