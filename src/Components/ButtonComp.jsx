const ButtonComp = ({ type = null, icon = null, name = "Button", onClick, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn  px-6 py-2 text-white bg-green-600 rounded-md shadow-md transition duration-200 
              hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 
              focus:ring-green-300 ${className}`}
        >
            {icon && <span className="icon mr-2">{icon}</span>}
            {name && <span className="button-name">{name}</span>}
        </button>

    );
};

export default ButtonComp;
