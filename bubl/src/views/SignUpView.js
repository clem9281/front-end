import React from 'react';

const SignUpView = () => {
    return (  );
}
 
export default SignUpView;

const mapStateToProps = ({
    schoolsError,
    schools,
    gettingSchools,
    error,
    signingUp
  }) => ({
    error,
    schoolsError,
    schools,
    gettingSchools,
    signingUp
  });
  
  export default connect(
    mapStateToProps,
    { signUpStart, getSchoolsStart, clearError, loginStart }
  )(SignUpForm);