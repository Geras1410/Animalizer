import React from 'react';
import Fondo from '../assets/Fondo8.jpg';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Información del lado izquierdo */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">What is Animalizer?</h1>
          <div className="border-b-2 border-orange-500 w-20 mb-4"></div>
          <ul className="list-disc list-inside text-justify">
            <li>
              <strong>Animalizer</strong> is an application that uses advanced machine learning algorithms to analyze images and accurately determine which animal is present in the image.
            </li>
            <li>
              <strong>Current Features:</strong> The application can recognize a variety of common animals, providing the name of the identified animal along with a confidence percentage.
            </li>
            <li>
              <strong>Future Prospects:</strong> Our vision for this application goes beyond simple animal identification. In future versions, we plan to implement advanced features that will have a significant impact in the veterinary field:
              <ul className="list-disc list-inside ml-4">
                <li>Veterinary Diagnostics: The application will be able to offer preliminary diagnostics based on images, helping veterinarians identify medical issues in animals.</li>
                <li>Detection of Anomalies in Radiographs: Using advanced image processing techniques, the application will be able to highlight anomalies in radiographs and other medical studies, facilitating early detection of potential health problems.</li>
              </ul>
            </li>
          </ul>
          <p className="text-justify mt-4">
            <strong>Animalizer</strong> offers an innovative web platform designed for students and professionals in veterinary and biological sciences, providing cutting-edge tools in animal species identification and diagnosis. By leveraging advanced technologies such as React, Java, and TensorFlow, Animalizer ensures an accessible, accurate, and efficient user experience from any internet-enabled device.
            <br/><br/>
            With Animalizer, we are redefining the use of artificial intelligence in veterinary education, providing a powerful and accessible tool that promotes learning and enhances professional practice.
          </p>
        </div>
        {/* Imágenes del lado derecho */}
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <img src={Fondo} alt="Animals" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
