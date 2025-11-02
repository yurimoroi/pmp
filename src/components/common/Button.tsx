import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary-primary" | "tertiary-secondary" | "outline-primary" | "outline-secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Button({ children, onClick, type = "button", variant = "primary", size = "md", disabled = false, className = "", fullWidth = false }: ButtonProps) {
  const baseClasses = "font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
    secondary: "bg-violet-500 hover:bg-violet-600 text-white focus:ring-violet-500",
    "tertiary-primary": "bg-white border-4 border-gray-100 text-gray-700 hover:border-orange-200 focus:ring-orange-500",
    "tertiary-secondary": "bg-white border-4 border-gray-100 text-gray-700 hover:border-violet-200 focus:ring-violet-500",
    "outline-primary": "bg-white border-2 border-gray-100 text-gray-700 hover:border-orange-200 focus:ring-orange-500",
    "outline-secondary": "bg-white border-2 border-gray-100 text-gray-700 hover:border-violet-200 focus:ring-violet-500",
  };

  const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50";

  const widthClasses = fullWidth ? "w-full" : "";

  const classes = [baseClasses, sizeClasses[size], variantClasses[variant], widthClasses, className].filter(Boolean).join(" ");

  const disabledClassesFinal = disabled ? disabledClasses : "";

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${classes} ${disabledClassesFinal}`}>
      {children}
    </button>
  );
}

// 選択可能なボタン用のコンポーネント
interface SelectButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

export function SelectButton({ children, onClick, isSelected, className = "", variant = "primary" }: SelectButtonProps) {
  const baseClasses = "py-4 px-6 rounded-2xl border-4 transition-all duration-200 font-bold text-lg cursor-pointer";

  const stateClasses = isSelected
    ? variant === "secondary"
      ? "bg-violet-100 border-violet-400 text-violet-700"
      : "bg-orange-100 border-orange-400 text-orange-700"
    : variant === "secondary"
    ? "bg-white border-gray-100 text-gray-700 hover:border-violet-200"
    : "bg-white border-gray-100 text-gray-700 hover:border-orange-200";

  return (
    <button onClick={onClick} className={`${baseClasses} ${stateClasses} ${className}`}>
      {children}
    </button>
  );
}

// アクションボタン用のコンポーネント
interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary-primary" | "tertiary-secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function ActionButton({ children, onClick, disabled = false, variant = "primary", className = "", type = "button" }: ActionButtonProps) {
  const baseClasses = "w-full py-4 px-8 text-xl font-bold transition-all duration-200 cursor-pointer";

  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-violet-500 hover:bg-violet-600 text-white",
    "tertiary-primary": "bg-white border-4 border-gray-100 text-gray-700 hover:border-orange-200",
    "tertiary-secondary": "bg-white border-4 border-gray-100 text-gray-700 hover:border-violet-200",
  };

  const disabledClasses = "bg-gray-300 cursor-not-allowed";

  const classes = [baseClasses, disabled ? disabledClasses : variantClasses[variant], className].filter(Boolean).join(" ");

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

// 設定画面用のボタンコンポーネント
interface FullColorButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function FullColorButton({ children, onClick, type = "button", variant = "blue", size = "md", disabled = false, className = "" }: FullColorButtonProps) {
  const baseClasses = "font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "py-1 px-3 text-sm rounded",
    md: "py-2 px-4 text-base rounded-md",
    lg: "py-3 px-6 text-lg rounded-lg",
  };

  const variantClasses = {
    orange: "bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500",
    blue: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    green: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    red: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    violet: "bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500",
  };

  const disabledClasses = "bg-gray-400 cursor-not-allowed opacity-50";

  const classes = [baseClasses, sizeClasses[size], disabled ? disabledClasses : variantClasses[variant as keyof typeof variantClasses], className].filter(Boolean).join(" ");

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
