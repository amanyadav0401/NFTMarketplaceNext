import React from 'react';
import toast from 'react-hot-toast';

const toastError = (message:string) => {
  toast.error(
    <div className="flex flex-col">
      <p className="text-[16px] mb-[4px] font-Avenir tracking-wide font-semibold">{message}</p>
      <p className="text-[14px]">If you need any help Click here</p>
    </div>
  )
};

export default toastError;
