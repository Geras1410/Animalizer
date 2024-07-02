import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '../helpers/axios_helper';
import { getImage } from './Mapeo';
import { IoArrowBackSharp } from "react-icons/io5";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ViewImage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [eg, setEg] = useState({
    imageName: "",
    exid: "",
    fpred: "",
    id: '',
    spred: "",
    tpred: ""
  });

  const Regresar = () => {
    navigate("/user");
  };

  const getFetch = useCallback(async () => {
    const url = `/examples/${params.id}`;
    try {
      const response = await request("GET", url, {});
      setEg(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getFetch();
  }, [getFetch]);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-4">Image Details</h2>
            <div className="mb-2">
              <strong>Description 1:</strong> {eg.fpred}
            </div>
            <div className="mb-2">
              <strong>Description 2:</strong> {eg.spred}
            </div>
            <div className="mb-2">
              <strong>Description 3:</strong> {eg.tpred}
            </div>
            <div className="mb-4">
              <img src={getImage(eg.imageName)}alt="Selected" className="w-full h-auto" />
            </div>
            <button onClick={Regresar} className="text-blue-600 hover:text-blue-900">
              <span data-tooltip-id='regresar' data-tooltip-content="Come back to home">
                <IoArrowBackSharp size={30}/>
              </span>
            </button>
            <ReactTooltip id='regresar' place='top'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
