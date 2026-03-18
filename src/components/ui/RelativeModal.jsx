export default function RelativeModal({ texts, onClick, selectedValue }) {
    return (
        <div className="absolute top-0 ml-22 -mt-4 w-30 bg-white border border-gray-200 rounded-xl shadow-lg z-50 ">
            {
                texts.map((text, index) => (
                    <button key={index} onClick={() => onClick(text)} className={`w-full text-left px-4 py-2 hover:bg-amber-50 rounded-xl transition-colors text-gray-700 ${text === selectedValue ? 'bg-amber-50 font-medium' : ''}`}>
                        {text}
                    </button>
                ))
            }
        </div>
    );
}