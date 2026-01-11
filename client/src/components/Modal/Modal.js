
import './main.css'
const Modal =({children,onClose})=>{

    return(
        <div className="containerModal">
            <div className="containerModalContent">
                <button className="btnClose" onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    )
}

export default Modal;