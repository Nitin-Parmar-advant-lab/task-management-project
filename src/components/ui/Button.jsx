export default function Button({ text, style, ...props }) {
    return (
        <button
            className={`border border-gray-400 rounded-lg  hover:bg-gray-100 cursor-pointer ${style}`}
            {...props}
        >
            {text}
        </button>
    );
}
