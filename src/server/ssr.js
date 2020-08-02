import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { routes } from '../Router';
import App from '../App';
import { store } from '../store/store';

/**
 * Render React SSR application
 *
 * @param {*} request
 * @param {*} response
 */
export const renderReactApp = async (request, response) => {

    // allow only GET request
    if (request.method !== 'GET') {
        response
            .status(400)
            .set('Content-Type', 'text/html')
            .send('Bad request');
        return;
    }

    try {
        // const dataRequirements = Promise.all(getDataRequirementsForRoute(request.originalUrl, routes));
        const renderedReactApp = renderReact(request.url, store);

        // send response
        response
            .status(200)
            .set('Content-Type', 'text/html')
            .render('ssr', {
                helmet: renderedReactApp.helmet,
                cssBundles: [],
                jsBundles: [],
                reactDom: renderedReactApp.reactDom,
                reduxState: JSON.stringify(renderedReactApp.reduxState)
            });
    } catch (e) {
        console.log(e);
        response.status(500).set('Content-Type', 'text/html').send('Internal server error');
    }
};

/**
 * Get data requirements
 *
 * @param {*} url
 * @param {*} routes
 */
const getDataRequirementsForRoute = async (url, routes) => {
    return routes
        .filter(route => matchPath(url, route)) // filter matching paths
        .map(route => route.component) // map to components
        .filter(component => component.fetchOnSsr) // check if components have data requirement
        .map(component => store.dispatch(component.fetchOnSsr()));
};

/**
 * Render react app
 */
const renderReact = (url, store, routerContext = {}) => {
    const jsx = (
        <Provider store={store}>
            <StaticRouter context={routerContext} location={url}>
                <App />
            </StaticRouter>
        </Provider>
    );

    return {
        reactDom: renderToString(jsx),
        reduxState: store.getState(),
        helmet: Helmet.renderStatic()
    };
};