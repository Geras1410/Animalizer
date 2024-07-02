import React, { useState } from 'react';

interface RequestPasswordResetProps {
  onCodeSent: () => void;
}

const RequestPasswordReset: React.FC<RequestPasswordResetProps> = ({ onCodeSent }) => {
  const [email, setEmail] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el correo con el código de verificación
    console.log('Email sent to:', email);
    setIsEmailSent(true);
    onCodeSent(); // Llamar a la función para actualizar el estado en el componente padre
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {!isEmailSent ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Send Verification Code
            </button>
          </form>
        ) : (
          <div>
            <p className="text-green-600">Verification code sent to your email.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
