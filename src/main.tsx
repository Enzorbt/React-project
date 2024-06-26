import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import App from './App';
import HomePage from './components/homePage/HomePage.tsx';
import AdvancedSearchPage from './components/search/AdvancedSearchPage.tsx';
import ObjectPage from './components/object/ObjectPage.tsx';
import SearchModel from './models/SearchModel';
import ObjectModel from "./models/ObjectModel.tsx";
import FlashesProvider from "./providers/FlashesProvider.tsx";
import DepartmentModel from "./models/DepartmentModel.tsx";

const objectModel = new ObjectModel('https://collectionapi.metmuseum.org/public/collection/v1')
const searchModel = new SearchModel('https://collectionapi.metmuseum.org/public/collection/v1', objectModel);
const departmentModel = new DepartmentModel('https://collectionapi.metmuseum.org/public/collection/v1');

ReactDOM.createRoot(document.getElementById('root')!).render(    
    <React.StrictMode>
        {/*<BrowserRouter>*/}
        <Router>
            <FlashesProvider>
                <Routes>
                    <Route 
                        path="/" 
                        element={<App />}>
                        <Route 
                            index 
                            element={<HomePage 
                                searchModel={searchModel} />} />
                        <Route 
                            path="search" 
                            element={<AdvancedSearchPage 
                                objectModel={objectModel}
                                searchModel={searchModel}
                                departmentModel={departmentModel}
                        />} />
                        <Route path="objects/:objectId" element={<ObjectPage
                            objectModel={objectModel}
                        />} />
                    </Route>
                </Routes>
            </FlashesProvider>
        </Router>
        {/*</BrowserRouter>*/}
    </React.StrictMode>,
);
