import type { NextPage } from 'next';

import { useState } from 'react';

const AuthenticationPage: NextPage = () => {
  const [toSignIn, setToSignIn] = useState(false);

  return <div>Users Page</div>;
};

export default AuthenticationPage;
