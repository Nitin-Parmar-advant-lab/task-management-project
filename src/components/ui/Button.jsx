export default function Button({ text, style, ...props }) {
    return (
        <button
            className={`border border-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer ${style}`}
            {...props}
        >
            {text}
        </button>
    );
}
