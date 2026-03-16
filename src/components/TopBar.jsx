import Button from "./ui/Button";

export default function TopBar() {
    // return (
    //     <div id="topbar">
    //         <div className="search">
    //             <div className="search-section"></div>
    //         </div>
    //         {/* csfv = Create sort filter view */}
    //         <div id="csfv">
    //             <div className="create-task"></div>
    //             <div className="helper">
    //                 <div className="sort-by"></div>
    //                 <div className="filter"></div>
    //                 <div className="view"></div>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div
            id="topbar"
            className="sticky top-0 z-50 w-full px-10 pt-4 pb-2 flex flex-col gap-6 "
        >
            <div
                id="search-section"
                className=" w-full border border-gray-500 rounded-xl h-14 flex items-center px-2"
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="mx-10 px-5 border border-gray-400 rounded-md h-8 w-xl defaul"
                />
            </div>

            {/* csfv = create sort filter view */}
            <div id="csfv" className="flex items-center justify-between">
                <Button style="px-5 py-2" text="Create task" />

                <div className="helper flex items-center gap-3">
                    <Button style="px-4 py-1" text="Sort by" />
                    <Button style="px-4 py-1" text="Filter" />
                    <Button style="px-4 py-1" text="View" />
                </div>
            </div>
        </div>
    );
}
