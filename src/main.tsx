import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { AuthState } from "./Contexts/AuthContextProvider";

ReactDOM.render(
	<BrowserRouter>
		<AuthState>
			<App />
		</AuthState>
	</BrowserRouter>,
	document.getElementById('root')
)
