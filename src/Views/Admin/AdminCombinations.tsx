import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AdminCandidateCard from '../../Components/Cards/AdminCandidateCard';
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
        role: '',
        picture: '',
        email: '',
        phone: '',
        username: '',
        createdAt: '',
        description: '',
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
                <div>
                    <main className="min-w-screen">
                        <div className="h-32 bg-lively-purple"></div>
                        <div className="relative flex md:justify-end mx-5">
                            <img
                                src={candidate.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'}
                                className="rounded-full bg-white border-4 border-lively-purple absolute left-0 -top-20"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="mt-24 mx-5">
                            <div className="font-bold text-2xl text-dark-purple">{candidate.name}</div>
                            <div className="text-lg md:text-xl text-justify text-dark-gray">{candidate.role}</div>
                        </div>
                    </main>
                    <div className="min-h-80">
                        {!candidate.description && !candidate.experiences.length && !candidate.formations.length && (
                            <div className="px-5 h-80 flex flex-col items-center drop-shadow-md justify-center text-primary font-bold text-2xl">
                                <FontAwesomeIcon icon={faWarning} className="mr-2 text-5xl" />
                                <span className="text-center w-10/12 md:w-6/12 lg:w-4/12 mt-1">
                                    O usuário ainda não tem dados cadastrados!
                                </span>
                            </div>
                        )}
                        {candidate.description && (
                            <section className="px-5 mt-10">
                                <div className="font-medium text-xl text-dark-purple">Descrição</div>
                                <div className="text-lg md:text-xl text-justify">{candidate.description}</div>
                            </section>
                        )}
                        {!!candidate.experiences.length && (
                            <section className="px-5 mt-10">
                                <div className="font-medium text-xl text-dark-purple mb-2">
                                    Experiências Profissionais
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {candidate.experiences.map((card, key) => (
                                        <AdminCandidateCard key={key} card={card} />
                                    ))}
                                </div>
                            </section>
                        )}
                        {!!candidate.formations.length && (
                            <section className="px-5 my-10">
                                <div className="font-medium text-xl text-dark-purple mb-2">Formação Acadêmica</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {candidate.formations.map((card, key) => (
                                        <AdminCandidateCard key={key} card={card} />
                                    ))}
                                </div>
                            </section>
                        )}
                        <div className="px-5 mt-2 text-sm md:text-md text-dark-gray font-medium">
                            <span className="mr-1">Usuário @{candidate.username}, desde</span>
                            {new Date(candidate.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                    </div>
                </div>
            )}
        </AdminDefault>
    );
};

export default AdminCombinations;
