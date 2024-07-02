import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { request } from '../helpers/axios_helper';
import { getImage } from '../pages/Mapeo';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { GrEdit } from "react-icons/gr";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';


interface Example {
  imageName: string;
  exid: string;
  fpred: string;
  id: number;
  spred: string;
  tpred: string;
}

interface TableRowProps {
  example: Example;
  imageUrl: string;
  onButtonClick: (buttonType: string, id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ example, imageUrl, onButtonClick }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-4 py-4 sm:px-6 whitespace-normal break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="truncate sm:whitespace-normal">{example.fpred}</div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-normal break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="truncate sm:whitespace-normal">{example.spred}</div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-normal break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="truncate sm:whitespace-normal">{example.tpred}</div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="w-32 h-32 sm:w-48 sm:h-48">
          <img src={imageUrl} alt="description" className="w-full h-full object-contain"/>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <button onClick={() => onButtonClick('edit', example.id)} className="text-yellow-600 hover:text-yellow-900">
            <span data-tooltip-id='edit' data-tooltip-content="Edit Example">
              <GrEdit size={30}/>
            </span>
          </button>
          <ReactTooltip id='edit' place='top'/>
          <button onClick={() => onButtonClick('delete', example.id)} className="text-red-600 hover:text-red-900">
            <span data-tooltip-id='delete' data-tooltip-content="Delete Example">
              <MdDeleteForever size={30}/>
            </span>
          </button>
          <ReactTooltip id='delete' place='top'/>
          <button onClick={() => onButtonClick('view', example.id)} className="text-blue-600 hover:text-blue-900">
            <span data-tooltip-id='view' data-tooltip-content="View Example">
              <GrView size={30}/>
            </span>
          </button>
          <ReactTooltip id='view' place='top'/>
        </div>
      </td>
    </tr>
  );
};

const TableComponent: React.FC = () => {

  const [examples, setExamples] = useState<Example[]>([]);
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const getFetch = async () => {
    try {
      const response = await request("GET", "/examples", {});
      setExamples(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFetch();
  }, []);

  const deleteExercise = async (id: number) => {
    try {
      const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel'
      });
      if (result.isConfirmed) {
          await request("DELETE",`/examples/${id}`,{});
          getFetch();
          MySwal.fire(
            'Deleted!',
            'The exercise has been deleted',
            'success'
        );
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
      MySwal.fire(
          'Error',
          'An error occurred while deleting the exercise.',
          'error'
      );
    }
  };

  const handleButtonClick = (buttonType: string, id: number) => {
    console.log(`Button clicked: ${buttonType}`);
    if (buttonType === 'view') {
      navigate(`/user/viewimage/${id}`);
    }
    if(buttonType === 'edit'){
      navigate(`/user/editimage/${id}`);
    }
    if(buttonType === 'delete'){
      deleteExercise(id);
    }

  };

  const filteredExamples = examples.filter(example =>
    example.fpred.toLowerCase().includes(filterText.toLowerCase()) ||
    example.spred.toLowerCase().includes(filterText.toLowerCase()) ||
    example.tpred.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="overflow-x-auto text-center mt-2">
      <input
        type="text"
        placeholder="Search examples..."
        className="border border-gray-300 rounded px-3 py-1 mb-3"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      {filteredExamples.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Best prediction</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Second prediction</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExamples.map((example, index) => (
              <TableRow
                key={index}
                example={example}
                imageUrl={getImage(example.imageName)}
                onButtonClick={handleButtonClick}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">Can't find examples</p>
      )}
    </div>
  );
};

export default TableComponent;
