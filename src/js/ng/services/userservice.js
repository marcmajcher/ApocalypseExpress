(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const userRoute = '/user';

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
        // action="/user/account?_method=PATCH" method="post"
        $('#myModal').modal('show');
        console.log('UPDATE INFO');
        console.log(info);
      },
      changePassword(pass) {
        console.log('CHANGE PASS');
        console.log(pass);
      }
    };
  };

  angular.module('apox').factory('UserService', ['$http', '$q', UserService]);
})();
