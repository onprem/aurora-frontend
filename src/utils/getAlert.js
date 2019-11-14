import Swal from 'sweetalert2/src/sweetalert2';
import '@sweetalert2/theme-dark/dark.css';

const getAlert = () => {
  const mql = window.matchMedia('(max-width: 500px)');
  const isMobile = mql.matches;

  const Toast = Swal.mixin({
    toast: true,
    position: isMobile ? 'top-end' : 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  return Toast;
};

export default getAlert;
