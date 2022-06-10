import UserDefault from './UserDefault'

const UserProfile = () => {
    return (
        <UserDefault>
            <main>
                <div className='h-32 bg-lively-purple'></div>
                <div className='relative flex w-full justify-end mx-5'>
                    <img src='https://via.placeholder.com/150' className='rounded-full border-4 border-lively-purple absolute left-0 -top-20' />
                    <a href='#' className='font-medium text-dark-purple hover:text-lively-purple mr-20 mt-5 text-lg'>
                        <span>Link Externo</span>
                        <i className='fa-solid fa-link ml-2'></i>
                    </a>
                </div>
                <div className='mt-10 mx-5'>
                    <div className='font-medium text-xl text-dark-purple'>Nome do Usuário</div>
                    <div className='text-lg w-8/12 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore reiciendis nobis tempora eos quo unde dolores perspiciatis ut id sapiente molestiae vero eligendi ullam quibusdam libero, tempore in fugit!</div>
                </div>
            </main>
            <section className='px-5 mt-10'>
                <div className='font-medium text-xl text-dark-purple'>Quem Sou Eu?</div>
                <div className='text-lg w-8/12 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore reiciendis nobis tempora eos quo unde dolores perspiciatis ut id sapiente molestiae vero eligendi ullam quibusdam libero, tempore in fugit!</div>
            </section>
            <section className='px-5 mt-10'>
                <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                <div className="flex">
                    <div className='text-white bg-primary p-3 rounded-md w-4/12'>
                        <div className='font-medium'>Nome da Empresa</div>
                        <div className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, amet excepturi architecto voluptatum, tempora tempore odio sint porro corporis deserunt possimus sunt fugiat. Consectetur, soluta tempora dicta ut quibusdam tempore?</div>
                    </div>
                    <div className='text-white bg-primary p-3 rounded-md mx-5 w-4/12'>
                        <div className='font-medium'>Nome da Empresa</div>
                        <div className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, amet excepturi architecto voluptatum, tempora tempore odio sint porro corporis deserunt possimus sunt fugiat. Consectetur, soluta tempora dicta ut quibusdam tempore?</div>
                    </div>
                    <div className='text-white bg-primary p-3 rounded-md w-4/12'>
                        <div className='font-medium'>Nome da Empresa</div>
                        <div className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, amet excepturi architecto voluptatum, tempora tempore odio sint porro corporis deserunt possimus sunt fugiat. Consectetur, soluta tempora dicta ut quibusdam tempore?</div>
                    </div>
                </div>
            </section>
            <section className='px-5 mt-10'>
                <div className='font-medium text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
                <div className="flex">
                    <div className='text-white bg-primary p-3 rounded-md w-4/12'>
                        <div className='font-medium'>Nome da Empresa</div>
                        <div className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, amet excepturi architecto voluptatum, tempora tempore odio sint porro corporis deserunt possimus sunt fugiat. Consectetur, soluta tempora dicta ut quibusdam tempore?</div>
                    </div>
                    <div className='text-white bg-primary p-3 rounded-md mx-5 w-4/12'>
                        <div className='font-medium'>Nome da Empresa</div>
                        <div className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, amet excepturi architecto voluptatum, tempora tempore odio sint porro corporis deserunt possimus sunt fugiat. Consectetur, soluta tempora dicta ut quibusdam tempore?</div>
                    </div>
                    <div className='text-white bg-primary p-3 rounded-md w-4/12'>
                        <div className='font-medium'>Nome da Empresa</div>
                        <div className='text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, amet excepturi architecto voluptatum, tempora tempore odio sint porro corporis deserunt possimus sunt fugiat. Consectetur, soluta tempora dicta ut quibusdam tempore?</div>
                    </div>
                </div>
            </section>
            <section className='flex items-center justify-center my-10'>
                <div className='bg-gray p-10 w-8/12 rounded-md font-medium'>
                    <div className='text-center w-3/12'>
                        <div>Total de Visualizações</div>
                        <div>29</div>
                        <div>Total de Avaliações</div>
                        <div>5</div>
                    </div>
                </div>
            </section>
        </UserDefault>
    );
}

export default UserProfile;
