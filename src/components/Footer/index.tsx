import clsx from "clsx";
import React, { useMemo } from "react";
import FooterStyles from "./footer.module.css";

const PageFooter : React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
    const currentYear = useMemo(() => {
        return new Date().getFullYear().toString();
    }, []);

    return (
        <footer
            className={clsx("relative w-full space-y-3 mt-auto flex justify-center items-center flex-col p-4", className)}
            { ...props}
        >
            <div className={`${FooterStyles.footerGradientBubble} z-20`}></div>
            <p className="text-white !mt-8 text-center">©{currentYear} SBHS CS Club. All Rights Reserved.</p>
        </footer>
    )
}

export default PageFooter; 
