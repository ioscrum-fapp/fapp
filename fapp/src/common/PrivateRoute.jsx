// import React, { useContext } from "react";
// import { Route, Navigate } from "react-router-dom";
// import { AuthContext } from "./Auth";
//
// // eslint-disable-next-line react/prop-types
// function PrivateRoute({ element: RouteComponent, ...rest }) {
//     const {currentUser} = useContext(AuthContext);
//     return (
//         <Route
//             /* eslint-disable-next-line react/jsx-props-no-spreading */
//             {...rest}
//             render={routeProps =>
//                 currentUser ? (
//                     // eslint-disable-next-line react/jsx-props-no-spreading
//                     <RouteComponent {...routeProps} />
//                 ) : (
//                     <Navigate to="/login" />
//                 )
//             }
//         />
//     );
// }
//
//
// export default PrivateRoute
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      {currentUser ? children : <Navigate to="/login" />}
    </React.Fragment>
  );
}

export default PrivateRoute;
