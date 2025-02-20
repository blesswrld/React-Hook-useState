import { Component, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import "./bootstrap.min.css";
// class Slider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0,
//         };
//     }

//     // life-cycle-HOOKS

//     componentDidMount() {
//         document.title = `slide: ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `slide: ${this.state.slide}`;
//     }

//     changeSlide = (i) => {
//         this.setState(({ slide }) => ({
//             slide: slide + i,
//         }));
//     };

//     toggleAutoplay = () => {
//         this.setState(({ autoplay }) => ({
//             autoplay: !autoplay,
//         }));
//     };

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img
//                         className="d-block w-100"
//                         src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
//                         alt="slide"
//                     />
//                     <div className="text-center mt-5">
//                         Active slide {this.state.slide} <br />{" "}
//                         {this.state.autoplay ? "auto" : null}
//                     </div>
//                     <div
//                         className="buttons mt-3"
//                         style={{ display: "flex", gap: 20 }}
//                     >
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}
//                         >
//                             -1
//                         </button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}
//                         >
//                             +1
//                         </button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}
//                         >
//                             toggle autoplay
//                         </button>
//                     </div>
//                 </div>
//             </Container>
//         );
//     }
// }

const Slider = (props) => {
    // HOOKS

    // useEffect

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    function logging() {
        console.log("log!");
    }

    useEffect(() => {
        console.log("effect update");
        document.title = `slide: ${slide}`;
    }, [slide]); // внутрь массива прописываем зависимости в данном случае slide

    useEffect(() => {
        console.log("autoplay");
    }, [autoplay]);

    // HOW UPDATE STATE IN HOOKS :

    // const [state, setState] = useState({ slide: 0, autoplay: false });

    // function changeSlide(i) {
    //     setState((state) => ({ ...state, slide: state.slide + 1 })); // update state
    // }

    // function toggleAutoplay() {
    //     setState((state) => ({ ...state, autoplay: !state.autoplay })); // update state
    // }

    function changeSlide(i) {
        setSlide((slide) => slide + i); // current state +- i

        // setSlide((slide) => slide + i); // current state +- 2(i)
    }

    function toggleAutoplay() {
        setAutoplay((autoplay) => !autoplay); // true
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img
                    className="d-block w-100"
                    src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                    alt="slide"
                />
                <div className="text-center mt-5">
                    Active slide {slide} <br /> {autoplay ? "auto" : null}
                </div>
                <div
                    className="buttons mt-3"
                    style={{ display: "flex", gap: 10 }}
                >
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}
                    >
                        -1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}
                    >
                        +1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}
                    >
                        toggle autoplay
                    </button>
                </div>
            </div>
        </Container>
    );
};

function App() {
    const [slider, setSlider] = useState(true);

    return (
        <>
            <button onClick={() => setSlider(false)}>delete component</button>
            {slider ? <Slider /> : null}
        </>
    );
}

export default App;
