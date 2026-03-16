import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import KanbanView from "./components/view/kanban/KanbanView";
import ListView from "./components/view/list/ListView";

export default function App() {
    const [view] = useState("kanban");

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />

            <div
                id="main-section"
                className="flex-1 flex flex-col overflow-hidden"
            >
                <TopBar />
                
                <div className="flex-1 overflow-y-auto ">
                    {view === "kanban" ? <KanbanView /> : <ListView />}
                </div>
            </div>
        </div>
    );
}
