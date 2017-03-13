'use strict';

module.exports = function(app) {
  const User = app.models.user;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const Team = app.models.Team;

  User.create([
    // TODO: move administrator user data to environment.js
    {username: 'administrator', email: 'admin@tenoften.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      // Attach user administrator with admin role
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