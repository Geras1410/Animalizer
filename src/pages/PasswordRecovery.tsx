import React, { useState } from 'react';
import RequestPasswordReset from '../components/Recovery/RequestPasswordReset';
import ResetPassword from '../components/Recovery/ResetPassword';

const PasswordRecovery: React.FC = () => {
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

    const handleCodeSent = () => {
        setIsCodeSent(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {!isCodeSent ? (
                <RequestPasswordReset onCodeSent={handleCodeSent} />
            ) : (
                <ResetPassword />
            )}
        </div>
    );
};

export default PasswordRecovery;