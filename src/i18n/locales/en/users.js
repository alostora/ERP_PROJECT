export default {
     title: 'Users',
     id: '#',
     name: 'Name',
     email: 'Email',
     phone: 'Phone',
     address: 'Address',
     password: 'Password',
     confirmPassword: 'Confirm Password',
     accountType: 'Account Type',
     createdAt: 'Created At',
     updatedAt: 'Updated At',
     passwordLeaveBlank: 'Password (leave blank to keep same)',
     selectAccountType: 'Select Account Type',
     allAccountTypes: 'All Account Types',

     // Validation messages
     validation: {
          nameRequired: 'Name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email address',
          passwordRequired: 'Password is required',
          passwordMinLength: 'Password must be at least 6 characters',
          confirmPasswordRequired: 'Please confirm your password',
          passwordsDoNotMatch: 'Passwords do not match',
          accountTypeRequired: 'Account type is required',
          phoneRequired: 'Phone number is required',
     },

     // Success messages
     success: {
          created: 'User created successfully',
          updated: 'User updated successfully',
          deleted: 'User deleted successfully',
     },

     // Error messages
     error: {
          notFound: 'User not found',
          emailExists: 'Email already exists',
          phoneExists: 'Phone number already exists',
          createFailed: 'Failed to create user',
          updateFailed: 'Failed to update user',
          deleteFailed: 'Failed to delete user',
     },
}