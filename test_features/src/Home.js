import React from 'react';
import { Link } from 'react-router-dom'

// be careful, key will not be passed down, React.CreatElement prevent key/ref to be passed
function Home({ hello }) {
  return (
    <div>
      <h1>{hello}: Hello</h1>
      <Link
        to={{
          pathname: "/home",
          state: { val: 1 }
        }}
      > a link</Link>
    </div >
  );
}
Home.defaultProps = { hello: 'World' };

export default Home;
