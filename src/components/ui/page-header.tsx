interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <header>
            <div className="flex justify-between items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <div className="text-gray-600 text-sm font-medium">{subtitle}</div>
                </div>
                {children}
            </div>
        </header>
    );
};

export default PageHeader;