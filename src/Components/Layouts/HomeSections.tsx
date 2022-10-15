interface ComponentInterface {
    id: string;
    children: React.ReactNode;
}

const HomeSection: React.FC<ComponentInterface> = ({ id, children }) => {
    return (
        <section
            id={id}
            className="min-h-80 flex flex-col justify-center items-center py-10"
        >
            {children}
        </section>
    );
};

export default HomeSection;
