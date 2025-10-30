import React from 'react';

type View = 'home' | 'progress' | 'vision';

interface SidebarNavProps {
    activeView: View;
    setActiveView: (view: View) => void;
    isProgressAvailable: boolean;
}

interface NavItemProps {
    view: View;
    label: string;
    icon: string;
    activeView: View;
    onClick: (view: View) => void;
    disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ view, label, icon, activeView, onClick, disabled }) => {
    const isActive = activeView === view;
    
    const baseClasses = 'flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium';
    const activeClasses = 'bg-indigo-100 text-indigo-700';
    const inactiveClasses = 'text-slate-600 hover:bg-slate-200 hover:text-slate-800';
    const disabledClasses = 'text-slate-400 cursor-not-allowed';

    const getClasses = () => {
        if (disabled) return `${baseClasses} ${disabledClasses}`;
        if (isActive) return `${baseClasses} ${activeClasses}`;
        return `${baseClasses} ${inactiveClasses}`;
    }

    return (
        <button onClick={() => onClick(view)} className={getClasses()} disabled={disabled}>
            <i className={`${icon} w-5 text-center text-lg`}></i>
            <span>{label}</span>
        </button>
    );
};


export const SidebarNav: React.FC<SidebarNavProps> = ({ activeView, setActiveView, isProgressAvailable }) => {
    return (
        <nav className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 mb-4">
                <i className="fa-solid fa-layer-group text-2xl text-indigo-600"></i>
                <h1 className="text-lg font-bold text-slate-800">Growth Asst.</h1>
            </div>
            <div className="flex flex-col gap-2">
                 <NavItem 
                    view="home"
                    label="Home / Set Goal"
                    icon="fa-solid fa-house"
                    activeView={activeView}
                    onClick={setActiveView}
                />
                 <NavItem 
                    view="progress"
                    label="Progress"
                    icon="fa-solid fa-chart-line"
                    activeView={activeView}
                    onClick={setActiveView}
                    disabled={!isProgressAvailable}
                />
                 <NavItem 
                    view="vision"
                    label="Future Vision"
                    icon="fa-solid fa-star"
                    activeView={activeView}
                    onClick={setActiveView}
                />
            </div>
        </nav>
    );
};