import React from 'react';
import Home from './Home';
import Routes from '../../config/routes';

const HomeContainer = (props) => {
  return (
    <Home
      onAddRecPress={() => props.navigator.push(Routes.getRecInputRoute())}
      onCategoryPress={() => props.navigator.push(Routes.getCategoriesRoute())}
      onMovieQueuePress={() => props.navigator.push(Routes.getRecsRoute('movie'))}
    />
  );
};

HomeContainer.propTypes = {
  navigator: React.PropTypes.object,
};

export default HomeContainer;
