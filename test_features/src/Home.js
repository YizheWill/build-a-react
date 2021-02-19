import React from 'react';

// be careful, key will not be passed down, React.CreatElement prevent key/ref to be passed
function Home({ hello }) {
  return (
    <div>
      <h1>{hello}: Hello</h1>
    </div>
  );
}
Home.defaultProps = { hello: 'World' };

export default Home;
