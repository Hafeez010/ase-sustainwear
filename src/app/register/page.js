"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [roleCode, setRoleCode] = useState('');
  const [roleError, setRoleError] = useState('');
  const [formErrors, setFormErrors] = useState({
   

    usernameError: '',
    firstNameError: '',
    lastNameError: '',
    dobError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const router = useRouter();

  const validateFields = () => {
    const errors = {};

    if (!username) errors.usernameError = 'Username is required';
    if (!firstName) errors.firstNameError = 'First name is required';
    if (!lastName) errors.lastNameError = 'Last name is required';
    if (!dob) errors.dobError = 'Date of birth is required';
    if (!password) errors.passwordError = 'Password is required';
    if (!confirmPassword) errors.confirmPasswordError = 'Confirm password is required';
    if (password !== confirmPassword) errors.confirmPasswordError = 'Passwords do not match';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) return;

    setError('');

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, firstName, lastName, dob, password, roleCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to sign up");
      } else {
        console.log("Form submitted successfully");
        alert("Registration successful!");

        router.push("/login"); 
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const isFormValid = username && firstName && lastName && dob && password && confirmPassword && password === confirmPassword && Object.values(formErrors).every((error) => error === '');

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
        <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setFormErrors({ ...formErrors, usernameError: '' }); }}
            />
            {formErrors.usernameError && <p className="text-red-500 text-sm">{formErrors.usernameError}</p>}

            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setFormErrors({ ...formErrors, firstNameError: '' }); }}
            />
            {formErrors.firstNameError && <p className="text-red-500 text-sm">{formErrors.firstNameError}</p>}

            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setFormErrors({ ...formErrors, lastNameError: '' }); }}
            />
            {formErrors.lastNameError && <p className="text-red-500 text-sm">{formErrors.lastNameError}</p>}

            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={dob}
              onChange={(e) => { setDob(e.target.value); setFormErrors({ ...formErrors, dobError: '' }); }}
            />
            {formErrors.dobError && <p className="text-red-500 text-sm">{formErrors.dobError}</p>}

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFormErrors({ ...formErrors, passwordError: '' }); }}
            />
            {formErrors.passwordError && <p className="text-red-500 text-sm">{formErrors.passwordError}</p>}

            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-black rounded-md"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setFormErrors({ ...formErrors, confirmPasswordError: '' }); }}
            />
            {formErrors.confirmPasswordError && <p className="text-red-500 text-sm">{formErrors.confirmPasswordError}</p>}

            <label className="block text-sm font-medium text-gray-700">Role Code (optional)</label>
            <input
            type="text"
            className="w-full px-3 py-2 border border-black rounded-md"
            value={roleCode}
            onChange={(e) => { setRoleCode(e.target.value); setRoleError(''); }}
            />
            {roleError && <p className="text-red-500 text-sm">{roleError}</p>}


            <p className="text-red-500 text-sm mb-0">{error}</p>

            <button type="submit" disabled={!isFormValid} className="w-full border border-black py-2 rounded-md font-semibold text-white bg-black hover:bg-blue-700 mt-4">Sign Up</button>
            <Link href="/login">
              <button type="button" className="w-full border border-black text-black py-2 rounded-md hover:bg-gray-200 transition">
                Log in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
