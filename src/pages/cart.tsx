import Navbar from "../navbar"
import whiteBurgerMenu from "../images/white-burger-menu.png";

export function ShoppingCart(){

    return (
    <>
        <Navbar/>
        <div className="cart-navigation">
            <div className="cart-navigation-field">
                <div className="cart-navigation-left">
                    <img className="white-burger-menu" src={whiteBurgerMenu} />
                    <h1>ნავიგაცია</h1>
                </div>
                <div>
                    <h1>მთავარი 🡢 კალათა</h1>
                </div>
            </div>

        </div>
        <div className="cart-info">
            <div className="cart-added-products">
                
            </div> 
            <div className="cart-paying">

            </div>
        </div>
    </>
    )
}