import React, { ReactNode } from 'react';
import scopedClasses from '../utils/scopedClasses';

const sc = scopedClasses('layout');

interface LayoutProps {
    children: ReactNode,
}

const Layout = (props: LayoutProps) => {
    const { children } = props;
    return (
        <div className={sc()}>
            {children}
        </div>
    );
};

export default Layout;
