import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Import the eye icons

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;

}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  const isPassword = type === "password"; // Check if it's a password field
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={isPassword && !showPassword ? "password" : "text"} // Use text type to show password
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-[#EFE7F5]"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-[#B25FF3]"}
        `}
      />
      {isPassword && ( // Show the eye icon only for password fields
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-[20px]"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <BsEye/> : <BsEyeSlash />}
        </div>
      )}
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-[#B25FF3]"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
