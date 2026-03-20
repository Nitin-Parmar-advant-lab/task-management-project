export default function Button({ text, style, ...props }) {
    return (
        <button
            className={`border border-[#E8E8ED] dark:border-[#2D2D2F] rounded-xl bg-[#0066CC] hover:bg-[#0071E3] dark:bg-[#2997FF] dark:hover:bg-[#5AC8FA] text-white font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${style}`}
            {...props}
        >
            {text}
        </button>
    );
}
