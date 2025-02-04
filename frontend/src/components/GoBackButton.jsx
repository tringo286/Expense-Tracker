import { FaArrowLeft } from "react-icons/fa";

const GoBackButton = ({ onGoBack }) => (
  <button
    onClick={onGoBack}
    className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 mb-4"
    aria-label="Go Back"
  >
    <FaArrowLeft size={20} />
  </button>
);

export default GoBackButton;