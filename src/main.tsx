import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { installFetchPatch, setupExtensionErrorSuppression } from './utils/fetch-patch';

installFetchPatch();
setupExtensionErrorSuppression();

createRoot(document.getElementById('root')!).render(<App />);
