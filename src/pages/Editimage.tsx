import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { request } from '../helpers/axios_helper';
import { getImage } from './Mapeo';
import { GiCancel } from "react-icons/gi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BsCheckCircle } from "react-icons/bs";
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface Example {
  imageName: string;
  fpred: string;
  id: string;
  spred: string;
  tpred: string;
}

const EditImage: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const [eg, setEg] = useState<Example>({
    imageName: "",
    fpred: "",
    id: '',
    spred: "",
    tpred: ""
  });
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("GET", `/examples/${id}`, {});
        setEg(response.data);
      } catch (error) {
        console.error('Error fetching exercise:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEg({ ...eg, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageName = file.name;
      setEg({ ...eg, imageName: imageName });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ejemplo = {
        FPred: eg.fpred,
        SPred: eg.spred,
        TPred: eg.tpred,
        imageName: eg.imageName
      }
      const res = await request("PUT", `/examples/${id}`, ejemplo);
      if (res.status === 200) {
        MySwal.fire({
            title: '¡Éxito!',
            text: 'El ejercicio se actualizó correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/user');
        });
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
        MySwal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el ejercicio.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
  };

  const handleCancel = () => {
    navigate('/user');
  };

  const handleFieldActivation = (field: string) => {
    setActiveField(field);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-4">Image Details</h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mb-2">
                <strong>Description 1:</strong>
                {activeField === 'fpred' ? (
                  <input
                    name="fpred"
                    value={eg.fpred}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Update this answer"
                    type="text"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleFieldActivation('fpred')}
                    className="bg-transparent border-2 border-gray-100 rounded-xl p-4 mt-1 hover:bg-gray-50"
                  >
                    {eg.fpred}
                  </button>
                )}
              </div>
              <div className="mb-2">
                <strong>Description 2:</strong>
                {activeField === 'spred' ? (
                  <input
                    name="spred"
                    value={eg.spred}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Update this answer"
                    type="text"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleFieldActivation('spred')}
                    className="bg-transparent border-2 border-gray-100 rounded-xl p-4 mt-1 hover:bg-gray-50"
                  >
                    {eg.spred}
                  </button>
                )}
              </div>
              <div className="mb-2">
                <strong>Description 3:</strong>
                {activeField === 'tpred' ? (
                  <input
                    name="tpred"
                    value={eg.tpred}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Update this answer"
                    type="text"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleFieldActivation('tpred')}
                    className="bg-transparent border-2 border-gray-100 rounded-xl p-4 mt-1 hover:bg-gray-50"
                  >
                    {eg.tpred}
                  </button>
                )}
              </div>
              <div className="mb-2">
                <strong>Update Image:</strong>
                <input
                  onChange={handleImageChange}
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                  type="file"
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <img src={getImage(eg.imageName)} alt="Selected" className="w-full h-auto" />
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  <span data-tooltip-id='save' data-tooltip-content="Save Changes">
                    <BsCheckCircle size={30}/>
                  </span>
                </button>
                <ReactTooltip id='save' place='top'/>
                <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  <span data-tooltip-id='cancel' data-tooltip-content="Do not save Changes">
                    <GiCancel size={30}/>
                  </span>
                </button>
                <ReactTooltip id='cancel' place='top'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
