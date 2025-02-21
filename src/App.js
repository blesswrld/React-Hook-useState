import { Component, useState, useEffect, useCallback, useMemo } from "react";
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

// Функция которая будет динамически вставлять изображение
// const getSomeImages = () => {
//     console.log("fetching");
//     return [
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTo9PcozhtB06i2oeMBCwMBLqP3W4WI4MhXg&s",
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zzk5aB4UM8D8km8kr_e8sATZbsJpkswm5A&s",
//     ];
// };

const countTotal = (num) => {
    console.log("counting...");
    return num + 10;
};

const Slider = (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // Меморизируем функцию с помощью метода useCallback()
    const getSomeImages = useCallback(() => {
        console.log("fetching");
        return [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTo9PcozhtB06i2oeMBCwMBLqP3W4WI4MhXg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zzk5aB4UM8D8km8kr_e8sATZbsJpkswm5A&s",
        ];
    }, []);

    // HOOKS

    // useEffect

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

    // Меморизируем значение с помощью метода useMemo()
    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]); // зависимость

    // Меморизируем объект со значениями стилей
    const style = useMemo(
        () => ({
            color: slide > 4 ? "red" : "black",
        }),
        [slide]
    );

    useEffect(() => {
        console.log("styleChanged!");
    }, [style]); // передаем зависимость для отслеживания стилей

    return (
        <Container>
            <div className="slider w-50 m-auto">
                {/* Передаем функцию внутрь дочернего компонента (Slider) */}
                <Slide getSomeImages={getSomeImages} />
                <div className="text-center mt-5">
                    Active slide {slide} <br /> {autoplay ? "auto" : null}
                </div>
                <div style={style} className="text-center mt-5">
                    Total slides: {total}
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

const Slide = ({ getSomeImages }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages());
    }, [getSomeImages]);

    return (
        <>
            {images.map((url, i) => {
                return (
                    <img
                        key={i}
                        className="d-block w-100"
                        src={url}
                        alt="slide"
                    />
                );
            })}
        </>
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
