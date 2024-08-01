// src/services/sweetalert.ts
import Swal from "sweetalert2";

export const showAlert = (title: string, text: string, icon: any) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
  });
};

export const showConfirmAlert = (title: string, text: string, icon: any, confirmButtonText: string, cancelButtonText: string) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });
};
