import React from "react";

const year=new Date().getFullYear();
function Footer(){
    return(
        <footer>
            <p>© {year} Mohammad Zameer</p>
        </footer>
    );
}

export default Footer;