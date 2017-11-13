import React from 'react';

export default ({ location }) => {
  return (
    <div className="NotFound">
      <h3>Nothing found for path <code>{location.pathname}</code></h3>
    </div>
  );
}
