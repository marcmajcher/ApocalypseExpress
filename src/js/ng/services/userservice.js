(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const userRoute = '/user';

  /* A service to interface with the user route */

  const UserService = function userService($http, $q) {
    return {
      getUser: function getUser() {
        return $q((resolve, reject) => {
          $http.get(userRoute)
            .then((user) => {
                resolve(user.data);
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
