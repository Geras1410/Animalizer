import React, { useState } from "react";
import FAQInt from './FAQCOMP/FAQInt'

interface FAQType {
    question: string;
    answer: string;
    open: boolean;
  }
  
  const FAQ: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQType[]>([
        {
            question: "What is Animalizer?",
            answer: "Animalizer is an application that uses advanced machine learning algorithms to analyze images and accurately determine which animal is present in the image.",
            open: true
        },
        {
            question: "How does Animalizer work?",
            answer: "Animalizer uses AI technology and neural networks to process and analyze animal images. The app compares the image's characteristics with its database to identify the animal and provide a certainty percentage.",
            open: false
        },
        {
            question: "What types of animals can Animalizer identify?",
            answer: "Currently, Animalizer can identify a wide variety of common animals, including dogs, cats, birds, fish, horses, and more.",
            open: false
        },
        {
            question: "Is Animalizer free?",
            answer: "Animalizer offers a free version with basic features. There is also a premium version that provides advanced functionalities and a higher number of daily identifications.",
            open: false
        },
        {
            question: "How accurate is Animalizer?",
            answer: "The accuracy of Animalizer varies depending on the quality of the image and the animal in question. Generally, the app offers a high level of accuracy, with certainty percentages displayed alongside each identification.",
            open: false
        },
        {
            question: "How can I use Animalizer for veterinary diagnostics?",
            answer: "In future versions, Animalizer plans to offer advanced tools for preliminary diagnostics based on images, helping veterinarians identify medical issues in animals.",
            open: false
        },
        {
            question: "What technologies does Animalizer use?",
            answer: "Animalizer uses advanced technologies like React, Java, and TensorFlow to ensure an accessible, precise, and efficient user experience from any device with internet access.",
            open: false
        },
        {
            question: "Can I use Animalizer on my mobile phone?",
            answer: "Yes, Animalizer is designed to be accessible from any device with internet access, including mobile phones and tablets.",
            open: false
        },
        {
            question: "How does Animalizer protect my privacy?",
            answer: "Animalizer takes user privacy very seriously. Images and personal data are not shared with third parties and are securely stored according to industry best practices.",
            open: false
        },
        {
            question: "What should I do if Animalizer can't identify my animal?",
            answer: "If Animalizer can't identify an animal, try uploading a clearer or higher-quality image. You can also provide feedback through the app to help us improve our algorithms.",
            open: false
        },
        {
            question: "Can Animalizer detect anomalies in X-rays?",
            answer: "Yes, in future versions, Animalizer will use advanced image processing techniques to highlight anomalies in X-rays and other medical studies, facilitating early detection of potential health issues.",
            open: false
        },
        {
            question: "How can I contact Animalizer support?",
            answer: "You can contact Animalizer support through our contact form on the website or by sending an email to support@animalizer.com.",
            open: false
        }
    ]);
  
    const toggleFAQ = (index: number) => {
      setFaqs(
        faqs.map((faq, i) => {
          if (i === index) {
            faq.open = !faq.open;
          } else {
            faq.open = false;
          }
          return faq;
        })
      );
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="faqs space-y-4">
            {faqs.map((faq, index) => (
              <FAQInt faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default FAQ