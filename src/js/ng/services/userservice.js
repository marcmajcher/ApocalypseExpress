(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const userRoute = '/user';
  const accountRoute = `${userRoute}/account`;

  /* A service to interface with the user route */
  // TODO: refactor out resolve/rejects

  const UserService = function userService($http, $q) {
    return {
      getUser() {
        return $q((resolve, reject) => {
          $http.get(userRoute)
            .then((res) => {
                resolve(res.data);
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
        return $q((resolve, reject) => {
          $http.patch(accountRoute, pass)
            .then((res) => {
                resolve(res.data);
              },
              (err) => {
                reject(err);
              });
        });
      }
    };
  };

  angular.module('apox').factory('UserService', ['$http', '$q', UserService]);
})();
