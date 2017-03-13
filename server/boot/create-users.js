'use strict';

module.exports = function(app) {
  const User = app.models.user;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const Team = app.models.Team;

  User.create([
      {username: 'John', email: 'john@doe.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};