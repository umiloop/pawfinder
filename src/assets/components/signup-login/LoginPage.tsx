import { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
import UserService from "../../../service/UserService"; // Import the UserService
import "./LoginPage.css";

// Define the type for the props
interface LoginPageProps {
  onLoginSuccess: () => void; // Explicitly define the type of onLoginSuccess
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const signUpButton = useRef<HTMLButtonElement | null>(null);
  const signInButton = useRef<HTMLButtonElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  // const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    userType: ''
  });

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    userType: ''
  });

  useEffect(() => {
    const handleSignUp = () => container.current?.classList.add("login-container-right-panel-active");
    const handleSignIn = () => container.current?.classList.remove("login-container-right-panel-active");

    signUpButton.current?.addEventListener('click', handleSignUp);
    signInButton.current?.addEventListener('click', handleSignIn);

    return () => {
      signUpButton.current?.removeEventListener('click', handleSignUp);
      signInButton.current?.removeEventListener('click', handleSignIn);
    };
  }, []);

  const handleSignIn = () => {
    onLoginSuccess(); // Call the onLoginSuccess function
  };

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the UserService to log in the user
      const response = await UserService.loginUser(loginForm.username, loginForm.password);
      console.log('User logged in:', response);

      // Call the onLoginSuccess function
      onLoginSuccess();

      // Navigate to home page
      // navigate('/');
      handleSignIn();
    } catch (error) {
      console.error('Error logging in:', error);
      setErrors({ ...errors, username: 'Invalid username or password' });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = validateSignUpForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call the UserService to register the user
      const response = await UserService.registerUser(signUpForm);
      console.log('User registered:', response);

      // Navigate to home page
      // navigate('/');
      handleSignIn();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const validateSignUpForm = () => {
    const newErrors: any = {};

    if (!signUpForm.firstName) newErrors.firstName = 'First Name is required';
    if (!signUpForm.lastName) newErrors.lastName = 'Last Name is required';
    if (!signUpForm.username) newErrors.username = 'Username is required';
    if (!signUpForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!signUpForm.password) {
      newErrors.password = 'Password is required';
    } else if (signUpForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signUpForm.userType) {
      newErrors.userType = 'Please select a user type';
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  return (
    <div className="login-main-container">
      <div className="login-container" ref={container}>
        <div className="login-form-container sign-up-form-container">
          <form className='login-form' onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="login-social-container">
              <a href="#" className="login-social"><FaFacebookF /></a>
              <a href="#" className="login-social"><FaGooglePlusG /></a>
              <a href="#" className="login-social"><FaLinkedinIn /></a>
            </div>
            <span className='sign-span'>or use your email for registration</span>
            <div className="login-form-inputs">
              <input className='login-input' type="text" placeholder="First Name" name="firstName" value={signUpForm.firstName} onChange={handleInputChange} />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
              <input className='login-input' type="text" placeholder="Last Name" name="lastName" value={signUpForm.lastName} onChange={handleInputChange} />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
              <input className='login-input' type="text" placeholder="Username" name="username" value={signUpForm.username} onChange={handleInputChange} />
              {errors.username && <span className="error">{errors.username}</span>}
              <input className='login-input' type="email" placeholder="Email" name="email" value={signUpForm.email} onChange={handleInputChange} />
              {errors.email && <span className="error">{errors.email}</span>}
              
              <div className="pf-user-type-container">
                <p className="pf-user-type-label">I am a:</p>
                <div className="pf-user-type-options">
                  <div 
                    className={`pf-user-type-option ${signUpForm.userType === 'user' ? 'pf-selected' : ''}`}
                    onClick={() => setSignUpForm({ ...signUpForm, userType: 'user' })}
                  >
                    <input 
                      type="radio" 
                      name="userType" 
                      value="user" 
                      checked={signUpForm.userType === 'user'} 
                      onChange={handleInputChange}
                      id="user-type-user"
                      className="pf-user-type-radio" 
                    />
                    <label htmlFor="user-type-user" className="pf-user-type-text">
                      User
                      <span className="pf-user-type-description">Looking to adopt a pet</span>
                    </label>
                  </div>
                  <div 
                    className={`pf-user-type-option ${signUpForm.userType === 'shelter' ? 'pf-selected' : ''}`}
                    onClick={() => setSignUpForm({ ...signUpForm, userType: 'shelter' })}
                  >
                    <input 
                      type="radio" 
                      name="userType" 
                      value="shelter" 
                      checked={signUpForm.userType === 'shelter'} 
                      onChange={handleInputChange}
                      id="user-type-shelter"
                      className="pf-user-type-radio"
                    />
                    <label htmlFor="user-type-shelter" className="pf-user-type-text">
                      Shelter
                      <span className="pf-user-type-description">Managing adoptable pets</span>
                    </label>
                  </div>
                </div>
              </div>
              {errors.userType && <span className="error">{errors.userType}</span>}
              
              <input className='login-input' type="password" placeholder="Password" name="password" value={signUpForm.password} onChange={handleInputChange} />
              {errors.password && <span className="error">{errors.password}</span>}
              <input className='login-input' type="password" placeholder="Confirm Password" name="confirmPassword" value={signUpForm.confirmPassword} onChange={handleInputChange} />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <div className="login-form-button-container">
              <button className='sign-btn' type="submit">Sign Up</button>
            </div>
          </form>
        </div>
        <div className="login-form-container sign-in-form-container">
          <form className='login-form'>
            <h1>Sign in</h1>
            <div className="login-social-container">
              <a href="#" className="login-social"><FaFacebookF /></a>
              <a href="#" className="login-social"><FaGooglePlusG /></a>
              <a href="#" className="login-social"><FaLinkedinIn /></a>
            </div>
            <span className='sign-span'>or use your account</span>
            <input className='login-input' placeholder="Username" name="username" value={loginForm.username} onChange={handleLoginInputChange} />
            <input className='login-input' type="password" placeholder="Password" name="password" value={loginForm.password} onChange={handleLoginInputChange} />
            {errors.username && <span className="error">{errors.username}</span>}
            <a className='link-a' href="#">Forgot your password?</a>
            <button className='sign-btn' type="submit" onClick={handleLogIn}>Sign In</button>
          </form>
        </div>
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel login-overlay-left">
              <h1>Welcome Back!</h1>
              <p className="desc-p">To keep connected with us please login with your personal info</p>
              <button className="ghost sign-btn" ref={signInButton}>Sign In</button>
            </div>
            <div className="login-overlay-panel login-overlay-right">
              <h1>Hello, Friend!</h1>
              <p className='desc-p'>Enter your personal details and start journey with us</p>
              <button className="ghost sign-btn" ref={signUpButton}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;