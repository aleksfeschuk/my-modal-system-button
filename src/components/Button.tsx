import { 
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  type JSX,
  type ComponentPropsWithRef,
  type Ref,
} from "react";

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

type ButtonComponent = {
  <T extends ElementType = "button">(props: ButtonProps<T>): JSX.Element;
  <T extends ElementType = "button">(props: ButtonProps<T> & ComponentPropsWithRef<T>): JSX.Element;
  displayName?: string;
};


const ButtonInner = (props: ButtonProps<ElementType>, ref: React.Ref<Element>) => {
  const { as, size = "md", children, ...restProps } = props;
  const Component = as || "button";

  return (
    <Component
      ref={ref}
      className={`btn btn-${size}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};


const Button = forwardRef(ButtonInner) as unknown as ButtonComponent;

Button.displayName = "Button";

export default Button;

export const ButtonWithCallbackRef = <T extends ElementType = "button">({ 
  as, 
  size = "md", 
  children,
  ref,
  ...props 
}: ButtonProps<T> & { ref?: Ref<HTMLElement> }) => {
  const Component = as || ("button" as ElementType);

  return (
    <Component
      ref={ref}
      className={`btn btn-${size}`}
      {...props}
    >
      {children}
    </Component>
  );
};