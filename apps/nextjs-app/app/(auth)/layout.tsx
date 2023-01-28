import React from "react";

const AuthRootLayout: React.FunctionComponent = ({children}) => {
    return (
        <html lang={'en'}>
        <body>
        <div>
            {children}
        </div>
        </body>
        </html>
    )
}

export default AuthRootLayout