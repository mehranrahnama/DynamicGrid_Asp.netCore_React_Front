import React, { useState } from 'react'
import 'sweetalert2/dist/sweetalert2.css';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',

    },
    buttonsStyling: false
  });

const error=()=>{  Swal.fire({
    icon: 'error',
    title: 'خطا...',
    text: 'خطایی رخ داده است!',
   
});}

const sucsess=()=>{  Swal.fire({
    icon: 'success',
    title: 'اطلاع...',
    text: 'عملیات با موفقیت انجام شد..',
    timer:"2000"
});}

const confirm=()=>{return Swal.fire({
  title: 'سوال',
  text: "عملیات انجام شود؟",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'بله',
  cancelButtonText: 'خیر',
  
})}

export default {

error,
sucsess,
confirm

};