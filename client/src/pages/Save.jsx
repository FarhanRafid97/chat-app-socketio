import React from 'react';
import Cookies from 'js-cookie';
const Save = () => {
  const user = Cookies.get('Token');
  console.log(user);
  return <div>user</div>;
};

export default Save;
