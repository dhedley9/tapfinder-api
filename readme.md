User Management via models

```
// Create a user
const user = await User.create({
    email: 'user@example.com',
    firstName: 'Glen',
    lastName: 'Turner',
    role: 'standard',
    password: 'password', // This will get peppered + salted + hashed
});

// User to JSON
console.log( user.toJSON() );

// Update a user
user.lastLogin = new Date();
await user.save();

// Delete a user
await user.destroy();

// Find all users
const users = await User.findAll();

// Find a specific user
const user = await User.findOne({
    where: {
        email: 'user@example.com',
    },
});
```