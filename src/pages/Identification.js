import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import './Identification.css';
import { request } from '../helpers/axios_helper';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

function Identification() {

    const MySwal = withReactContent(Swal);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);
    const [imageName, setImageName] = useState('');
    const [linesVisible, setLinesVisible] = useState(false);

    const imageRef = useRef();
    const textInputRef = useRef();
    const fileInputRef = useRef();

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const model = await mobilenet.load();
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            setIsModelLoading(false);
        }
    };

    const uploadImage = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
            setImageName(files[0].name); // Guardar el nombre del archivo
        } else {
            setImageURL(null);
            setImageName(''); // Restablecer el nombre del archivo si no hay archivos seleccionados
        }
    };

    const identify = async () => {
        textInputRef.current.value = '';
        const results = await model.classify(imageRef.current);
        setResults(results);
    };

    const handleOnChange = (e) => {
        setImageURL(e.target.value);
        setResults([]);
    };

    const triggerUpload = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        if (imageURL) {
            setHistory([imageURL, ...history]);
        }
    }, [imageURL]);

    useEffect(() => {
        if (results.length > 0) {
            setLinesVisible(true);
        }
    }, [results]);

    if (isModelLoading) {
        return <h2>Model Loading...</h2>;
    }

    const SButton = async () => {
        if (results.length > 0 && imageURL) {
            const topThreeResults = results.slice(0, 3);

            const predictions = {
                FPred: topThreeResults[0].className,
                SPred: topThreeResults[1].className,
                TPred: topThreeResults[2].className,
                imageName: imageName // Incluir el nombre de la imagen en las predicciones
            };

            console.log(predictions)

            try {
                const response = await request("POST", '/examples/create', predictions);
                if (response.status === 200) {
                    MySwal.fire({
                        title: '¡Éxito!',
                        text: 'El ejercicio se creó correctamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.log(error);
                MySwal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al crear el ejercicio.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="App">
            <h1 className='header'>Image Identification</h1>
            <div className='inputHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                <span className='or'>OR</span>
                <input type="text" placeholder='Paste image URL' ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className={`lineas ${linesVisible ? 'lines-visible' : ''}`}>
                <div className="mb-2 line-item">
                    <span className="font-bold">Mayor a 70%:</span> es confiable
                    <div className="line line-1"></div>
                </div>
                <div className="mb-2 line-item">
                    <span className="font-bold">50% a 69%:</span> medianamente confiable
                    <div className="line line-2"></div>
                </div>
                <div className="line-item">
                    <span className="font-bold">Menor a 49%:</span> poco confiable
                    <div className="line line-3"></div>
                </div>
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={result.className}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                {
                    imageURL && <div className='buttonContainer'>
                    <button onClick={identify} className='mx-2' data-tip data-for='identifyTip'>
                        <span data-tooltip-id='identificar' data-tooltip-content="Identify Image">
                            <AiOutlineSearch size={30} />
                        </span>
                    </button>
                    <ReactTooltip id='identificar' place='top' effect='solid'/>
                    <button variant='light' onClick={SButton} className='mx-2' data-tip data-for='saveTip'>
                        <span data-tooltip-id='guardar' data-tooltip-content="Save Image">
                            <FaSave size={30} />
                        </span>
                    </button>
                    <ReactTooltip id='guardar' place='top' effect='solid'/>
                </div>
                }
            </div>
            {history.length > 0 && <div className="recentPredictions">
                <h2>Recent Images</h2>
                <div className="recentImages">
                    {history.map((image, index) => {
                        return (
                            <div className="recentPrediction" key={`${image}${index}`}>
                                <img src={image} alt='Recent Prediction' onClick={() => setImageURL(image)} />
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

export default Identification;
