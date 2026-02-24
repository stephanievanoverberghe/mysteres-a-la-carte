import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'ghost';

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;
type NativeAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

export type ButtonProps = {
    as?: 'button' | 'a';
    children: ReactNode;
    className?: string;
    variant?: ButtonVariant;
} & NativeButtonProps &
    NativeAnchorProps;

const VARIANT_CLASSNAMES: Record<ButtonVariant, string> = {
    primary: 'btn',
    ghost: 'btn-ghost',
};

export const buttonClassName = (variant: ButtonVariant = 'primary', className?: string) => [VARIANT_CLASSNAMES[variant], className].filter(Boolean).join(' ');

export default function Button({ as = 'button', variant = 'primary', className, children, type, ...props }: ButtonProps) {
    const classes = buttonClassName(variant, className);

    if (as === 'a') {
        return (
            <a {...props} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button {...props} type={type ?? 'button'} className={classes}>
            {children}
        </button>
    );
}
