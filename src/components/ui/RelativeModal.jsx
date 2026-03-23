export default function RelativeModal({ texts, onClick, selectedValue }) {
    return (
        <div className="absolute top-0 ml-22 -mt-4 w-30 bg-white border dark:bg-gray-600 dark:border-gray-600 dark:text-white border-gray-200 rounded-xl shadow-lg z-100 ">
            {texts.map((text, index) => (
                <button
                    key={index}
                    onClick={() => onClick(text)}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 dark:text-white rounded-xl transition-colors text-gray-700 ${text === selectedValue ? "bg-blue-100 dark:bg-blue-500 font-medium" : ""}`}
                >
                    {text}
                </button>
            ))}
        </div>
    );
}
