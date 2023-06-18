import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const useTokenExpiration = () => {
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const expiration = sessionStorage.getItem('expires');
    if (expiration) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expiration).getTime();
      return currentTime > expirationTime;
    }
    return true; // Token expired if expiration time is not set
  };

  useEffect(() => {
    if (isTokenExpired()) {
      navigate("/"); // Redirect to the login page
      toast.error("Token has expired. Please log in again.");
    }
  }, []);
}

export default useTokenExpiration;