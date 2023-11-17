import React, { useCallback, useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import OTPInput from './OTPInput';
import OtpInput from 'react-otp-input';


const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const customStyles = {
        input: {
            minWidth: '193px',
            minHeight: '26px',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            fontFamily: 'Roboto',
            color: 'var(--text-primary, #101920)',
            border: 'none !important',
            borderRadius: '0',
            // background: 'var(--background-white, #fff)',
            padding: '10px', // Adjust padding as needed
            boxSizing: 'border-box',
        },
        countrySelect: {
            // Your custom styles for the country select container
            border: 'none !important',
            // ...
        },
    };

    const verifyPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length === 12 && !isOtpSent) {
            const newPhoneNumber = phoneNumber.replace(/(\d{2})(\d{10})/,'+$1 $2');
            setPhoneNumber(newPhoneNumber);
            setIsOtpSent(!isOtpSent);
        } else {
            // alert('Please enter a valid phone number');
            toast.error('Please enter a valid phone number', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };
    const verifyOtp = useCallback(() => {

        if (otp === '5678') {
            // OTP is correct, perform login
            setLoggedIn(true);
            localStorage.setItem('loggedIn', 'true');
            window.location.replace('/');
            console.log('Logged in successfully');
        } else {
            console.log('Error: Incorrect OTP');
            toast.error('Please enter a valid OTP', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }, [otp]);

    useEffect(() => {
        if (otp.length === 4) {
            verifyOtp();
        }
    }, [otp, verifyOtp]);



    return (
        <div className="login-container">
            {!isOtpSent ? (
                <div>
                    {console.log(isOtpSent)}
                    <h2 className="sign">Sign In</h2>
                    <p className='descrip'>Please enter your mobile number to login. We will send an OTP to verify your number.</p>
                    <div className="phn">
                        <PhoneInput
                            placeholder='Phone Number'
                            // className="phn"
                            value={phoneNumber}
                            onChange={(value) => setPhoneNumber(value)}
                            country={'in'}
                            inputStyle={customStyles.input}
                            countrySelectProps={customStyles.contrySelect}
                        />
                    </div>
                    <button className='sign-btn' onClick={() => {verifyPhoneNumber(phoneNumber)}}>Sign In</button>
                    <ToastContainer />
                </div>
            ) : (
                <div className='otp'>
                    {console.log(isOtpSent)}
                    {/* <OTPInput otp={otp} setOtp={setOtp} handleVerifyOtp={handleVerifyOtp} /> */}
                    <h2 className="sign">OTP Verification</h2>
                    <p className='descrip'>We have sent and OTP to {phoneNumber}. Please enter the code received to verify.</p>
                    <OtpInput
                        value={otp}
                        onChange={(v) => {setOtp(v)}}
                        renderInput={(props, index) => <input {...props}
                            style={{
                                width: '78.54px',
                                maxWidth: '100px',
                                height: '77.209px',
                                margin: index === 0 ? '0' : '0 0 0 33.28px',
                                borderRadius: '8px',
                                background: 'var(--background-white, #FFF)',
                                border: '1px solid var(--Tertiary-Color, #D0D3D4)',
                                outline: 'none',
                                textAlign: 'center',
                            }} />}
                        // inputStyle={{
                        //     maxWidth: '100px',
                        //     width: '77.209px',
                        //     height: '77.209px',
                        //     fontSize: '24px',
                        //     margin: '0 33.28px 0 0',
                        //     display: 'flex',s
                        //     justifyContent: 'space-around',
                        //     borderRadius: '8px',
                        //     background: 'var(--background-white, #FFF)',
                        //     border: '1px solid var(--Tertiary-Color, #D0D3D4)',
                        //     outline: 'none',
                        //     textAlign: 'center',
                        // }}
                        focusStyle={{
                            borderColor: 'blue',
                        }}
                        isInputNum={true}
                        numInputs={4}
                    />
                    <button className='sign-btn' onClick={() => verifyOtp()}>Verify OTP</button>
                    <span className='span-txt'>Resend OTP</span>
                    <br />
                    <span className='span-txt' onClick={() => setIsOtpSent(!isOtpSent)}>Use another number</span>
                </div>
                // <div className='otp-input'>
                //     <input
                //         type='text'
                //         placeholder='Enter OTP'
                //         value={otp}
                //         onChange={(rrr) => setOtp(rrr.target.value)}
                //     />
                //     <button className='sign-btn'>Verify OTP</button>
                // </div>
            )
            }
        </div >
    );
};

export default Login;
