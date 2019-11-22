import React from 'react';
import { useParams } from 'react-router-dom';
// import { useMutation } from '@apollo/react-hooks';

// import VerifyRegister from '../../graphQl/mutations/verifyRegister';

const Verify = () => {
  const { token } = useParams();

  // const [runVerifyRegister, { data }] = useMutation(VerifyRegister);
  // useEffect(() => {
  //   runVerifyRegister({ variables: token });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token]);
  // useEffect(() => {
  //   console.log("data ===>", data);
  // }, [data]);

  console.log(token);
  return <div>Hello</div>;
};

export default Verify;
