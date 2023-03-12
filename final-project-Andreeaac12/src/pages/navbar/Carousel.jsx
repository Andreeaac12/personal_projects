import './Carousel.css';
import { useEffect, useState} from "react";

export function Carousel(props){
    const {children} = props;
    const [currentIndex, setCurrentIndex] = useState(0)
const [length, setLength] = useState(children.length)
const next = () => {
    if (currentIndex < (length - 1)) {
        setCurrentIndex(prevState => prevState + 1)
    }
}

const prev = () => {
    if (currentIndex > 0) {
        setCurrentIndex(prevState => prevState - 1)
    }
}
// Set the length to match current children from props
useEffect(() => {
    setLength(children.length)
}, [children])


return(
    <div className="carousel-container">
        <div>
            <h2>HOLIDAY GIFT SETS</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia nesciunt, ratione eaque blanditiis veniam obcaecati illo aliquam adipisci magni neque pariatur dolor vitae. Optio fugiat unde voluptates dicta, dolores tempore.</p></div>
    <div className="carousel-wrapper">
    <button onClick={prev} className="left-arrow">
        &lt;
    </button>
        <div className="carousel-content-wrapper">
       
            <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {children}
            </div>
        </div>
        <button onClick={next} className="right-arrow">
        &gt;
    </button>
    </div>
</div>
)
}