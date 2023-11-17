import React from 'react';

const OTPInput = ({ otp, setOtp, handleVerifyOtp }) => {
    const handleInputChange = (index, value) => {
        console.log(index, value);
        const newOtp = [...otp];
        newOtp[index] = value;

        if (index < newOtp.length - 1 && value !== '') {
            // Move focus to the next input
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        setOtp(newOtp);
        console.log(otp);
    };

    return (
        <div className='otp-input'>
            {otp.map((digit, index) => (
                <input
                    id={`otp-input-${index}`}
                    className='otp-box'
                    key={index}
                    type='text'
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                />
            ))}
            <button className='sign-btn' onClick={handleVerifyOtp}>
                Verify OTP
            </button>
        </div>
    );
};

export default OTPInput;
