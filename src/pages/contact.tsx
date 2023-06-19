import Navbar from "../navbar"
import LinkIcon from '../images/link-icon.png'

export default function ContactPage(){


    return(
        <>
            <Navbar/>
            <div className="contact-page">
                <h3 className="contact-page-header">Contact:</h3>
                <div className="contact-page-info">
                    <ul className="contact-page-ul">
                        <li><span>E-mail-</span><a target="_blank" href="https://mail.google.com">patsiagiorgi6@gmail.com<img className="contact-link-icon" src={LinkIcon}/></a></li>
                        <li><span>Phone-</span>+995-555-555-555</li>
                        <li><span>Instagram-</span><a target="_blank" href="https://www.instagram.com/patso_n1/">@patso_n1<img className="contact-link-icon" src={LinkIcon}/></a></li>
                        <li><span>Github-</span><a target="_blank" href="https://github.com/Pats1a">Pats1a <img className="contact-link-icon" src={LinkIcon}/></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}