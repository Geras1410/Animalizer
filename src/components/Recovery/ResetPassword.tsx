import React, { useState } from 'react';

const ResetPassword: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Aquí iría la lógica para verificar el código y cambiar la contraseña
    console.log('Code:', code, 'New Password:', newPassword);
    setIsPasswordReset(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {!isPasswordReset ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="code" className="block text-gray-700">
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={handleCodeChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div>
            <p className="text-green-600">Password has been successfully reset.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
