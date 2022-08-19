import { toast } from 'react-toastify';

export const toastOption = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const validation = (values) => {
  if (values.username.length < 3) {
    toast.error('🦄 Username Must Be More than 3 character', toastOption);
    return false;
  }
  if (values.password.length <= 3) {
    toast.error('🦄 Password must be more than 3', toastOption);
    return false;
  }
  if (values.password !== values.confirmPassword) {
    toast.error('🦄 Confirm Password Didnt Match', toastOption);
    return false;
  }

  return true;
};
