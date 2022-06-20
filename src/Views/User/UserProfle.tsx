import UserProfileCard from '../../Components/Cards/UserProfileCard';
import UserDefault from './UserDefault'

const UserProfile = () => {
    return (
        <UserDefault>
            <main>
                <div className='h-32 bg-lively-purple'></div>
                <div className='relative flex w-full md:justify-end mx-5'>
                    <img src='https://via.placeholder.com/150' className='rounded-full border-4 border-lively-purple absolute left-0 -top-20' />
                    <a href='#' className='font-medium text-dark-purple hover:text-lively-purple mt-24 md:mr-14 md:mt-5 text-lg'>
                        <i className='fa-solid fa-link mr-2'></i>
                        <span>Link Externo</span>
                    </a>
                </div>
                <div className='mt-5 md:mt-10 mx-5'>
                    <div className='font-medium text-xl text-dark-purple'>Nome do Usuário</div>
                    <div className='text-lg mr-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore reiciendis nobis tempora eos quo unde dolores perspiciatis ut id sapiente molestiae vero eligendi ullam quibusdam libero, tempore in fugit!</div>
                </div>
            </main>
            <section className='px-5 mt-10'>
                <div className='font-medium text-xl text-dark-purple'>Quem Sou Eu?</div>
                <div className='text-lg mr-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore reiciendis nobis tempora eos quo unde dolores perspiciatis ut id sapiente molestiae vero eligendi ullam quibusdam libero, tempore in fugit!</div>
            </section>
            <section className='px-5 mt-10'>
                <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mr-5">
                    {
                        [
                            {
                                name: 'teste',
                                time: '6 months'
                            },
                            {
                                name: 'teste',
                                time: '2 months'
                            },
                            {
                                name: 'teste',
                                time: '1 year'
                            }
                        ].map((card, key) => <UserProfileCard key={ key } card={ card } /> )
                    }
                </div>
            </section>
            <section className='px-5 my-10'>
                <div className='font-medium text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mr-5">
                    {
                        [
                            {
                                name: 'CTI',
                                time: '2020 - 2023'
                            },
                            {
                                name: 'CTI',
                                time: '2020 - 2023'
                            },
                            {
                                name: 'CTI',
                                time: '2020 - 2023'
                            },
                            {
                                name: 'CTI',
                                time: '2020 - 2023'
                            }
                        ].map((card, key) => <UserProfileCard key={ key } card={ card } /> )
                    }
                </div>
            </section>
        </UserDefault>
    );
}

export default UserProfile;
