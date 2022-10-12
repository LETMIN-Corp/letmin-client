import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import HighLight from '../../Components/Items/HighLight';
import Loading from '../../Components/Items/Loading';
import useAdmin from '../../Utils/useAdmin';
import useLoading from '../../Utils/useLoading';
import AdminDefault from './AdminDefault';

const AdminCombinations: React.FC = () => {
    const admin = useAdmin();
    const { loading } = useLoading();

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [candidate, setCandidate] = useState({
        _id: '',
        name: '',
        picture: '',
        email: '',
        phone: '',
        experiences: [],
        formations: [],
    });

    useEffect((): void => {
        window.document.title = 'Letmin - Usuário';

        if (id?.length !== 24) {
            return navigate('/admin');
        }

        admin.getUser(id).then((res: any) => {
            setCandidate(res.data.user);
        });
    }, []);

    return (
        <AdminDefault>
            {loading ? (
                <Loading />
            ) : (
                <div className="p-5">
                    <section className="flex flex-col justify-center items-center py-10">
                        <div className="w-full flex items-center justify-between lg:w-8/12">
                            <div>
                                <img
                                    src={
                                        candidate.picture.replace('s96-c', 's150-c') ||
                                        'https://via.placeholder.com/150'
                                    }
                                    className="rounded-md"
                                    alt="User Profile Pic"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                    </section>
                    <section className="flex w-full lg:w-8/12 mx-auto flex-wrap md:text-left">
                        <h2 className="w-full text-dark-purple font-bold text-3xl mb-5">
                            {candidate.name}
                        </h2>
                        <div className="md:w-6/12">
                            <div className="md:pr-4">
                                <h4 className="text-xl font-bold text-dark-purple">
                                    Habilidades extras:
                                </h4>
                                <p>
                                    {candidate.experiences.map(
                                        (experience: any, index: number) => (
                                            <span
                                                key={index}
                                                className="text-dark-purple"
                                            >
                                                {experience.title} - {experience.company}
                                            </span>
                                        ),
                                    )}
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit.
                                </p>
                            </div>
                            <div className="md:pr-4">
                                <h4 className="text-xl font-bold text-dark-purple">
                                    Observações:
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-6/12">
                            <div className="md:pr-4">
                                <h4 className="text-xl font-bold text-dark-purple">
                                    Pontos de atenção:
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit.
                                </p>
                            </div>
                            <div className="md:pr-4">
                                <h4 className="text-xl font-bold text-dark-purple">
                                    Média empregado:
                                </h4>
                                <p>
                                    Há mais de <HighLight>2 anos</HighLight>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="w-full lg:w-8/12 mx-auto py-10">
                        <h2 className="text-3xl text-dark-purple md:text-left font-bold mb-4">
                            Portfólio
                        </h2>
                        <p className="text-lg text-justify md:w-10/12 lg:w-8/12 my-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat
                        </p>
                    </section>
                </div>
            )}
        </AdminDefault>
    );
};

export default AdminCombinations;
