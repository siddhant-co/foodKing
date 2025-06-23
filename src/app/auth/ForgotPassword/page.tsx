'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



import { resetPasswordFailure, resetPasswordFlowReset, resetPasswordStart, resetPasswordSuccess, resetRequestFailure, resetRequestStart, resetRequestSuccess, verifyOtpFailure, verifyOtpStart, verifyOtpSuccess } from '../../../../store/slices/authSlice';
import { RootState } from '../../../../store/store';


export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { resetLoading, resetError, resetStep, resetSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Reset flow when component mounts
  useEffect(() => {
    dispatch(resetPasswordFlowReset());
  }, [dispatch]);

  // Clear inputs when reset succeeds
  useEffect(() => {
    if (resetSuccess) {
      setEmail('');
      setOtp('');
      setNewPassword('');
    }
  }, [resetSuccess]);

  const handleSendEmail = async () => {
    dispatch(resetRequestStart());

    try {
      const res = await fetch(
        'https://ecom-testing.up.railway.app/password-reset/request-reset',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        dispatch(resetRequestSuccess());
      } else {
        dispatch(resetRequestFailure(data.error || 'Failed to send OTP'));
      }
    } catch {
      dispatch(resetRequestFailure('Network error'));
    }
  };

  const handleVerifyOtp = async () => {
    dispatch(verifyOtpStart());

    try {
      const res = await fetch(
        'https://ecom-testing.up.railway.app/password-reset/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        dispatch(verifyOtpSuccess());
      } else {
        dispatch(verifyOtpFailure(data.error || 'OTP verification failed'));
      }
    } catch {
      dispatch(verifyOtpFailure('Network error'));
    }
  };

  const handleResetPassword = async () => {
    dispatch(resetPasswordStart());

    try {
      const res = await fetch(
        'https://ecom-testing.up.railway.app/password-reset/reset-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        dispatch(resetPasswordSuccess());
      } else {
        dispatch(resetPasswordFailure(data.error || 'Password reset failed'));
      }
    } catch {
      dispatch(resetPasswordFailure('Network error'));
    }
  };

  const handleResetFlow = () => {
    dispatch(resetPasswordFlowReset());
    setEmail('');
    setOtp('');
    setNewPassword('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded space-y-4 bg-white shadow">
      {resetStep === 1 && (
        <>
          <p>Enter your email to receive a verification OTP.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={resetLoading}
            autoComplete="email"
          />
          <button
            onClick={handleSendEmail}
            disabled={!email || resetLoading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {resetLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      )}

      {resetStep === 2 && (
        <>
          <p>Enter the OTP sent to your email.</p>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={resetLoading}
            autoComplete="one-time-code"
          />
          <button
            onClick={handleVerifyOtp}
            disabled={!otp || resetLoading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {resetLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {resetStep === 3 && (
        <>
          <p>Enter your new password.</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={resetLoading}
            autoComplete="new-password"
          />
          <button
            onClick={handleResetPassword}
            disabled={!newPassword || resetLoading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {resetLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </>
      )}

      {resetSuccess && (
        <>
          <p className="text-green-600 font-semibold">
            Password reset successful! You can now log in.
          </p>
          <button
            onClick={handleResetFlow}
            className="w-full bg-gray-300 py-2 rounded"
          >
            Reset again
          </button>
        </>
      )}

      {resetError && <p className="text-red-600">{resetError}</p>}
    </div>
  );
}
