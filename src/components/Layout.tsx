import React, { ReactChild, ReactChildren, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
    children: ReactChild | ReactChildren | ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <div className='layout-body'>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
}
