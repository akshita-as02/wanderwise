import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    // Base classes
    let classes = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95"
    
    // Add variant classes
    if (variant === 'primary') {
      classes += " bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl focus:ring-blue-500"
    } else if (variant === 'secondary') {
      classes += " bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500"
    } else if (variant === 'outline') {
      classes += " border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500"
    } else if (variant === 'accent') {
      classes += " bg-yellow-300 text-blue-900 hover:bg-yellow-400 shadow-md focus:ring-yellow-500"
    }
    
    // Add size classes
    if (size === 'sm') {
      classes += " h-8 px-3 text-sm"
    } else if (size === 'md') {
      classes += " h-10 px-4"
    } else if (size === 'lg') {
      classes += " h-12 px-6 text-lg"
    }
    
    // Add custom className
    if (className) {
      classes += " " + className
    }
    
    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }