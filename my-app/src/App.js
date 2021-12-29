import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
  RefinementList,
  Pagination
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import { connectHitInsights } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  '2CSWU3EMWB',
  'dbf0d699c2c6a9a017f1fb7ccff1e1dd'
);

const HitWithInsights = connectHitInsights(window.aa)(Hit);

// Initialize the Insights client.
window.aa('init', {
  appId: '2CSWU3EMWB',
  apiKey: 'dbf0d699c2c6a9a017f1fb7ccff1e1dd',
});

// Set a global userToken
window.aa('setUserToken', 'user-1');

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">frontend-algolia</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="products">
          <div className="search-panel">
            <div className="search-panel__filters">
              <Configure facets={['*']} maxValuesPerFacet={40} clickAnalytics />
              <h2>brand</h2>
              <RefinementList attribute="brand" />

              <h2>categories</h2>
              <RefinementList attribute="categories" />

              
            </div>

            <div className="search-panel__results">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: '',
                }}
              />
              {/* <Hits hitComponent={Hit} /> */}
              <Hits hitComponent={HitWithInsights} />


              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}


function Hit(props) {
  return (
    <article onClick={() =>
      props.insights('clickedObjectIDsAfterSearch', {
          eventName: 'Product Clicked'
      })
      }>
      <p>
        <img src={props.hit.image} alt={props.hit.description}></img>
        <h3>{props.hit.name}</h3>
        <p>{JSON.stringify(props.hit.description).slice(0,100)}...</p>
        <h5>{props.hit.price} DKT</h5>

       {/*  <code>{JSON.stringify(props.hit).slice(0, 200)}...</code> */}
      </p>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
