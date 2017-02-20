(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const userRoute = '/user';
  const accountRoute = `${userRoute}/account`;

  /* A service to interface with the user route */

  const UserService = function userService($http, $q) {
    return {
      getUser() {
        return $q((resolve, reject) => {
          $http.get(userRoute)
            .then((user) => {
                resolve(user.data);
              },
              (err) => {
                reject(err);
              });
        });
      },
      updateInfo(info) {
        return $q((resolve, reject) => {
          $http.patch(accountRoute, info)
            .then((res) => {
                resolve(res.data);
              },
              (err) => {
                reject(err);
              });
        });
      },
      changePassword(pass) {
        console.log('CHANGE PASS');
        console.log(pass);
      }
    };
  };

  angular.module('apox').factory('UserService', ['$http', '$q', UserService]);
})();
