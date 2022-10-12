import './index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthState } from './Contexts/AuthContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <AuthState>
            <App />
        </AuthState>
    </BrowserRouter>,
);
