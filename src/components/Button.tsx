import React, {
    forwardRef,
    type ElementType,
    type ComponentPropsWithoutRef, 
    type Ref,
} from "react";

type PolymorphicRef<T extends ElementType> = Ref<
    T extends keyof JSX.IntrinsicElements
export default Button;